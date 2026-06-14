"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Who can participate in SMJ MUN?",
    answer:
      "SMJ MUN is open to high school and university students from across the globe. Previous MUN experience is not required, as we provide comprehensive training materials and guidance for first-time delegates.",
  },
  {
    question: "How are committees assigned?",
    answer:
      "Committees and countries are assigned based on delegate preferences, previous experience, and availability. We strive to ensure a balanced and rewarding committee experience for all participants.",
  },
  {
    question: "Can schools register groups?",
    answer:
      "Yes. Faculty advisors can register school delegations through our delegation registration process. Special benefits and support are available for institutional delegations.",
  },
  {
    question: "What should delegates prepare?",
    answer:
      "Delegates should research their assigned country's position on the committee agenda and prepare a position paper before the conference. Study guides will be provided before the event.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-[#F8F6F2]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <span className="block mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#bb8b57]">
            Frequently Asked Questions
          </span>

          <h2
            className="
              font-serif
              text-[clamp(42px,6vw,72px)]
              leading-[1.05]
              tracking-[-0.03em]
              text-[#042147]
            "
          >
            Everything You Need
            <br />
            To Know
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              mx-auto
              text-[17px]
              leading-8
              text-[#042147]/70
            "
          >
            Find answers to common questions about registration,
            committees, delegate preparation, and conference participation.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="
                  rounded-2xl
                  border
                  border-[#042147]/10
                  bg-white
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:border-[#bb8b57]/40
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                "
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="
                    w-full
                    px-8
                    py-6
                    flex
                    items-center
                    justify-between
                    text-left
                  "
                >
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-semibold
                      text-[#042147]
                      pr-6
                    "
                  >
                    {faq.question}
                  </h3>

                  <div
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#bb8b57]/10
                      flex-shrink-0
                    "
                  >
                    <ChevronDown
                      className={`
                        w-5 h-5 text-[#bb8b57]
                        transition-transform duration-300
                        ${isOpen ? "rotate-180" : ""}
                      `}
                    />
                  </div>
                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-500
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8">
                      <div className="h-px bg-[#042147]/8 mb-6" />

                      <p
                        className="
                          text-[16px]
                          leading-8
                          text-[#042147]/75
                          max-w-3xl
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#042147]/70 mb-4">
            Still have questions?
          </p>

          <a
            href="/contact"
            className="
              inline-flex
              items-center
              gap-2
              font-medium
              text-[#bb8b57]
              hover:gap-3
              transition-all
            "
          >
            Contact Our Team →
          </a>
        </div>
      </div>
    </section>
  );
}