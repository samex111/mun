"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { Reveal } from "../shared/Reveal";
import { motion } from "framer-motion";
import type { EditorialSectionData } from "../types";
import { cn } from "@/lib/utils";

interface EditorialSectionProps {
  data: EditorialSectionData;
  index: number;
}

export function EditorialSection({ data, index }: EditorialSectionProps) {
  const imageLeft = index % 2 === 0;

  const imageBlock = (
    <Reveal
      direction={imageLeft ? "left" : "right"}
      className="shrink-0"
    >
      <div className="relative aspect-square w-[220px] overflow-hidden lg:w-[260px]">
        <Image
          src={data.image}
          alt={data.imageAlt || data.title}
          fill
          className="object-cover"
          sizes="260px"
        />
        {/* Caption below image like Tata */}
        {data.caption && (
          <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2.5 py-1.5">
            <p className="font-[family-name:var(--font-inter)] text-[10px] text-white/70">
              {data.caption}
            </p>
          </div>
        )}
      </div>
    </Reveal>
  );

  const contentBlock = (
    <Reveal delay={0.1}>
      <div className="overflow-hidden md:min-w-[600px]">
        {/* Badge / label above title */}
        {data.badge && (
          <p className="mb-2 font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[0.2em] text-[#BB8B57]">
            {data.badge}
          </p>
        )}

        {/* Title — free, no border */}
        <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-base font-bold leading-[1.2] text-white md:text-[17px]">
          {data.title}
        </h3>

        {/* Body with gold left border — exactly like Tata blockquote */}
        <div className="flex gap-4">
          {/* Animated gold line — grows top to bottom on scroll */}
          <motion.div
            aria-hidden="true"
            className="w-[2px] shrink-0 origin-top bg-[#BB8B57]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ alignSelf: "stretch" }}
          />

          <div>
            <p className="font-[family-name:var(--font-inter)] text-base leading-[1.85] text-[#C8C8C8]">
              {data.description}
              {/* Inline arrow at end of paragraph like Tata */}
              {data.cta && (
                <Link
                  href={data.cta.href}
                  className="group ml-2 inline-flex items-center gap-1 text-[#BB8B57] transition-opacity duration-300 hover:opacity-70"
                >
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </p>

            {/* Standalone CTA text link if needed */}
            {data.cta && (
              <Link
                href={data.cta.href}
                className="group mt-3 inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[0.12em] text-white/50 transition-colors duration-300 hover:text-[#BB8B57]"
              >
                {data.cta.label}
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );

  return (
    <Section transparent>
      <Container>
        <div
          className={cn(
            "flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14",
            !imageLeft && "lg:flex-row-reverse"
          )}
        >
          {imageBlock}
          {contentBlock}
        </div>
      </Container>
    </Section>
  );
}
