// app/dashboard/page.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { MapPin, MessageSquare, Play, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Footer } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const handleDeleteGame = async (gameId: number) => {
    setDeletingGameId(gameId);
    try {
      const res = await fetch(`/api/games/${gameId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete game");
      }

      setGames((prev) => prev.filter((game) => game.id !== gameId));
      toast.success("Game deleted successfully!");
    } catch (err) {
      console.error("Error deleting game:", err);
      toast.error("Failed to delete game");
    } finally {
      setDeletingGameId(null);
    }
  };

  // In your Dashboard component, replace the formatDate function with this:

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // Reset time to midnight for accurate day comparison
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowOnly.getTime() - dateOnly.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  if (isPending || (!session && !error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground animate-pulse">
            Loading your games...
          </p>
        </div>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Your <span className="gradient-text">Games</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Create and manage your Truth & Dare sessions
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {games.length} {games.length === 1 ? "game" : "games"} created
              </p>
            </div>
            <CreateGameDialog onGameCreated={handleGameCreated} />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your games...</p>
          </div>
        ) : games.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No games yet</h3>
            <p className="text-muted-foreground text-lg mb-6">
              Create your first Truth & Dare game to get started!
            </p>
            <CreateGameDialog onGameCreated={handleGameCreated}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Plus className="mr-2 w-5 h-5" />
                Create Your First Game
              </Button>
            </CreateGameDialog>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Create New Game Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CreateGameDialog onGameCreated={handleGameCreated}>
                <Card className="glass border-dashed border-2 border-primary/30 h-full min-h-[320px] flex items-center justify-center cursor-pointer hover:border-primary/60 transition-all group">
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

            {/* Game Cards */}
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (index + 2) }}
              >
                <Card className="glass border-white/10 h-full min-h-[320px] hover:border-primary/30 transition-all duration-300 group flex flex-col overflow-hidden relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />

                  <CardHeader className="flex-grow space-y-4 relative z-10">
                    {/* Category and Difficulty Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant="outline"
                        className="glass capitalize px-3 py-1 text-xs font-medium border-primary/30 bg-primary/10 text-primary"
                      >
                        {game.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`glass px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                          game.difficulty.toLowerCase() === "spicy" ||
                          game.difficulty.toLowerCase() === "extreme"
                            ? "border-red-500/50 bg-red-500/10 text-red-400"
                            : game.difficulty.toLowerCase() === "medium"
                            ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
                            : "border-green-500/50 bg-green-500/10 text-green-400"
                        }`}
                      >
                        {game.difficulty}
                      </Badge>
                    </div>

                    {/* Game Title */}
                    <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {game.title || "Untitled Game"}
                    </CardTitle>

                    {/* Game Info Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Players
                          </p>
                          <p className="text-sm font-semibold">
                            {game.totalPlayers}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Questions
                          </p>
                          <p className="text-sm font-semibold">10</p>
                        </div>
                      </div>
                    </div>

                    {/* Environment Tag */}
                    {game.environment && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{game.environment}</span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="mt-auto space-y-2 relative z-10 pt-0">
                    {/* Play Button */}
                    <Link href={`/play/${game.id}`}>
                      <Button className="w-full bg-gradient-to-r from-primary via-primary/90 to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 group/btn shadow-lg shadow-primary/20 hover:shadow-primary/40">
                        <Play className="mr-2 w-4 h-4 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 transition-transform" />
                        Play Game
                      </Button>
                    </Link>

                    {/* Delete Button */}
                    <DeleteGameDialog
                      gameId={game.id}
                      onConfirm={handleDeleteGame}
                      loading={deletingGameId === game.id}
                    />
                  </CardContent>

                  {/* Created Date badge */}
                  <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/60 font-medium">
                    {formatDate(game.createdAt)}
                  </div>
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
