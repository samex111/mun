import { GoogleGenAI } from "@google/genai";
import { AIProvider } from "./types";

export class GeminiProvider implements AIProvider {
  private client: GoogleGenAI;
  private model: string;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    
    // Initialize the official Google Gen AI SDK
    this.client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    
    this.model = "gemini-2.5-flash"; // Recommended default
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents: prompt,
      });

      return response.text || "No response generated.";
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw new Error("Failed to generate response from Gemini.");
    }
  }
}
