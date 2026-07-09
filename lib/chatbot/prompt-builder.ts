import { ChatContext } from "./types";

export class PromptBuilder {
  /**
   * The core system persona that the AI should adopt.
   * Note: In the future, this could be fetched from Sanity's Site Settings.
   */
  private static readonly SYSTEM_PROMPT = `
You are the official AI Assistant for SMJMUN (SMJ Model United Nations).
Your goal is to provide accurate, helpful, and polite information based ONLY on the provided context.
If the context does not contain the answer, do not hallucinate. Politely state that you do not have that information and suggest they contact support.
Maintain a professional and welcoming tone suitable for diplomats and students.
  `.trim();

  /**
   * Dynamically constructs the final prompt by combining the system prompt,
   * the gathered context, and the user's specific question.
   */
  static build(context: ChatContext, question: string): string {
    return `
${PromptBuilder.SYSTEM_PROMPT}

### CONTEXT
Intent: ${context.intent}
Topic: ${context.title}

${context.content}

### USER QUESTION
${question}

### RESPONSE
    `.trim();
  }
}
