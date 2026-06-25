"use client";

import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { Reveal } from "../shared/Reveal";
import type { EditorialIntroData } from "../types";

interface EditorialIntroProps {
  data: EditorialIntroData;
}

export function EditorialIntro({ data }: EditorialIntroProps) {
  // Split body into paragraphs on double-newline or use as single block
  const paragraphs = data.body.split("\n\n").filter(Boolean);
  const firstParagraph = paragraphs[0] || "";
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <Section alternate>
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[820px]">
            {/* First paragraph with drop cap */}
            <p className="mb-6 font-[family-name:var(--font-inter)] text-lg leading-[1.85] text-[#C8C8C8] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-[family-name:var(--font-playfair)] first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-white">
              {firstParagraph}
            </p>

            {/* Remaining paragraphs */}
            {remainingParagraphs.map((p, i) => (
              <p
                key={i}
                className="mb-6 font-[family-name:var(--font-inter)] text-md leading-[1.85] text-[#C8C8C8] last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
