"use client";

import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import type { BenefitsData } from "../types";
import {
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mic2,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Map string icon names to Lucide components */
const iconMap: Record<string, LucideIcon> = {
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mic2,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
};

interface BenefitsProps {
  data: BenefitsData;
}

export function Benefits({ data }: BenefitsProps) {
  return (
    <Section>
      <Container>
        <SectionHeading
          label={data.label}
          heading={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Star;

            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group">
                  <Icon
                    className="mb-3 h-5 w-5 text-[#BB8B57] transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.5}
                  />

                  <h4 className="mb-2 font-[family-name:var(--font-playfair)] text-base font-bold text-white">
                    {item.title}
                  </h4>

                  <p className="font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[#C8C8C8]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
