"use client";

import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FAQData } from "../types";

interface FAQProps {
  data: FAQData;
}

export function FAQ({ data }: FAQProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center">
        <SectionHeading
          label={data.label}
          heading={data.title}
          subtitle={data.subtitle}
        />

        <div className="w-full max-w-[600px]">
          <Reveal>
            <Accordion>
              {data.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={i}
                  className="border-b border-white/[0.08] py-1"
                >
                  <AccordionTrigger className="py-4 text-left font-[family-name:var(--font-inter)] text-sm font-medium text-white hover:no-underline [&>svg]:text-[#BB8B57]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[#C8C8C8]">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
