import { ChatbotService } from "../lib/chatbot/service";
import { Intent } from "../lib/chatbot/types";

const TEST_CASES = [
  {
    question: "What is SMJMUN?",
    expected: Intent.ORGANIZATION,
  },
  {
    question: "When is SMJ MUN Delhi?",
    expected: Intent.CONFERENCE,
  },
  {
    question: "Is accommodation available?",
    expected: Intent.CONFERENCE,
  },
  {
    question: "What should I wear?",
    expected: Intent.CONFERENCE, // or FAQ depending on keywords
  },
  {
    question: "What programs do you offer?",
    expected: Intent.PROGRAM,
  },
  {
    question: "How do I register?",
    expected: Intent.CONFERENCE, // "register" usually maps to Conference based on our keywords, or FAQ. We will see what the router assigns.
  },
  {
    question: "How can I contact you?",
    expected: Intent.CONTACT,
  },
  {
    question: "Hello",
    expected: Intent.GREETING,
  },
  {
    question: "What is quantum computing?",
    expected: Intent.UNKNOWN,
  }
];

async function runTests() {
  console.log("Running Chatbot Routing Tests...\n");

  let passed = 0;

  for (const test of TEST_CASES) {
    try {
      const result = await ChatbotService.buildContext(test.question);
      const isMatch = result.intent === test.expected || 
        (test.question === "What should I wear?" && (result.intent === Intent.CONFERENCE || result.intent === Intent.FAQ)) ||
        (test.question === "How do I register?" && (result.intent === Intent.CONFERENCE || result.intent === Intent.FAQ));

      if (isMatch) {
        passed++;
        console.log(`✅ PASS | Q: "${test.question}" | Intent: ${result.intent}`);
      } else {
        console.log(`❌ FAIL | Q: "${test.question}" | Expected: ${test.expected} | Got: ${result.intent}`);
      }
    } catch (error) {
      console.log(`❌ ERROR | Q: "${test.question}" | Error: ${(error as any).message}`);
    }
  }

  console.log(`\nResults: ${passed}/${TEST_CASES.length} passed.`);
}

runTests().catch(console.error);
