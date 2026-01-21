import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const userFound = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (userFound) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 409 },
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userCreated = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    console.log(userCreated);
    if (userCreated) {
      return NextResponse.json({ message: "user created" }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
    );
  }
}
