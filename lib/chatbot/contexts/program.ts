import { ChatContext, Intent } from "../types";

export async function buildProgramContext(): Promise<ChatContext> {
  return {
    intent: Intent.PROGRAM,
    title: "Programs",
    content: "Program details are currently being updated. Please check back later.",
  };
}
