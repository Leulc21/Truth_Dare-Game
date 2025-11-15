// app/api/games/route.ts
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { title, category, difficulty, environment, totalPlayers } = body;

    const game = await prisma.game.create({
      data: {
        title: title || "Untitled Game",
        category,
        difficulty,
        environment,
        totalPlayers: Number(totalPlayers) || 2,
        userId: userId,
      },
    });

    return new Response(JSON.stringify(game), { status: 201 });
  } catch (error) {
    console.error("❌ Error creating game:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const games = await prisma.game.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(games));
  } catch (error) {
    console.error("Error fetching games:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
