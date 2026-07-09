import { ChatContext, Intent } from "../types";
import { FAQService } from "@/lib/sanity/faq/service";

export async function buildFAQContext(): Promise<ChatContext> {
  const faqs = await FAQService.getFAQs();
  
  if (!faqs || faqs.length === 0) {
    return {
      intent: Intent.FAQ,
      title: "Frequently Asked Questions",
      content: "There are currently no FAQs available.",
    };
  }

  // Group FAQs by category for better LLM context
  const groupedFAQs = faqs.reduce((acc, faq) => {
    const cat = faq.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(`Q: ${faq.question}\nA: ${faq.answer}`);
    return acc;
  }, {} as Record<string, string[]>);

  let content = "";
  for (const [category, qs] of Object.entries(groupedFAQs)) {
    content += `### ${category}\n\n`;
    content += qs.join("\n\n") + "\n\n";
  }

  return {
    intent: Intent.FAQ,
    title: "Frequently Asked Questions",
    content: content.trim(),
  };
}
