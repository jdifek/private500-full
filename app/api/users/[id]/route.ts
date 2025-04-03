import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

const verifyToken = (token: string) => {
	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET as string
		) as {
			userId: string
			email: string
			role: string
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
	const body = await request.json()
	const { accessToken, updatedUserData } = body
	const params = await context.params
	const { id } = params

	if (!id) {
		return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
	}

	const token = authHeader?.startsWith('Bearer ')
		? authHeader.split(' ')[1]
		: accessToken
	if (!token) {
		return NextResponse.json({ error: 'No token provided' }, { status: 401 })
	}

	const tokenCheck = verifyToken(token)
	if ('error' in tokenCheck) {
		return NextResponse.json(
			{ error: tokenCheck.error },
			{ status: tokenCheck.status }
		)
	}

	const { decoded } = tokenCheck

	if (!updatedUserData) {
		return NextResponse.json({ error: 'No data to update' }, { status: 400 })
	}

	const updateData: { [key: string]: any } = {}

	if ('name' in updatedUserData) updateData.name = updatedUserData.name
	if ('secondName' in updatedUserData)
		updateData.secondName = updatedUserData.secondName
	if ('phoneNumber' in updatedUserData)
		updateData.phoneNumber = updatedUserData.phoneNumber
	if ('email' in updatedUserData) updateData.email = updatedUserData.email
	if ('avatar' in updatedUserData) updateData.avatar = updatedUserData.avatar
	if ('sex' in updatedUserData) updateData.sex = updatedUserData.sex
	if ('birthDate' in updatedUserData)
		updateData.birthDate = updatedUserData.birthDate

	// Обрабатываем изменение роли, если пользователь — админ
	if ('role' in updatedUserData) {
		if (decoded.role !== 'ADMIN') {
			return NextResponse.json(
				{ error: 'Forbidden: Only admins can update roles' },
				{ status: 403 }
			)
		}
		updateData.role = updatedUserData.role
	}

	if (Object.keys(updateData).length === 0) {
		return NextResponse.json(
			{ error: 'No valid fields to update' },
			{ status: 400 }
		)
	}

	try {
		const user = await prisma.user.update({
			where: { id },
			data: updateData,
		})

		return NextResponse.json({ user }, { status: 200 })
	} catch (error) {
		console.error('Error updating user:', error)
		return NextResponse.json(
			{ error: 'User not found or update failed' },
			{ status: 404 }
		)
	}
}

export async function DELETE(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	const authHeader = request.headers.get('authorization')
	const params = await context.params
	const { id } = params

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json({ error: 'No token provided' }, { status: 401 })
	}

	const token = authHeader.split(' ')[1]
	const tokenCheck = verifyToken(token)
	if ('error' in tokenCheck) {
		return NextResponse.json(
			{ error: tokenCheck.error },
			{ status: tokenCheck.status }
		)
	}

	const { decoded } = tokenCheck
	if (decoded.role !== 'ADMIN') {
		return NextResponse.json(
			{ error: 'Forbidden: Admins only' },
			{ status: 403 }
		)
	}

	if (!id) {
		return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
	}

	try {
		await prisma.user.delete({
			where: { id },
		})
		return NextResponse.json({ message: 'User deleted' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting user:', error)
		return NextResponse.json({ error: 'User not found' }, { status: 404 })
	}
}

export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	const authHeader = request.headers.get('authorization')
	const params = await context.params
	const { id } = params

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json({ error: 'No token provided' }, { status: 401 })
	}

	const token = authHeader.split(' ')[1]
	const tokenCheck = verifyToken(token)
	if ('error' in tokenCheck) {
		return NextResponse.json(
			{ error: tokenCheck.error },
			{ status: tokenCheck.status }
		)
	}

	const { decoded } = tokenCheck
	if (decoded.role !== 'ADMIN') {
		return NextResponse.json(
			{ error: 'Forbidden: Admins only' },
			{ status: 403 }
		)
	}

	if (!id) {
		return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				secondName: true,
				sex: true,
				phoneNumber: true,
				email: true,
				avatar: true,
				role: true,
			},
		})
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}
		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		console.error('Error fetching user:', error)
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/prisma";
// export async function PATCH(
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
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     const body = await request.json();

//     if (!body.updatedUserData) {
//       return NextResponse.json({ error: "No data to update" }, { status: 400 });
//     }

//     const updatedUserData = body.updatedUserData;
//     const updateData: { [key: string]: any } = {};

//     console.log("Received body:", body);
//     console.log("Updated User Data:", updatedUserData);

//     // Обрабатываем только те поля, которые переданы в updatedUserData
//     if ("name" in updatedUserData) updateData.name = updatedUserData.name;
//     if ("secondName" in updatedUserData)
//       updateData.secondName = updatedUserData.secondName;
//     if ("phoneNumber" in updatedUserData)
//       updateData.phoneNumber = updatedUserData.phoneNumber;
//     if ("email" in updatedUserData) updateData.email = updatedUserData.email;
//     if ("avatar" in updatedUserData) updateData.avatar = updatedUserData.avatar;
//     if ("sex" in updatedUserData) updateData.sex = updatedUserData.sex;
//     if ("role" in updatedUserData) updateData.role = updatedUserData.role;

//     if (Object.keys(updateData).length === 0) {
//       return NextResponse.json(
//         { error: "No valid fields to update" },
//         { status: 400 }
//       );
//     }

//     console.log("Update Data:", updateData);

//     // Обновление пользователя в базе данных
//     const user = await prisma.user.update({
//       where: { id },
//       data: updateData,
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     console.log("Updated user:", user);

//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }
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
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         name: true,
//         secondName: true,
//         sex: true,
//         phoneNumber: true,
//         email: true,
//         avatar: true,
//         role: true, // Добавляем роль в ответ
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user, { status: 200 });
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
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     const user = await prisma.user.delete({
//       where: { id },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }
