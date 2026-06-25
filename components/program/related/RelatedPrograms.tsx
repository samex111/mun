"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeading } from "../shared/SectionHeading";
import { Reveal } from "../shared/Reveal";
import type { RelatedProgramItem } from "../types";

interface RelatedProgramsProps {
  data: RelatedProgramItem[];
  currentSlug: string;
}

export function RelatedPrograms({ data, currentSlug }: RelatedProgramsProps) {
  const filtered = data.filter((p) => p.slug !== currentSlug);

  if (filtered.length === 0) return null;

  return (
    <Section alternate>
      <Container>
        <SectionHeading heading="Explore Other Programs" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((program, i) => (
            <Reveal key={program.slug} delay={i * 0.06}>
              <Link
                href={`/programs/${program.slug}`}
                className="group block overflow-hidden border border-white/[0.08] transition-colors duration-400 hover:border-white/20"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="mb-1.5 font-[family-name:var(--font-playfair)] text-base font-bold text-white">
                    {program.title}
                  </h4>
                  <p className="mb-3 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[#8B8B8B]">
                    {program.description}
                  </p>
                  <span className="inline-flex items-center gap-1 font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[0.12em] text-[#BB8B57] transition-opacity duration-300 group-hover:opacity-80">
                    Explore
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
