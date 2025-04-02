import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
	const authHeader = request.headers.get('authorization')
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json({ error: 'No token provided' }, { status: 401 })
	}

	const token = authHeader.split(' ')[1]
	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET as string
		) as {
			userId: string
			email: string
			role: string
		}

		if (decoded.role !== 'ADMIN') {
			return NextResponse.json(
				{ error: 'Forbidden: Admins only' },
				{ status: 403 }
			)
		}

		const reviews = await prisma.review.findMany()
		return NextResponse.json(reviews, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}

// export async function GET(request: Request) {
//   const authHeader = request.headers.get("authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return NextResponse.json({ error: "No token provided" }, { status: 401 });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_ACCESS_SECRET as string
//     ) as {
//       userId: string;
//       email: string;
//       role: string;
//     };

//     if (decoded.role !== "ADMIN") {
//       return NextResponse.json(
//         { error: "Forbidden: Admins only" },
//         { status: 403 }
//       );
//     }

//     const users = await prisma.review.findMany();
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }

export async function POST(request: Request) {
	const authHeader = request.headers.get('authorization')
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json({ error: 'No token provided' }, { status: 401 })
	}
	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET as string
		) as { userId: string } // 👈 Декодируем токен и получаем userId

		console.log(decoded)

		if (!decoded.userId) {
			return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
		}

		const body = await request.json()
		const { productId, description, status } = body

		const review = await prisma.review.create({
			data: {
				userId: decoded.userId, // 👈 Берём userId из токена
				productId,
				description,
				status,
			},
		})

		return NextResponse.json(review, { status: 201 })
	} catch (error) {
		console.error('Review creation error:', error)
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}
