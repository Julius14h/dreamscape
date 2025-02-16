import { NextResponse } from "next/server";
import prisma from "src/utils/client";

export async function POST(req: Request) {
  try{
    const {username, password} = await req.json();
    if (!username || !password){
      return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }
    const user = await prisma.user.findUnique({
      where: {
        username,
      }
    });
    if (!user){
      return NextResponse.json({error: "User not found"}, {status: 404});
    }
    if (user.password !== password){
      return NextResponse.json({error: "Invalid password"}, {status: 401});
    }
    return NextResponse.json(user);
  } catch (error){
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}