import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    console.log(body);
    console.log("before todo created");
    const todoCreated = await prisma.todo.create({
      data: {
        day: body.day,
        date: body.date,
        task: body.task,
        status: false,
        authorId: parseInt(session.user.id),
      },
    });
    return NextResponse.json(todoCreated);
  } catch (error) {
    return NextResponse.json({ message: "Todo not created" }, { status: 500 });
  }
}
