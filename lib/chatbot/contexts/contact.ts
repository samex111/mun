import { ChatContext, Intent } from "../types";
import { SiteSettingsService } from "@/lib/sanity/siteSettings/service";

export async function buildContactContext(): Promise<ChatContext> {
  const settings = await SiteSettingsService.getSiteSettings();
  
  if (!settings) {
    return {
      intent: Intent.CONTACT,
      title: "Contact Info",
      content: "Contact information is currently unavailable.",
    };
  }

  const content = `
Email: ${settings.contact?.email || "N/A"}
Phone: ${settings.contact?.phone || "N/A"}
WhatsApp: ${settings.contact?.whatsapp || "N/A"}
Address: ${settings.contact?.address || "N/A"}

Social Links:
Instagram: ${settings.socialLinks?.instagram || "N/A"}
LinkedIn: ${settings.socialLinks?.linkedin || "N/A"}
Facebook: ${settings.socialLinks?.facebook || "N/A"}
YouTube: ${settings.socialLinks?.youtube || "N/A"}
  `.trim();

  return {
    intent: Intent.CONTACT,
    title: "Contact SMJMUN",
    content: content,
  };
}
