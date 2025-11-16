// app/play/[id]/page.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, RotateCw, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Question {
  truth: string;
  dare: string;
}

interface Game {
  id: number;
  title?: string;
  category: string;
  difficulty: string;
  environment: string;
  totalPlayers: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const Play = () => {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;

  const [game, setGame] = useState<Game | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const loadGameAndQuestions = async () => {
      try {
        setLoading(true);

        // 1. Get game info
        const gameRes = await fetch(`/api/games/${gameId}`);
        if (!gameRes.ok) {
          if (gameRes.status === 404) {
            throw new Error("Game not found");
          }
          throw new Error("Failed to load game");
        }

        const gameData = await gameRes.json();
        setGame(gameData);

        // 2. Generate questions for this game
        setGeneratingQuestions(true);
        const questionsRes = await fetch("/api/generate-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: gameData.category,
            difficulty: gameData.difficulty,
            environment: gameData.environment,
          }),
        });

        if (!questionsRes.ok) {
          throw new Error("Failed to generate questions");
        }

        const { questions: generatedQuestions } = await questionsRes.json();
        setQuestions(generatedQuestions || []);
      } catch (err) {
        console.error("Error loading game:", err);
        setError(err instanceof Error ? err.message : "Failed to load game");
      } finally {
        setLoading(false);
        setGeneratingQuestions(false);
      }
    };

    if (gameId) {
      loadGameAndQuestions();
    }
  }, [gameId]);

  const handleNext = () => {
    if (!questions.length) return;

    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % questions.length);
    }, 300);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleEndGame = () => {
    router.push("/dashboard");
  };

  const getCurrentQuestionText = () => {
    if (!questions.length) return "No questions available";

    const currentQuestion = questions[currentIndex];

    if (isFlipped) {
      return currentQuestion.dare || "No dare question available";
    } else {
      return currentQuestion.truth || "No truth question available";
    }
  };

  const currentText = getCurrentQuestionText();
  const currentType = isFlipped ? "dare" : "truth";

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-xl">Loading game...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (generatingQuestions) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-xl">Generating questions...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Creating AI-powered questions
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
              <p className="text-muted-foreground text-lg">
                {error || "The game you're looking for doesn't exist."}
              </p>
            </div>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Link href="/dashboard">
              <Button variant="ghost" className="glass">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold gradient-text">
                {game.title || "Untitled Game"}
              </h1>
              <p className="text-sm text-muted-foreground capitalize">
                {game.category}
              </p>
            </div>
            <Button variant="ghost" className="glass" onClick={handleEndGame}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Question</p>
              <p className="text-2xl font-bold gradient-text">
                {currentIndex + 1} / {questions.length}
              </p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Players</p>
              <p className="text-2xl font-bold">{game.totalPlayers}</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
              <p className="text-2xl font-bold text-primary capitalize">
                {game.difficulty}
              </p>
            </div>
          </div>

          <div className="relative min-h-[400px] flex items-center justify-center mb-12">
            <div
              className={`absolute inset-0 rounded-3xl blur-3xl transition-all duration-700 ${
                isFlipped ? "bg-secondary/20" : "bg-primary/20"
              }`}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-2xl"
                style={{ perspective: 1200 }}
              >
                <div
                  className="relative w-full min-h-[400px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
                    transition: "transform 0.6s ease",
                  }}
                  onClick={handleFlip}
                  aria-label="Flip card"
                  role="button"
                >
                  {/* Front — Truth */}
                  <Card
                    className="glass border-2 p-12 min-h-[400px] flex flex-col items-center justify-center text-center cursor-pointer border-primary/50 glow-primary"
                    style={{
                      backfaceVisibility: "hidden",
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="inline-flex px-6 py-3 rounded-full mb-8 bg-gradient-to-r from-primary/20 to-primary/10 transition-all duration-500">
                        <span className="text-2xl font-bold gradient-text">
                          Truth
                        </span>
                      </div>
                      <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                        {currentText}
                      </p>
                      <p className="text-sm text-muted-foreground mt-8">
                        Click to flip to Dare
                      </p>
                    </motion.div>
                  </Card>

                  {/* Back — Dare */}
                  <Card
                    className="glass border-2 p-12 min-h-[400px] flex flex-col items-center justify-center text-center cursor-pointer border-secondary/50 glow-secondary"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="inline-flex px-6 py-3 rounded-full mb-8 bg-gradient-to-r from-secondary/20 to-secondary/10 transition-all duration-500">
                        <span className="text-2xl font-bold gradient-text">
                          Dare
                        </span>
                      </div>
                      <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                        {currentText}
                      </p>
                      <p className="text-sm text-muted-foreground mt-8">
                        Click to flip to Truth
                      </p>
                    </motion.div>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleFlip}
              className="glass px-8"
            >
              <RotateCw className="mr-2 w-4 h-4" />
              Flip Card
            </Button>
            <Button
              size="lg"
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity px-12"
              disabled={!questions.length}
            >
              Next Question
            </Button>
          </div>

          {game.environment && (
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Environment: {game.environment}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Play;
