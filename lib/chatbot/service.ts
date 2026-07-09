import { IntentRouter } from "./router";
import { ContextBuilder } from "./context-builder";
import { PromptBuilder } from "./prompt-builder";
import { ChatContext } from "./types";
import { AIProvider } from "./providers/types";
import { GeminiProvider } from "./providers/gemini";
import { GroqProvider } from "./providers/groq";

export class ChatbotService {
  /**
   * Helper to get the active AI provider based on environment variables.
   * Defaulting to Gemini if both are present, or throwing if none.
   */
  private static getProvider(): AIProvider {
    // You can switch this logic based on your preference
    if (process.env.GEMINI_API_KEY) {
      return new GeminiProvider();
    } else if (process.env.GROQ_API_KEY) {
      return new GroqProvider();
    }
    throw new Error("No AI Provider configured. Please set GEMINI_API_KEY or GROQ_API_KEY.");
  }

  /**
   * For Phase 3 (testing): Only gathers context and constructs the prompt.
   */
  static async buildContext(question: string): Promise<{
    intent: string;
    context: ChatContext;
    finalPrompt: string;
  }> {
    const routedIntent = IntentRouter.route(question);
    const context = await ContextBuilder.build(routedIntent);
    const finalPrompt = PromptBuilder.build(context, question);

    return {
      intent: routedIntent.intent,
      context: context,
      finalPrompt: finalPrompt,
    };
  }

  /**
   * For Phase 4: Full flow. Gathers context, builds prompt, and generates AI response.
   */
  static async generateAnswer(question: string): Promise<{
    intent: string;
    answer: string;
    sources?: string[];
  }> {
    // Re-use the deterministic context pipeline
    const pipeline = await this.buildContext(question);
    
    // Instantiate provider and generate response
    const provider = this.getProvider();
    const answer = await provider.generateResponse(pipeline.finalPrompt);

    return {
      intent: pipeline.intent,
      answer: answer,
      sources: pipeline.context.sources,
    };
  }
}
