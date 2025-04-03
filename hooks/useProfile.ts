import { useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import $api from '@/app/http'

interface UserData {
	id: string
	name?: string
	secondName?: string
	sex: 'MALE' | 'FEMALE'
	birthDate?: string
	phoneNumber?: string
	email?: string
	avatar?: string
}

export const useProfile = () => {
	const tAuth = useTranslations('Auth')
	const tComponents = useTranslations('Components')
	const router = useRouter()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [userData, setUserData] = useState<UserData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const [name, setName] = useState('')
	const [secondName, setSecondName] = useState('')
	const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE')
	const [birthDate, setBirthDate] = useState<Date | null>(null)
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const [editStates, setEditStates] = useState({
		name: false,
		secondName: false,
		gender: false,
		birthDate: false,
		phone: false,
		email: false,
	})

	const [isGenderOpen, setIsGenderOpen] = useState(false)
	const [validationErrors, setValidationErrors] = useState({
		phone: '',
		email: '',
	})

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true)
				setError(null)
				const accessToken = localStorage.getItem('accessToken')
				const response = await $api.post(
					'/auth/me',
					{ accessToken },
					{
						headers: { 'Cache-Control': 'no-cache' },
					}
				)
				const user = response.data.user
				setUserData(user)
				setName(user.name || '')
				setSecondName(user.secondName || '')
				setGender(user.sex || 'MALE')
				setBirthDate(user.birthDate ? new Date(user.birthDate) : null)
				setPhone(user.phoneNumber || '')
				setEmail(user.email || '')
			} catch (err: any) {
				setError(err.response?.data?.error || tAuth('fetchProfileFailed'))
			} finally {
				setLoading(false)
			}
		}
		fetchProfile()
	}, [tAuth, router])

	const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append('accessToken', localStorage.getItem('accessToken') || '')
		formData.append('avatar', file)

		try {
			const response = await $api.patch('/auth/me/avatar', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			if (response.data.user) {
				setUserData(response.data.user)
			}
		} catch (error: any) {
			console.error('Error uploading avatar:', error)
			toast.error(error.response?.data?.error || 'Upload failed')
		}
	}

	const handleAvatarDelete = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken')
			const response = await $api.patch(`/users/${userData?.id}`, {
				accessToken,
				updatedUserData: { avatar: null },
			})
			setUserData(response.data.user)
		} catch (error) {
			console.error('Failed to delete avatar:', error)
			setError(tAuth('avatarDeleteFailed'))
		}
	}

	const validatePhone = (value: string) => {
		const phoneRegex = /^\+?[1-9]\d{1,14}$/
		return phoneRegex.test(value) ? '' : 'Неверный формат телефона'
	}

	const validateEmail = (value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(value) ? '' : 'Неверный формат почты'
	}

	const handlePhoneChange = (value: string) => {
		setPhone(value)
		setValidationErrors(prev => ({ ...prev, phone: validatePhone(value) }))
	}

	const handleEmailChange = (value: string) => {
		setEmail(value)
		setValidationErrors(prev => ({ ...prev, email: validateEmail(value) }))
	}

	const handleSave = async () => {
		if (validationErrors.phone || validationErrors.email) {
			setError('Исправьте ошибки в полях перед сохранением')
			return
		}

		try {
			setError(null)
			const accessToken = localStorage.getItem('accessToken')
			const updatedUserData = {
				name,
				secondName,
				sex: gender,
				birthDate: birthDate ? birthDate.toISOString().split('T')[0] : null,
				phoneNumber: phone,
				email,
			}

			const response = await $api.patch(`/users/${userData?.id}`, {
				accessToken,
				updatedUserData,
			})

			if (response.status === 200) {
				setUserData({ ...response.data.user })
				setEditStates({
					name: false,
					secondName: false,
					gender: false,
					birthDate: false,
					phone: false,
					email: false,
				})
				toast.success('Профиль обновлен')
			}
		} catch (err: any) {
			console.error('Error during save:', err.response?.data || err.message)
			setError(err.response?.data?.error || tAuth('updateFailed'))
		}
	}

	return {
		userData,
		loading,
		error,
		name,
		setName,
		secondName,
		setSecondName,
		gender,
		setGender,
		birthDate,
		setBirthDate,
		phone,
		setPhone,
		email,
		setEmail,
		editStates,
		setEditStates,
		isGenderOpen,
		setIsGenderOpen,
		validationErrors,
		fileInputRef,
		handleAvatarUpload,
		handleAvatarDelete,
		handleAvatarClick: () => !userData?.avatar && fileInputRef.current?.click(),
		handlePhoneChange,
		handleEmailChange,
		handleSave,
	}
}
