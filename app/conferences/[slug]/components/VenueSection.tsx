import React from "react";
import type { Conference } from "@/lib/sanity/types";
import {
  Building,
  Wifi,
  Coffee,
  Mic,
  MapPin,
} from "lucide-react";

export default function VenueSection({
  conference,
}: {
  conference: Conference;
}) {
  if (!conference.venue) return null;

  const features = [
    {
      icon: Building,
      title: "Committee Rooms",
      desc: "Professionally designed spaces for engaging debate and collaboration.",
    },
    {
      icon: Mic,
      title: "A/V Equipment",
      desc: "Modern presentation and audio systems for every session.",
    },
    {
      icon: Coffee,
      title: "Networking Areas",
      desc: "Dedicated lounges for delegates, advisors, and guests.",
    },
    {
      icon: Wifi,
      title: "Connectivity",
      desc: "Reliable high-speed internet access throughout the venue.",
    },
  ];

  return (
    <section className="py-28 lg:py-36 bg-[#F8F6F2] border-t border-[#042147]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">

          {/* Left Content */}
          <div>
            <span className="block mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#bb8b57]">
              Conference Venue
            </span>

            <h2 className="font-serif text-[clamp(42px,6vw,78px)] leading-[1.02] tracking-[-0.04em] text-[#042147]">
              Dr. Ambedkar
              <br />
              International Centre
            </h2>

            <div className="flex items-center gap-2 mt-5 text-[#042147]/70">
              <MapPin className="w-4 h-4 text-[#bb8b57]" />
              <span className="text-lg">
                New Delhi, India
              </span>
            </div>

            <div className="w-16 h-px bg-[#bb8b57] mt-8 mb-8" />

            <p className="text-[18px] leading-8 text-[#042147]/75 max-w-xl">
              Experience the grandeur and professional atmosphere
              of one of New Delhi's premier conference venues,
              providing the perfect backdrop for high-level
              diplomatic discourse, committee sessions,
              networking, and collaboration.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <div className="font-serif text-4xl text-[#042147]">
                  500+
                </div>
                <div className="text-sm uppercase tracking-[0.15em] text-[#042147]/60">
                  Delegates
                </div>
              </div>

              <div>
                <div className="font-serif text-4xl text-[#042147]">
                  8+
                </div>
                <div className="text-sm uppercase tracking-[0.15em] text-[#042147]/60">
                  Committees
                </div>
              </div>

              <div>
                <div className="font-serif text-4xl text-[#042147]">
                  3
                </div>
                <div className="text-sm uppercase tracking-[0.15em] text-[#042147]/60">
                  Conference Days
                </div>
              </div>

              <div>
                <div className="font-serif text-4xl text-[#042147]">
                  100+
                </div>
                <div className="text-sm uppercase tracking-[0.15em] text-[#042147]/60">
                  Institutions
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">

            {/* Main Card */}
            <div className="bg-white rounded-[32px] border border-[#042147]/10 p-8 shadow-sm">

              <div className="mb-8">
                <h3 className="font-serif text-3xl text-[#042147] mb-2">
                  Venue Highlights
                </h3>

                <p className="text-[#042147]/65 leading-7">
                  Designed to deliver a world-class conference
                  experience for delegates and advisors.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="
                        rounded-2xl
                        border
                        border-[#042147]/8
                        p-5
                        bg-[#FAFAFA]
                        hover:border-[#bb8b57]/30
                        transition-colors
                      "
                    >
                      <Icon
                        className="w-6 h-6 text-[#bb8b57] mb-4"
                        strokeWidth={1.5}
                      />

                      <h4 className="font-semibold text-[#042147] mb-2">
                        {item.title}
                      </h4>

                      <p className="text-sm leading-6 text-[#042147]/65">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating Location Card */}
            <div
              className="
                absolute
                -bottom-6
                -left-6
                bg-white
                rounded-2xl
                border
                border-[#042147]/10
                shadow-lg
                px-6
                py-5
                hidden
                lg:block
              "
            >
              <div className="flex items-center gap-3">
                <MapPin
                  className="w-5 h-5 text-[#bb8b57]"
                />

                <div>
                  <p className="font-medium text-[#042147]">
                    New Delhi
                  </p>

                  <p className="text-sm text-[#042147]/60">
                    Diplomatic & Political Capital
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}