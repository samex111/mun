import { ChatContext, Intent, RoutedIntent } from "./types";
import { buildConferenceContext } from "./contexts/conference";
import { buildOrganizationContext } from "./contexts/organization";
import { buildFAQContext } from "./contexts/faq";
import { buildContactContext } from "./contexts/contact";
import { buildProgramContext } from "./contexts/program";

export class ContextBuilder {
  /**
   * Orchestrates the context gathering based on the resolved intent.
   * Calls the appropriate domain-specific context builder.
   */
  static async build(routed: RoutedIntent): Promise<ChatContext> {
    switch (routed.intent) {
      case Intent.CONFERENCE:
        return await buildConferenceContext();
      
      case Intent.ORGANIZATION:
        return await buildOrganizationContext();
      
      case Intent.FAQ:
        return await buildFAQContext();
      
      case Intent.CONTACT:
        return await buildContactContext();
        
      case Intent.PROGRAM:
        return await buildProgramContext();
      
      case Intent.GREETING:
        return {
          intent: Intent.GREETING,
          title: "Greeting",
          content: "User is greeting. Be polite and ask how you can help them with SMJMUN.",
        };
        
      case Intent.UNKNOWN:
      default:
        return {
          intent: Intent.UNKNOWN,
          title: "Unknown",
          content: "User query did not strongly match any specific topic. Ask for clarification or provide general assistance.",
        };
    }
  }
}
