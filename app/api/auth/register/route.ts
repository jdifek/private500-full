import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(request: Request) {
  const { identifier, password } = await request.json();

  if (!identifier || !password) {
    return NextResponse.json({ error: "Missing identifier or password" }, { status: 400 });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const isPhone = /^\+?[1-9]\d{1,14}$/.test(identifier); // Простая проверка номера телефона

  if (!isEmail && !isPhone) {
    return NextResponse.json({ error: "Invalid identifier format" }, { status: 400 });
  }

  try {
    // Проверка уникальности идентификатора
    const existingUser = isEmail
      ? await prisma.user.findUnique({ where: { email: identifier } })
      : await prisma.user.findUnique({ where: { phoneNumber: identifier } });

    if (existingUser) {
      return NextResponse.json(
        { error: `${isEmail ? "Email" : "Phone number"} already registered` },
        { status: 409 }
      );
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const userData = isEmail
      ? { email: identifier, password: hashedPassword, isEmailVerified: false }
      : { phoneNumber: identifier, password: hashedPassword, isEmailVerified: false }; // Используем isEmailVerified как флаг подтверждения

    const user = await prisma.user.create({
      data: {
        ...userData,
        accessToken: null,
        refreshToken: null,
        role: "USER",
      },
    });

    if (isEmail) {
      // Логика для email (оставляем как есть)
      const verificationToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: "1h" }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const verificationLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: identifier,
        subject: "Подтверждение email",
        html: `<p>Пожалуйста, подтвердите ваш email, перейдя по ссылке: <a href="${verificationLink}">Подтвердить</a></p>`,
      });

      return NextResponse.json(
        { message: "User registered. Please verify your email." },
        { status: 201 }
      );
    } else {
      // Логика для номера телефона с Twilio
      await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SID!)
        .verifications.create({
          to: identifier,
          channel: "sms",
        });

      return NextResponse.json(
        { message: "User registered. Please verify your phone with the code sent." },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error); // Логируем полную ошибку
    return NextResponse.json(
      { error: "Failed to register user", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}