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
  const priceContext = referencePrice ? ` The user specifies the CURRENT PRICE is exactly ${referencePrice}. Use this value for all your calculations (entry, stop loss, take profit) and ignore any other historical prices you might know.` : "";
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert technical analyst. Analyze the current technical outlook for Gold (XAUUSD) on the 2Hr timeframe.${priceContext} 
    Provide a structured trading strategy in JSON format. 
    Strictly ensure the JSON matches the schema. 
    If you are unsure of the price, prioritize the user-provided reference price of ${referencePrice || 'current market rates'}.`,
    config: {
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
    const text = response.text();
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (e) {
    console.error("AI Analysis Parse Error:", e, response);
    throw new Error("Market data sync error. The market is too volatile or the AI model is temporarily unavailable. Please try again.");
  }
}
