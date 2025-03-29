import { NextResponse } from "next/server";
import twilio from "twilio";
import prisma from "@/lib/prisma";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(request: Request) {
  const { phoneNumber, code } = await request.json();

  if (!phoneNumber || !code) {
    return NextResponse.json({ error: "Missing phone number or code" }, { status: 400 });
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID!)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    if (verificationCheck.status === "approved") {
      // Подтверждаем пользователя
      const user = await prisma.user.update({
        where: { phoneNumber },
        data: { isEmailVerified: true }, // Используем этот флаг для номера тоже
      });

      return NextResponse.json({ message: "Phone verified successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 });
  }
}