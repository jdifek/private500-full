import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as { userId: string; email: string; role: string };

    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { id: true, name: true, secondName: true, email: true, avatar: true } },
        product: { select: { id: true, name: true, image: true, description: true, type: true } }
      }
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
