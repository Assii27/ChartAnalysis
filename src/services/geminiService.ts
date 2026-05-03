import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export interface MarketStrategy {
  trend: "Bullish" | "Bearish" | "Neutral";
  strength: number; // 0-100
  entry: string;
  stopLoss: string;
  takeProfit: string;
  rationale: string[];
  riskRewardRatio: string;
}

export async function getXAUUSDAnalysis(referencePrice?: string): Promise<MarketStrategy> {
  const priceContext = referencePrice ? ` The current market price for Gold (XAU/USD) is ${referencePrice}. Base your trade levels (Entry, Stop Loss, Take Profit) relative to this price.` : "Use current market rates for Gold (XAU/USD).";
  const ai = getAI();
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the XAU/USD (Gold) pair on a 2-hour timeframe. ${priceContext}
    Provide a professional technical analysis and a specific trade setup.
    Include trend bias, confidence strength, entry, stop loss, take profit, and the rationale behind your analysis.
    Output MUST be in valid JSON format.`,
    config: {
      systemInstruction: "You are a professional Gold (XAUUSD) trading analysts. You provide high-accuracy signals based on price action and trend analysis. Your output is always strictly valid JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          trend: { type: Type.STRING, enum: ["Bullish", "Bearish", "Neutral"] },
          strength: { type: Type.NUMBER },
          entry: { type: Type.STRING },
          stopLoss: { type: Type.STRING },
          takeProfit: { type: Type.STRING },
          rationale: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          riskRewardRatio: { type: Type.STRING }
        },
        required: ["trend", "strength", "entry", "stopLoss", "takeProfit", "rationale", "riskRewardRatio"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) {
      console.error("Gemini Response is missing text:", response);
      throw new Error("Empty response from AI");
    }
    
    // Clean up potential markdown formatting if the model didn't strictly follow responseMimeType
    const jsonString = text.includes('```json') 
      ? text.split('```json')[1].split('```')[0].trim()
      : text.trim();

    return JSON.parse(jsonString);
  } catch (e) {
    console.error("AI Analysis Parse Error:", e, response);
    throw new Error("Market data sync error. The analysis could not be processed. Please try again.");
  }
}
