"use client";
import { motion } from "framer-motion";

import { Footer } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play, Plus } from "lucide-react";
import Link from "next/link";
import { CreateGameDialog } from "./components/CreateGameDialog";

const mockGames = [
  {
    id: 1,
    title: "Friday Night Fun",
    category: "Party",
    difficulty: "Spicy",
    questions: 25,
    players: 6,
  },
  {
    id: 2,
    title: "Date Night Special",
    category: "Romantic",
    difficulty: "Medium",
    questions: 20,
    players: 2,
  },
  {
    id: 3,
    title: "Family Gathering",
    category: "Family",
    difficulty: "Mild",
    questions: 30,
    players: 8,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Your <span className="gradient-text">Games</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Create and manage your Truth & Dare sessions
              </p>
            </div>
            <CreateGameDialog />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Game Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass border-dashed border-2 border-primary/30 h-full min-h-[280px] flex items-center justify-center cursor-pointer hover:border-primary/60 transition-all group">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create New Game</h3>
                <p className="text-sm text-muted-foreground">
                  Start a fresh session with AI-powered questions
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Existing Games */}
          {mockGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card className="glass border-white/10 h-full min-h-[280px] hover:border-primary/50 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="glass">
                      {game.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`glass ${
                        game.difficulty === "Spicy"
                          ? "border-primary/50 text-primary"
                          : game.difficulty === "Medium"
                          ? "border-secondary/50 text-secondary"
                          : "border-accent/50 text-accent"
                      }`}
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {game.questions} questions • {game.players} players
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/play/${game.id}`}>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity group">
                      <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                      Play Game
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
