'use client'

import $api from '@/app/http'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import { AvatarCircle } from '@/components/AvatarCircle'
import toast from 'react-hot-toast'

const Profile = () => {
	const tAuth = useTranslations('Auth')
	const router = useRouter()
	const [userData, setUserData] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const localActive = useLocale()
	const { setIsAuthenticated, logout } = useAuth()
	const fileInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true)
				setError(null)

				const accessToken = localStorage.getItem('accessToken')
				const response = await $api.post('/auth/me', { accessToken })
				setUserData(response.data.user)
			} catch (err: any) {
				setError(err.response?.data?.error || tAuth('fetchProfileFailed'))
				if (err.response?.status === 401) {
					console.log('Unauthorized')
				}
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
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			setUserData(response.data.user)
		} catch (error: any) {
			console.error(
				'Failed to upload avatar:',
				error.response?.data || error.message
			)
			setError(tAuth('avatarUploadFailed'))
		}
	}

	const copyToClipboard = () => {
		if (userData?.id) {
			navigator.clipboard.writeText(userData.id)
			toast.success('ID скопирован!')
		}
	}

	const handleAvatarClick = () => {
		if (!userData?.avatar && fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handleExit = () => {
		logout()
		setIsAuthenticated(false)
		router.push('/')
	}

	const handleCoupon = () => {
		router.push(`/${localActive}/coupon/use`)
	}

	const handleHistory = () => {
		router.push(`/${localActive}/history/purchases`)
	}

	const handleTG = () => {
		router.push('https://t.me/DONVIPBIGObot')
	}

	const handleSettings = () => {
		router.push(`/${localActive}/auth/profile/settings`)
	}

	const buttons = [
		{
			title: tAuth('profileButtons.shopping'),
			click: handleHistory,
			img: <Image src='/icon-box.svg' alt='icon box' width={20} height={20} />,
		},
		{
			title: tAuth('profileButtons.coupons'),
			click: handleCoupon,
			img: (
				<Image src='/icon-coupons.svg' alt='icon box' width={20} height={20} />
			),
		},
		{
			title: tAuth('profileButtons.chatbot'),
			click: handleTG,
			img: (
				<Image src='/icon-telegram.svg' alt='icon box' width={20} height={20} />
			),
		},
		{
			title: tAuth('profileButtons.settings'),
			click: handleSettings,
			img: (
				<Image src='/icon-settings.svg' alt='icon box' width={20} height={20} />
			),
		},
		{
			title: tAuth('profileButtons.logout'),
			click: handleExit,
			img: <Image src='/icon-exit.svg' alt='icon box' width={20} height={20} />,
		},
	]

	if (loading) {
		return <p className='text-center text-gray-500'>{tAuth('loading')}</p>
	}

	if (error) {
		return <p className='text-center text-red-500'>{error}</p>
	}

	return (
		<div className='max-w-md mx-auto mt-8'>
			<AvatarCircle avatarUrl={userData?.avatar} onClick={handleAvatarClick} />
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleAvatarUpload}
				className='hidden'
				accept='image/*'
			/>

			<div className='flex items-center justify-center gap-2 mt-2'>
				<p className='text-center text-[#383838] text-[12px] leading-3 font-light'>
					Don-Vip ID: {userData?.id || 'N/A'}
				</p>
				<Image
					src='/copy.svg'
					alt='Copy ID'
					width={16}
					height={16}
					className='cursor-pointer'
					onClick={copyToClipboard}
				/>
			</div>
			<p className='text-center text-[18px] leading-3 font-normal mt-2 mb-9'>
				{userData?.name && userData?.secondName
					? `${userData?.name} ${userData?.secondName}`
					: userData?.name || userData?.secondName || 'No Name Provided'}
			</p>

			<ul className='space-y-2'>
				{buttons.map((button, index) => (
					<li
						onClick={button.click}
						key={index}
						className='flex gap-2 items-center justify-between hover:cursor-pointer'
					>
						<div className='flex gap-2 items-center p-[8px_16px] w-full h-[36px] bg-[#f3f4f7] rounded-[8px] transition-all duration-200 ease-in-out hover:bg-[#e1e2e7]'>
							{button.img}
							<p className='font-normal text-[14px] leading-[93%] text-[#000]'>
								{button.title}
							</p>
						</div>
						<div className='p-[8px_16px] flex items-center justify-center h-[36px] bg-[#f3f4f7] rounded-[8px] transition-all duration-200 ease-in-out hover:bg-[#e1e2e7]'>
							<Image
								src='/arrow-right.svg'
								alt='arrow right'
								width={8}
								height={14}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Profile
