// app/api/games/[id]/route.ts - ADD DELETE METHOD
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const gameId = parseInt(id);

    if (isNaN(gameId)) {
      return new Response(JSON.stringify({ error: "Invalid game ID" }), {
        status: 400,
      });
    }

    const game = await prisma.game.findFirst({
      where: {
        id: gameId,
        userId: session.user.id,
      },
    });

    if (!game) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(game));
  } catch (error) {
    console.error("Error fetching game:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// ✅ ADD DELETE METHOD
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const gameId = parseInt(id);

    if (isNaN(gameId)) {
      return new Response(JSON.stringify({ error: "Invalid game ID" }), {
        status: 400,
      });
    }

    // Delete the game
    await prisma.game.delete({
      where: {
        id: gameId,
        userId: session.user.id, // Ensure user can only delete their own games
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting game:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
