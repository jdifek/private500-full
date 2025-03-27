import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const token = searchParams.get('token')

	if (!token) {
		return NextResponse.json({ error: 'No token provided' }, { status: 400 })
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET as string
		) as { userId: string }
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
		})

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		if (user.isEmailVerified) {
			return NextResponse.json(
				{ message: 'Email already verified' },
				{ status: 200 }
			)
		}

		await prisma.user.update({
			where: { id: user.id },
			data: { isEmailVerified: true },
		})

		return NextResponse.redirect(new URL('/', request.url))
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}
