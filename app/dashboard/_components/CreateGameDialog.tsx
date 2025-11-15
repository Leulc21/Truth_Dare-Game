"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

interface CreateGameDialogProps {
  onGameCreated?: (game: any) => void;
  children?: ReactNode;
}

export const CreateGameDialog = ({
  onGameCreated,
  children,
}: CreateGameDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    difficulty: "",
    environment: "",
    totalPlayers: 2,
  });

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      difficulty: "",
      environment: "",
      totalPlayers: 2,
    });
  };

  const handleSubmit = async () => {
    if (!form.category || !form.difficulty || !form.environment) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          difficulty: form.difficulty,
          environment: form.environment,
          totalPlayers: form.totalPlayers,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to create game");
      }

      const newGame = await res.json();
      toast.success("Game created successfully!");
      setOpen(false);
      resetForm();

      if (onGameCreated) onGameCreated(newGame);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Error creating game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            <Plus className="mr-2 w-4 h-4" /> Create New Game
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="glass border-white/10 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            Create Your Game
          </DialogTitle>
          <DialogDescription>
            Customize your Truth & Dare experience with AI-powered settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Game Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Friday Night Fun"
              className="glass border-white/10 focus:border-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => handleChange("category", v)}
              >
                <SelectTrigger className="glass border-white/10">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="romantic">Romantic</SelectItem>
                  <SelectItem value="family">Family Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty *</Label>
              <Select
                value={form.difficulty}
                onValueChange={(v) => handleChange("difficulty", v)}
              >
                <SelectTrigger className="glass border-white/10">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="spicy">Spicy</SelectItem>
                  <SelectItem value="extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Total Players</Label>
            <Input
              type="number"
              value={form.totalPlayers}
              onChange={(e) =>
                handleChange("totalPlayers", parseInt(e.target.value) || 2)
              }
              min={2}
              max={20}
              className="glass border-white/10 focus:border-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label>Environment *</Label>
            <Input
              value={form.environment}
              onChange={(e) => handleChange("environment", e.target.value)}
              placeholder="College dorm party with close friends"
              className="glass border-white/10 focus:border-primary/50"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 glass"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                loading ||
                !form.category ||
                !form.difficulty ||
                !form.environment
              }
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              {loading ? "Creating..." : "Create Game"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
