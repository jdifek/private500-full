import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  try {
    // Проверка уникальности email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        accessToken: null,
        refreshToken: null,
        isEmailVerified: false,
        role: "USER", // По умолчанию USER
      },
    });

    // Генерация токена подтверждения email
    const verificationToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "1h" }
    );

    // Настройка nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Отправка письма
    const verificationLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Подтверждение email",
      html: `<p>Пожалуйста, подтвердите ваш email, перейдя по ссылке: <a href="${verificationLink}">Подтвердить</a></p>`,
    });

    return NextResponse.json(
      { message: "User registered. Please verify your email." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}