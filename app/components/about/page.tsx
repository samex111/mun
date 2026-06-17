// app/about/page.tsx  (or wherever you wire this section in)
// ─────────────────────────────────────────────────────────────
// Demo page that renders the About Wordmark section.
// In production you'd embed AboutWordmarkSection inside your
// existing About page alongside other content sections.

import AboutWordmarkSection from "@/app/components/about/AboutWordmarkSection";

export const metadata = {
  title: "About — SMJMUN",
  description:
    "People Change. Purpose Remains. MUN teaches you how to speak. SMJMUN exists to give you something worth saying.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutWordmarkSection />

      {/* Add your remaining About page sections below */}
      {/* e.g. <AboutHistorySection /> */}
      {/* e.g. <AboutTeamSection />    */}
    </main>
  );
}
