// app/api/generate-questions/route.ts
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { category, difficulty, environment } = await req.json();

    // Use fixed number of questions (10)
    const questionsCount = 10;

    const prompt = `
      Generate ${questionsCount} Truth and Dare questions for a "${category}" category game.
      The difficulty should be "${difficulty}" and it's played in an environment described as "${environment}".
      The output should be strict JSON array like:
      [
        { "type": "truth", "question": "..." },
        { "type": "dare", "question": "..." }
      ]
      Make sure the questions are appropriate for the environment and difficulty level.
      Return ONLY the JSON array, no other text.
    `;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    let questions = [];
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

      if (!Array.isArray(questions)) {
        questions = [];
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      questions = [
        {
          type: "truth",
          question: "What's your favorite memory with this group?",
        },
        { type: "dare", question: "Do a funny dance for 30 seconds" },
      ];
    }

    return new Response(JSON.stringify({ questions }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate questions" }),
      {
        status: 500,
      }
    );
  }
}
