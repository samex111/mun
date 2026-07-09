import type { PortableTextBlock } from "next-sanity";

export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  organizationName?: string;
  fullName?: string;
  aboutSMJMUN?: string;
  mission?: string;
  vision?: string;
  whyJoinSMJMUN?: PortableTextBlock[];
  history?: string;
  coreValues?: string[];
  objectives?: string[];
  contact?: ContactInfo;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
  aiAssistant?: {
    greeting?: string;
    defaultFallbackMessage?: string;
    suggestedQuestions?: string[];
  };
  seoTitle?: string;
  seoDescription?: string;
}
