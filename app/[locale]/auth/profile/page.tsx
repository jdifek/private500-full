'use client'
import $api from '@/app/http'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'

const Profile = () => {
	const tAuth = useTranslations('Auth')
	const router = useRouter()
	const [userData, setUserData] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const localActive = useLocale()
	const { setIsAuthenticated } = useAuth()

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true)
				setError(null)

				const accessToken = localStorage.getItem('accessToken')

				const response = await $api.post('/auth/me', { accessToken })
				console.log(response)

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

	const handleExit = () => {
		// Remove tokens from localStorage
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		setIsAuthenticated(false)

		// Redirect to home page
		router.push('/')
	}
	const handleCoupon = () => {
		router.push(`/${localActive}/coupon/use`)
	}
	const handleHistory = () => {
		router.push(`/${localActive}/history/purchases`)
	}
	const handleTG = () => {
		router.push(`https://t.me/DONVIPBIGObot`)
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
			img: (
				<Image src='/icon-settings.svg' alt='icon box' width={20} height={20} />
			),
		},
		{
			title: tAuth('profileButtons.logout'),
			click: handleExit, // Directly pass the function here
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
		<>
			<div className='border-0 bg-gray-400 w-16 h-16 rounded-full m-auto mt-5'></div>
			<p className='font-light text-[12px] leading-[108%] text-center text-[#383838] mt-2 mb-1'>
				Don-Vip ID: {userData?.id || 'N/A'}
			</p>
			<p className='font-normal text-[18px] leading-[72%] text-center text-[#000] mb-8'>
				{userData?.name || 'name'} {userData?.secondName || 'secondName'}
			</p>

			<ul className=''>
				{buttons.map((button, index) => (
					<li onClick={button.click} key={index} className='flex gap-2 mb-2'>
						<div className='border-0 hover:cursor-pointer border-[#8b8b8b] rounded-[8px] flex gap-2 items-center p-[8px_16px] w-full h-[36px] bg-[#f3f4f7] transition-all duration-200 ease-in-out hover:bg-[#e1e2e7]'>
							{button.img}
							<p className='font-normal text-[14px] leading-[93%] text-center text-[#000]'>
								{button.title}
							</p>
						</div>
						<div className='border-0 border-[#8b8b8b] rounded-[8px] p-[8px_16px] flex items-center justify-center h-[36px] hover:cursor-pointer bg-[#f3f4f7] transition-all duration-200 ease-in-out hover:bg-[#e1e2e7]'>
							<Image
								src='/arrow-right.svg'
								alt='arrow right icon'
								width={8}
								height={14}
							/>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

export default Profile
