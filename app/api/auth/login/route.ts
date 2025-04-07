import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
	const { identifier, password } = await request.json()

	if (!identifier || !password) {
		return NextResponse.json(
			{ error: 'Missing identifier or password' },
			{ status: 400 }
		)
	}

	const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
	const isPhone = /^\+?[1-9]\d{1,14}$/.test(identifier)

	if (!isEmail && !isPhone) {
		return NextResponse.json(
			{ error: 'Invalid identifier format' },
			{ status: 400 }
		)
	}

	try {
		const user = isEmail
			? await prisma.user.findUnique({ where: { email: identifier } })
			: await prisma.user.findUnique({ where: { phoneNumber: identifier } })

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
		}

		if (!user.isEmailVerified) {
			return NextResponse.json(
				{ error: `${isEmail ? 'Email' : 'Phone number'} not verified` },
				{ status: 403 }
			)
		}

		const accessToken = jwt.sign(
			{
				userId: user.id,
				email: user.email || user.phoneNumber,
				role: user.role,
			},
			process.env.JWT_ACCESS_SECRET as string,
			{ expiresIn: '15m' }
		)
		const refreshToken = jwt.sign(
			{
				userId: user.id,
				email: user.email || user.phoneNumber,
				role: user.role,
			},
			process.env.JWT_REFRESH_SECRET as string,
			{ expiresIn: '7d' }
		)

		await prisma.user.update({
			where: { id: user.id },
			data: { refreshToken }, // Сохраняем только refreshToken
		})

		return NextResponse.json(
			{
				id: user.id,
				identifier: isEmail ? user.email : user.phoneNumber,
				role: user.role,
				accessToken,
				refreshToken,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('Login error:', error)
		return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
	}
}

// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   const { identifier, password } = await request.json();

//   if (!identifier || !password) {
//     return NextResponse.json(
//       { error: "Missing identifier or password" },
//       { status: 400 }
//     );
//   }

//   const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
//   const isPhone = /^\+?[1-9]\d{1,14}$/.test(identifier);

//   if (!isEmail && !isPhone) {
//     return NextResponse.json({ error: "Invalid identifier format" }, { status: 400 });
//   }

//   try {
//     // Поиск пользователя по email или phoneNumber
//     const user = isEmail
//       ? await prisma.user.findUnique({ where: { email: identifier } })
//       : await prisma.user.findUnique({ where: { phoneNumber: identifier } });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Проверка пароля
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//     }

//     // Проверка верификации
//     if (!user.isEmailVerified) {
//       return NextResponse.json(
//         { error: `${isEmail ? "Email" : "Phone number"} not verified` },
//         { status: 403 }
//       );
//     }

//     // Генерация токенов
//     const accessToken = jwt.sign(
//       { userId: user.id, identifier: isEmail ? user.email : user.phoneNumber, role: user.role },
//       process.env.JWT_ACCESS_SECRET as string,
//       { expiresIn: "15m" }
//     );
//     const refreshToken = jwt.sign(
//       { userId: user.id, identifier: isEmail ? user.email : user.phoneNumber, role: user.role },
//       process.env.JWT_REFRESH_SECRET as string,
//       { expiresIn: "7d" }
//     );

//     // Обновление токенов в базе данных
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { accessToken, refreshToken },
//     });

//     // Ответ с данными пользователя
//     return NextResponse.json(
//       {
//         id: user.id,
//         identifier: isEmail ? user.email : user.phoneNumber,
//         role: user.role,
//         accessToken,
//         refreshToken,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "Failed to login", details: error.message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }
