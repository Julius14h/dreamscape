import { NextResponse } from "next/server";
import prisma from "src/utils/client";

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing required field: entryId" }, { status: 400 });
  }
  const entryId = parseInt(id);
  try {
    const entry = await prisma.entry.delete({
      where: { id: entryId },
    });
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}