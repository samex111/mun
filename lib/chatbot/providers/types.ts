export interface AIProvider {
  /**
   * Sends the fully constructed prompt to the LLM and returns the generated response.
   *
   * @param prompt The complete string containing system instructions, context, and user question.
   * @returns The raw string response from the AI.
   */
  generateResponse(prompt: string): Promise<string>;
}
