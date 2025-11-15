// app/dashboard/page.tsx - UPDATED WITH DELETE BUTTONS
"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Play, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
import { toast } from "sonner";
import { CreateGameDialog } from "./_components/CreateGameDialog";
import { DeleteGameDialog } from "./_components/DeleteGameDialog";

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

const Dashboard = () => {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingGameId, setDeletingGameId] = useState<number | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/games");
      if (!res.ok) throw new Error("Failed to load games");
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error("Failed to load games:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) fetchGames();
  }, [session, fetchGames]);

  const handleGameCreated = (newGame: Game) => {
    setGames((prev) => [newGame, ...prev]);
  };

  // ✅ ADD DELETE FUNCTION
  const handleDeleteGame = async (gameId: number) => {
    setDeletingGameId(gameId);
    try {
      const res = await fetch(`/api/games/${gameId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete game");
      }

      // Remove game from state
      setGames((prev) => prev.filter((game) => game.id !== gameId));
      toast.success("Game deleted successfully!");
    } catch (err) {
      console.error("Error deleting game:", err);
      toast.error("Failed to delete game");
    } finally {
      setDeletingGameId(null);
    }
  };

  if (isPending || (!session && !error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-300 animate-pulse">
          Checking session...
        </p>
      </div>
    );
  }

  if (!session) return null;

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
            <CreateGameDialog onGameCreated={handleGameCreated} />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading games...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No games yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CreateGameDialog onGameCreated={handleGameCreated}>
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
              </CreateGameDialog>
            </motion.div>

            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (index + 2) }}
              >
                <Card className="glass border-white/10 h-full min-h-[280px] hover:border-primary/50 transition-all group flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="glass capitalize">
                        {game.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`glass capitalize ${
                          game.difficulty.toLowerCase() === "spicy"
                            ? "border-primary/50 text-primary"
                            : game.difficulty.toLowerCase() === "medium"
                            ? "border-secondary/50 text-secondary"
                            : "border-accent/50 text-accent"
                        }`}
                      >
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {game.title || "Untitled Game"}
                    </CardTitle>
                    <CardDescription className="text-sm space-y-1">
                      <div>Players: {game.totalPlayers}</div>
                      <div>Questions: 10</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-2">
                    <Link href={`/play/${game.id}`}>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity group mb-2">
                        <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                        Play Game
                      </Button>
                    </Link>

                    {/* ✅ ADD DELETE BUTTON */}
                    <DeleteGameDialog
                      gameId={game.id}
                      onConfirm={handleDeleteGame}
                      loading={deletingGameId === game.id}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
