import { ChatContext, Intent } from "../types";
import { ConferenceService } from "@/lib/sanity/conference/service";

export async function buildConferenceContext(): Promise<ChatContext> {
  const conferences = await ConferenceService.getConferences();
  
  if (!conferences || conferences.length === 0) {
    return {
      intent: Intent.CONFERENCE,
      title: "Conferences",
      content: "There are currently no upcoming conferences scheduled. Please check back later.",
    };
  }

  // Format conference data concisely for the LLM
  const content = conferences.map(conf => {
    return `
Conference: ${conf.title}
Status: ${conf.status}
Date: ${conf.date}
Venue: ${conf.venue}
Registration Fee: ${conf.registrationFee}
Registration Open: ${conf.registrationOpen ? "Yes" : "No"}
Capacity: ${conf.capacity} delegates
    `.trim();
  }).join("\n\n---\n\n");

  return {
    intent: Intent.CONFERENCE,
    title: "Upcoming Conferences",
    content: content,
    sources: conferences.map(c => c.slug.current),
  };
}
