import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        secondName: true,
        sex: true,
        phoneNumber: true,
        email: true,
        avatar: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, secondName, sex, phoneNumber, email, avatar } = body;

  if (!name || !secondName || !phoneNumber || !email || !avatar) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const accessToken = jwt.sign(
      { email },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { email },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    const user = await prisma.user.create({
      data: {
        name,
        secondName,
        sex: sex || "MALE",
        phoneNumber,
        email,
        avatar,
        accessToken,
        refreshToken,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        secondName: user.secondName,
        sex: user.sex,
        phoneNumber: user.phoneNumber,
        email: user.email,
        avatar: user.avatar,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
