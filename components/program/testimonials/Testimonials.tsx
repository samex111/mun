"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { Reveal } from "../shared/Reveal";
import { GoldBorder } from "../shared/GoldBorder";
import type { TestimonialsData } from "../types";
import { cn } from "@/lib/utils";

interface TestimonialsProps {
  data: TestimonialsData;
}

export function Testimonials({ data }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const items = data.items;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next, items.length]);

  const item = items[current];

  return (
    <Section alternate>
      <Container
        className="flex flex-col items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {data.label && (
          <Reveal>
            <p className="mb-8 text-center font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[0.25em] text-[#BB8B57]">
              {data.label}
            </p>
          </Reveal>
        )}

        <div className="relative max-w-2xl text-center">
          {/* Large quotation mark */}
          <span
            aria-hidden="true"
            className="mb-4 block font-[family-name:var(--font-playfair)] text-4xl leading-none text-[#BB8B57]/30 md:text-5xl"
          >
            &ldquo;
          </span>

          {/* Quote */}
          <blockquote className="mb-6 font-[family-name:var(--font-playfair)] text-base font-normal italic leading-relaxed text-white md:text-lg">
            {item.quote}
          </blockquote>

          <GoldBorder orientation="horizontal" className="mx-auto mb-5" />

          {/* Attribution */}
          <div className="flex flex-col items-center gap-1.5">
            {item.logo && (
              <div className="relative mb-1 h-8 w-20">
                <Image
                  src={item.logo}
                  alt={item.institution}
                  fill
                  className="object-contain opacity-50"
                />
              </div>
            )}
            <p className="font-[family-name:var(--font-inter)] text-sm font-medium text-white">
              {item.name}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-xs text-[#8B8B8B]">
              {item.role}, {item.institution}
            </p>
          </div>
        </div>

        {/* Navigation */}
        {items.length > 1 && (
          <div className="mt-8 flex items-center gap-5">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-8 w-8 items-center justify-center border border-white/15 text-white/50 transition-colors duration-300 hover:border-[#BB8B57] hover:text-[#BB8B57]"
            >
              <ChevronLeft size={15} />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-1 rounded-full transition-all duration-400",
                    i === current
                      ? "w-5 bg-[#BB8B57]"
                      : "w-1 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-8 w-8 items-center justify-center border border-white/15 text-white/50 transition-colors duration-300 hover:border-[#BB8B57] hover:text-[#BB8B57]"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}
