import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import prisma from '@/lib/prisma'

export async function PATCH(request: Request) {
	try {
		const formData = await request.formData()
		const accessToken = formData.get('accessToken') as string
		const file = formData.get('avatar') as File

		if (!accessToken) {
			return NextResponse.json({ error: 'No token provided' }, { status: 401 })
		}

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 })
		}

		// Проверяем пользователя по accessToken
		const user = await prisma.user.findUnique({
			where: { accessToken },
		})

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		// Генерируем уникальное имя файла
		const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`

		// Загружаем файл в Supabase Storage (бакет "avatars")
		const { error: uploadError } = await supabase.storage
			.from('avatars')
			.upload(fileName, file, {
				cacheControl: '3600',
				upsert: true,
			})

		if (uploadError) {
			console.error('Supabase upload error:', uploadError)
			return NextResponse.json(
				{ error: 'Failed to upload to Supabase', details: uploadError.message },
				{ status: 500 }
			)
		}

		// Получаем публичный URL загруженного файла
		const { data: publicData } = supabase.storage
			.from('avatars')
			.getPublicUrl(fileName)

		if (!publicData?.publicUrl) {
			return NextResponse.json(
				{ error: 'Failed to retrieve public URL' },
				{ status: 500 }
			)
		}

		const avatarUrl = publicData.publicUrl

		// Обновляем поле avatar в базе данных
		const updatedUser = await prisma.user.update({
			where: { accessToken },
			data: { avatar: avatarUrl },
		})

		return NextResponse.json({ user: updatedUser }, { status: 200 })
	} catch (error) {
		console.error('Error updating avatar:', error)
		return NextResponse.json(
			{
				error: 'Internal server error',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}
