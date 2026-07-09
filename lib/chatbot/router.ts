import { Intent, RoutedIntent } from "./types";
import { INTENT_KEYWORDS } from "./utils/keywords";

export class IntentRouter {
  /**
   * Deterministically maps a user query to an Intent based on keyword matching.
   * Returns Intent.UNKNOWN if no strong match is found.
   */
  static route(query: string): RoutedIntent {
    const normalizedQuery = query.toLowerCase();

    // Check for explicit greetings first
    const greetingMatches = this.getMatches(normalizedQuery, INTENT_KEYWORDS[Intent.GREETING], true);
    if (greetingMatches.length > 0) {
      return { intent: Intent.GREETING, matchedKeywords: greetingMatches };
    }

    // Score other intents
    const matchedKeywordsMap: Record<Intent, string[]> = {
      [Intent.CONFERENCE]: [],
      [Intent.PROGRAM]: [],
      [Intent.ORGANIZATION]: [],
      [Intent.FAQ]: [],
      [Intent.CONTACT]: [],
      [Intent.GREETING]: [],
      [Intent.UNKNOWN]: [],
    };

    for (const intent of Object.values(Intent)) {
      if (intent === Intent.UNKNOWN || intent === Intent.GREETING) continue;
      
      const keywords = INTENT_KEYWORDS[intent];
      for (const keyword of keywords) {
        // Use word boundaries to prevent partial matches (e.g., 'mun' matching 'smjmun')
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "i");
        if (regex.test(normalizedQuery)) {
          matchedKeywordsMap[intent].push(keyword.toLowerCase());
        }
      }
    }

    // Find the intent with the highest score
    let bestIntent = Intent.UNKNOWN;
    let highestScore = 0;

    for (const [intent, matched] of Object.entries(matchedKeywordsMap)) {
      if (matched.length > highestScore) {
        highestScore = matched.length;
        bestIntent = intent as Intent;
      }
    }

    return {
      intent: bestIntent,
      matchedKeywords: bestIntent !== Intent.UNKNOWN ? matchedKeywordsMap[bestIntent] : [],
    };
  }

  /**
   * Helper to get exact word matches
   */
  private static getMatches(query: string, keywords: string[], exactWord = false): string[] {
    if (exactWord) {
      const words = query.split(/[\s,!?.]+/);
      return keywords.filter(kw => words.includes(kw));
    }
    return keywords.filter(kw => query.includes(kw));
  }
}
