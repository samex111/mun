import type { ProgramData } from "@/components/program/types";
import { schoolMunProgram } from "./school-mun";
import { collegeMunProgram } from "./college-mun";
import { trainingCellProgram } from "./training-cell";

/**
 * Registry of all program data objects.
 * To add a new program page, create a data file and register it here.
 */
const programs: Record<string, ProgramData> = {
  "school-mun-association": schoolMunProgram,
  "college-mun-association": collegeMunProgram,
  "training-cell": trainingCellProgram,
};

/** Look up a program by its URL slug */
export function getProgramBySlug(slug: string): ProgramData | undefined {
  return programs[slug];
}

/** Get all program slugs for static generation */
export function getAllProgramSlugs(): string[] {
  return Object.keys(programs);
}

/** Get all programs as an array */
export function getAllPrograms(): ProgramData[] {
  return Object.values(programs);
}
