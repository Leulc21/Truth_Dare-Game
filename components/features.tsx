import { FeatureSteps } from "./feature-section";

const features = [
  {
    step: "Step 1",
    title: "Log In & Join the Fun",
    content:
      "Create an account or sign in to save your progress, track your games, and unlock personalized Truth & Dare experiences.",
    image:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "Create Your Game",
    content:
      "Choose your vibe — party, romantic, spicy, or chill. Select players, difficulty, and environment. Our AI will generate a unique game tailored just for your group.",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Start Playing",
    content:
      "Flip cards, answer truths, take dares, and let the AI keep the game exciting. Every round is fresh, unpredictable, and full of fun.",
    image:
      "https://images.unsplash.com/photo-1533106418989-88406c7cc8c7?q=80&w=2070&auto=format&fit=crop",
  },
];

export function FeaturesStep() {
  return (
    <FeatureSteps
      features={features}
      title="How to Play"
      autoPlayInterval={4000}
      imageHeight="h-[500px]"
    />
  );
}
