import { ChatbotService } from "../lib/chatbot/service";

async function run() {
  console.log("Testing AI Provider Pipeline...\n");
  
  const question = "When is SMJ MUN Delhi?";
  console.log(`User Question: "${question}"\n`);
  
  try {
    const result = await ChatbotService.generateAnswer(question);
    
    console.log("=== AI Response ===");
    console.log(result.answer);
    console.log("\n===================");
    console.log("Intent:", result.intent);
    console.log("Sources:", result.sources);
  } catch (error: any) {
    console.error("\nTest aborted (expected if no API keys are set):");
    console.error(error.message);
  }
}

run().catch(console.error);
