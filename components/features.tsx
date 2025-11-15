import { FeatureSteps } from "./feature-section";

const features = [
  {
    step: "Step 1",
    title: "Log In & Join the Fun",
    content:
      "Sign up or log in to save your progress, manage your games, and enjoy personalized Truth & Dare experiences with friends.",
    image: "/images/Screenshotlogin.png",
  },
  {
    step: "Step 2",
    title: "Access Your Dashboard",
    content:
      "View your dashboard to manage existing games or start a new session. See all created games and their details at a glance.",
    image: "/images/screenshotdash.png",
  },
  {
    step: "Step 3",
    title: "Create Your Game",
    content:
      "Customize your game by selecting title, category, difficulty, environment, and number of players. Our AI generates a unique set of Truths & Dares for you.",
    image: "/images/screenshootcreate.png",
  },
  {
    step: "Step 4",
    title: "Start Playing",
    content:
      "Flip cards, answer truths, take dares, and enjoy a dynamic, unpredictable game experience. Let the AI keep the fun going round after round.",
    image: "/images/screenshotplay.png",
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
