"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCw, X } from "lucide-react";
import Link from "next/link";

const mockQuestions = [
  {
    truth: "What's the most embarrassing thing you've ever done on a date?",
    dare: "Do your best impression of someone in this room for 30 seconds",
  },
  {
    truth: "What's a secret you've never told anyone in this group?",
    dare: "Send a text to your crush (or ex) saying 'thinking about you'",
  },
  {
    truth: "Who in this room would you trust with your deepest secret?",
    dare: "Let someone go through your phone for 1 minute",
  },
  {
    truth: "What's the biggest lie you've ever told?",
    dare: "Post an embarrassing selfie on social media right now",
  },
];

const Play = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentQuestion = mockQuestions[currentIndex];

  const currentType = isFlipped ? "Dare" : "Truth";
  const currentText = isFlipped ? currentQuestion.dare : currentQuestion.truth;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockQuestions.length);
    }, 300);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/dashboard">
              <Button variant="ghost" className="glass">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="ghost" className="glass">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Game Stats */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Question</p>
              <p className="text-2xl font-bold gradient-text">
                {currentIndex + 1} / {mockQuestions.length}
              </p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Players</p>
              <p className="text-2xl font-bold">6</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
              <p className="text-2xl font-bold text-primary">Spicy</p>
            </div>
          </div>

          {/* Card Container */}
          <div className="relative min-h-[400px] flex items-center justify-center mb-12">
            {/* Glow effect */}
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
                        {currentQuestion.truth}
                      </p>
                      <p className="text-sm text-muted-foreground mt-8">
                        Click to flip • Showing Truth side
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
                        {currentQuestion.dare}
                      </p>
                      <p className="text-sm text-muted-foreground mt-8">
                        Click to flip • Showing Dare side
                      </p>
                    </motion.div>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
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
            >
              Next Question
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Play;
