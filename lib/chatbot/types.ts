export enum Intent {
  CONFERENCE = "CONFERENCE",
  PROGRAM = "PROGRAM",
  ORGANIZATION = "ORGANIZATION",
  FAQ = "FAQ",
  CONTACT = "CONTACT",
  GREETING = "GREETING",
  UNKNOWN = "UNKNOWN",
  // Reserved for future expansion
  // BLOG = "BLOG",
  // GALLERY = "GALLERY",
  // MEDIA = "MEDIA",
  // PARTNERSHIP = "PARTNERSHIP",
}

export interface RoutedIntent {
  intent: Intent;
  matchedKeywords: string[];
}

export interface ChatContext {
  intent: Intent;
  title: string;
  content: string;
  sources?: string[];
}
