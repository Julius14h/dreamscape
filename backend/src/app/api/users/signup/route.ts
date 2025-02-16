import { NextResponse } from "next/server";
import prisma from "src/utils/client";

export async function POST(req: Request) {
  try {
    const { username, password, firstName, lastName } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const user = await prisma.user.create({
      data: {
        username,
        password,
        firstName,
        lastName
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}