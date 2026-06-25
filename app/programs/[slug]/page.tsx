import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProgramBySlug, getAllProgramSlugs } from "@/data/programs";
import { ProgramLanding } from "@/components/program/ProgramLanding";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return { title: "Program Not Found — SMJ MUN" };
  }

  return {
    title: program.meta.title,
    description: program.meta.description,
    openGraph: {
      title: program.meta.title,
      description: program.meta.description,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return <ProgramLanding data={program} />;
}
