import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";

const SMILE_ONE_KEY = "SmileCode-b57c6fca1d8942f7-988a945cec58abed"; // Замените на ваш ключ
const SMILE_ONE_UID = "SmileCode-67dd2d4aa886b"; // Замените на ваш UID
const SMILE_ONE_EMAIL = "Hoyakap@gmail.com"; // Замените на ваш email
const BASE_URL = "https://www.smile.one"; // Можно менять в зависимости от страны

function generateSign(params) {
  const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    acc[key] = params[key];
    return acc;
  }, {});

  let str = "";
  for (const [key, value] of Object.entries(sortedParams)) {
    str += `${key}=${value}&`;
  }
  str += SMILE_ONE_KEY;

  const md5Once = crypto.createHash("md5").update(str).digest("hex");
  return crypto.createHash("md5").update(md5Once).digest("hex");
}

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    // Запрос к API Smile One для получения продуктов
    const params = {
      uid: SMILE_ONE_UID,
      email: SMILE_ONE_EMAIL,
      product: "mobilelegends",
      time: Math.floor(Date.now() / 1000),
    };
    params.sign = generateSign(params);

    const response = await axios.post(`${BASE_URL}/smilecoin/api/product`, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching Smile One products:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}