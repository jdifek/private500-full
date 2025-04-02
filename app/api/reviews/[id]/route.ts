import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

const verifyTokenAndRole = (authHeader: string | null) => {
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return { error: 'No token provided', status: 401 }
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
			return { error: 'Forbidden: Admins only', status: 403 }
		}
		return { decoded }
	} catch (error) {
		return { error: 'Invalid or expired token', status: 401 }
	}
}

export async function PATCH(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	const authHeader = request.headers.get('authorization')
	const tokenCheck = verifyTokenAndRole(authHeader)
	if ('error' in tokenCheck) {
		return NextResponse.json(
			{ error: tokenCheck.error },
			{ status: tokenCheck.status }
		)
	}

	const params = await context.params
	const { id } = params
	if (!id) {
		return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 })
	}

	const body = await request.json()
	const updatedReviewData = body.updatedReviewData
	if (!updatedReviewData) {
		return NextResponse.json({ error: 'No data to update' }, { status: 400 })
	}

	const updateData: { [key: string]: any } = {}
	if ('description' in updatedReviewData)
		updateData.description = updatedReviewData.description
	if ('status' in updatedReviewData)
		updateData.status = updatedReviewData.status

	if (Object.keys(updateData).length === 0) {
		return NextResponse.json(
			{ error: 'No valid fields to update' },
			{ status: 400 }
		)
	}

	try {
		const review = await prisma.review.update({
			where: { id },
			data: updateData,
		})
		return NextResponse.json(review, { status: 200 })
	} catch (error) {
		console.error('Error updating review:', error)
		return NextResponse.json(
			{ error: 'Review not found or update failed' },
			{ status: 404 }
		)
	}
}

export async function DELETE(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	const authHeader = request.headers.get('authorization')
	const tokenCheck = verifyTokenAndRole(authHeader)
	if ('error' in tokenCheck) {
		return NextResponse.json(
			{ error: tokenCheck.error },
			{ status: tokenCheck.status }
		)
	}

	const params = await context.params
	const { id } = params
	if (!id) {
		return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 })
	}

	try {
		await prisma.review.delete({
			where: { id },
		})
		return NextResponse.json({ message: 'Review deleted' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting review:', error)
		return NextResponse.json({ error: 'Review not found' }, { status: 404 })
	}
}
