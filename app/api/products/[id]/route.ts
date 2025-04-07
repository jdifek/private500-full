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

export async function GET(
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
		return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
	}

	try {
		const product = await prisma.products.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				type: true,
				image: true,
				description: true,
			},
		})
		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 })
		}
		return NextResponse.json(product, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
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

		const { updatedProductData } = await request.json()
		const { name, type, image, description } = updatedProductData

		const updatedProduct = await prisma.products.update({
			where: { id: params.id },
			data: {
				name: name || undefined,
				type: type || undefined,
				image: image || undefined,
				description: description || undefined,
			},
		})

		return NextResponse.json(updatedProduct, { status: 200 })
	} catch (error) {
		console.error('PATCH /api/products/[id] error:', error)
		return NextResponse.json(
			{ error: 'Failed to update product' },
			{ status: 500 }
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
		return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
	}

	try {
		await prisma.products.delete({
			where: { id },
		})
		return NextResponse.json({ message: 'Product deleted' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting product:', error)
		return NextResponse.json({ error: 'Product not found' }, { status: 404 })
	}
}

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const authHeader = request.headers.get("authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return NextResponse.json({ error: "No token provided" }, { status: 401 });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

//     const { id } = params;
//     if (!id) {
//       return NextResponse.json(
//         { error: "Invalid product ID" },
//         { status: 400 }
//       );
//     }

//     const product = await prisma.products.findUnique({
//       where: { id },
//       select: {
//         type: true,
//         image: true,
//         description: true,
//       },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const authHeader = request.headers.get("authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return NextResponse.json({ error: "No token provided" }, { status: 401 });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

//     const { id } = params;
//     if (!id) {
//       return NextResponse.json(
//         { error: "Invalid product ID" },
//         { status: 400 }
//       );
//     }

//     const product = await prisma.products.delete({
//       where: { id },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }
