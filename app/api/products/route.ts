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

		const products = await prisma.products.findMany({
			select: {
				id: true,
				name: true,
				type: true,
				image: true,
				description: true,
			},
		})
		return NextResponse.json(products, { status: 200 })
	} catch (error) {
		console.error('GET /api/products error:', error)
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}

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

		const body = await request.json()
		const product = await prisma.products.create({
			data: {
				name: body.name,
				type: body.type || 'SERVICE',
				image: body.image,
				description: body.description,
			},
		})

		return NextResponse.json(product, { status: 201 })
	} catch (error) {
		console.error('Product creation error:', error)
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 401 }
		)
	}
}

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/prisma";

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

//     const users = await prisma.products.findMany({
//       select: {
//         id: true,
//         name: true,
//         type: true,
//         image: true,
//         description: true,
//       },
//     });
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }

// export async function POST(request: Request) {
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

//     // Get the request body
//     const body = await request.json();

//     // Create the product with the data from the frontend
//     const product = await prisma.products.create({
//       data: {
//         name: body.name,
//         type: body.type,
//         image: body.image,
//         description: body.description,
//         // Add any other required fields based on your Prisma schema
//       },
//     });

//     return NextResponse.json(product, { status: 201 });
//   } catch (error) {
//     console.error("Product creation error:", error);
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }
