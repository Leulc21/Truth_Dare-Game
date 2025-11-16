// app/api/generate-questions/route.ts
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { category, difficulty, environment } = await req.json();

    // Generate pairs of questions (10 pairs = 10 truths + 10 dares)
    const questionsCount = 10;

    const prompt = `
      Generate ${questionsCount} pairs of Truth and Dare questions for a "${category}" category game.
      The difficulty should be "${difficulty}" and it's played in an environment described as "${environment}".
      
      IMPORTANT: Each pair must have BOTH a truth question AND a dare question.
      
      The output should be strict JSON array like:
      [
        { 
          "truth": "What is your biggest fear?",
          "dare": "Do 10 jumping jacks right now"
        },
        { 
          "truth": "What is your most embarrassing moment?",
          "dare": "Sing your favorite song out loud"
        }
      ]
      
      Make sure:
      - Each object has BOTH "truth" and "dare" fields
      - Questions are appropriate for the ${difficulty} difficulty level
      - Questions fit the "${environment}" environment
      - Return ONLY the JSON array, no other text or markdown
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

      // Validate that each question has both truth and dare
      questions = questions.filter((q) => q.truth && q.dare);

      // If no valid questions, use fallback
      if (questions.length === 0) {
        throw new Error("No valid question pairs generated");
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      // Fallback questions with both truth and dare
      questions = [
        {
          truth: "What's your favorite memory with this group?",
          dare: "Do a funny dance for 30 seconds",
        },
        {
          truth: "What's the most embarrassing thing that happened to you?",
          dare: "Sing a song chosen by the group",
        },
        {
          truth: "What's a secret you've never told anyone?",
          dare: "Do 20 push-ups right now",
        },
        {
          truth: "Who in this group would you want to be stranded with?",
          dare: "Let someone draw on your face with a marker",
        },
        {
          truth: "What's your biggest fear?",
          dare: "Call a random contact and sing them happy birthday",
        },
        {
          truth: "What's the craziest thing you've ever done?",
          dare: "Do your best impression of someone in the group",
        },
        {
          truth: "What's something you've never told your best friend?",
          dare: "Post an embarrassing photo on social media",
        },
        {
          truth: "What's your most awkward date story?",
          dare: "Let the group go through your phone for 2 minutes",
        },
        {
          truth: "What's a lie you told that you never confessed?",
          dare: "Eat a spoonful of a condiment chosen by the group",
        },
        {
          truth: "What's your biggest regret?",
          dare: "Do a cartwheel or attempt one",
        },
      ];
    }

    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate questions" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
