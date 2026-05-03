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
  const priceContext = referencePrice ? ` Current market price level is around ${referencePrice}.` : "";
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the current technical outlook for Gold (XAUUSD) on the 2Hr timeframe.${priceContext} Provide a structured trading strategy. Since you don't have absolute live ticks, base your logic on general technical principles for this price level.`,
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
    return JSON.parse(response.text || "{}");
  } catch (e) {
    throw new Error("Failed to parse market analysis");
  }
}
