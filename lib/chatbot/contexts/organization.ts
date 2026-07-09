import { ChatContext, Intent } from "../types";
import { SiteSettingsService } from "@/lib/sanity/siteSettings/service";

export async function buildOrganizationContext(): Promise<ChatContext> {
  const settings = await SiteSettingsService.getSiteSettings();
  
  if (!settings) {
    return {
      intent: Intent.ORGANIZATION,
      title: "Organization Info",
      content: "General information about SMJMUN is currently unavailable.",
    };
  }

  const content = `
Organization Name: ${settings.organizationName || "SMJMUN"}
Full Name: ${settings.fullName || "SMJ Model United Nations"}

About:
${settings.aboutSMJMUN || "We are a premier Model United Nations organization."}

Mission:
${settings.mission || "N/A"}

Vision:
${settings.vision || "N/A"}
  `.trim();

  return {
    intent: Intent.ORGANIZATION,
    title: "About SMJMUN",
    content: content,
  };
}
