import { ChatbotService } from "../lib/chatbot/service";

// Required to use absolute imports if running via tsx/ts-node, but since we run this as a simple script, 
// wait, Next.js sets up the absolute imports, if we run it directly via ts-node, the `@/` imports will fail.
// So let's run this in a way that respects Next.js paths, e.g., by using `npx tsx` or changing the imports in the script.
// Let's create a test script that can be executed.

async function run() {
  console.log("Testing Chatbot Context Pipeline...\n");
  
  const question = "When is SMJ MUN Delhi?";
  console.log(`User Question: "${question}"\n`);
  
  const result = await ChatbotService.buildContext(question);
  
  console.log("Result:");
  console.log(JSON.stringify({
    intent: result.intent,
    context: result.context
  }, null, 2));

  console.log("\n========================\n");
  console.log("Final Prompt generated:");
  console.log(result.finalPrompt);
}

run().catch(console.error);
