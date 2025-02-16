import { NextResponse } from "next/server";
import prisma from "src/utils/client";

export async function POST(req: Request) {
  const { description, tags, userId, mindDoor, spiritDoor, actionDoor } = await req.json();
  if (!description || !tags || !userId) {
    return NextResponse.json({ error: "Missing required fields: description, tags, userid" }, { status: 400 });
  }
  try {
    const entry = await prisma.entry.create({
      data: {
        description,
        tags,
        user: {
          connect: { id: parseInt(userId)},
        },
        mindDoor,
        spiritDoor,
        actionDoor,
      },
    });
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const entries = await prisma.entry.findMany({
      where: {
        userId: userId ? parseInt(userId) : undefined,
      },
    });
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}