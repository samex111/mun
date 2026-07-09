import { Groq } from "groq-sdk";
import { AIProvider } from "./types";

export class GroqProvider implements AIProvider {
  private client: Groq;
  private model: string;

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined");
    }

    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    
    // Fast and capable model for general chat
    this.model = "llama-3.3-70b-versatile"; 
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "user", content: prompt }
        ],
        model: this.model,
      });

      return completion.choices[0]?.message?.content || "No response generated.";
    } catch (error) {
      console.error("Groq Generation Error:", error);
      throw new Error("Failed to generate response from Groq.");
    }
  }
}
