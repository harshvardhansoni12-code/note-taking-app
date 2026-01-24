import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    console.log(session);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    //
    const getTodo = await prisma.todo.findMany({
      where: {
        author: {
          id: Number(session.user.id),
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    if (getTodo) {
      console.log(getTodo);
      return NextResponse.json(getTodo, { status: 201 });
    }
  } catch (error) {
    //
    return NextResponse.error();
  }
}
