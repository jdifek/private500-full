import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
	try {
		const { accessToken } = await request.json()
		console.log('Received access token:', accessToken)

		if (!accessToken) {
			console.log('No token provided')
			return NextResponse.json({ error: 'No token provided' }, { status: 401 })
		}

		// Проверяет токен через JWT
		const decoded = jwt.verify(
			accessToken,
			process.env.JWT_ACCESS_SECRET as string
		) as {
			userId: string
			email: string
			role: string
		}
		console.log('Decoded token:', decoded)

		// Ищет пользователя по userId из токена
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
			select: {
				id: true,
				email: true,
				phoneNumber: true,
				avatar: true,
				name: true,
				role: true,
			},
		})

		if (!user) {
			console.log('User not found for ID:', decoded.userId)
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		return NextResponse.json({ user }, { status: 200 })
	} catch (error) {
		console.error('Error during token verification:', error)
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     // Лог 1: Печатаем данные из запроса (токен)
//     const { accessToken } = await request.json();
//     console.log("Received access token:", accessToken);

//     if (!accessToken) {
//       console.log("No token provided");
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     // Ищем пользователя по accessToken (без декодирования)
//     const user = await prisma.user.findUnique({
//       where: { accessToken },
//     });

//     if (!user) {
//       console.log("User not found");
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Возвращаем данные пользователя
//     return NextResponse.json({ user }, { status: 200 });
//   } catch (error) {
//     console.error("Error during token verification:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
