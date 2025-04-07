'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Link } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'

const LANGUAGES = [
	{ code: 'en', name: 'English (Английский)', flag: '/EN.svg' },
	{ code: 'ru', name: 'Russian (Русский)', flag: '/RU.svg' },
]

export const Header = () => {
	const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0])
	const [isOpen, setIsOpen] = useState(false)
	const tComponents = useTranslations('Components')
	const router = useRouter()
	const localActive = useLocale()
	const pathname = usePathname()
	const locale = pathname.split('/')[1] || 'ru'
	const { isAuthenticated, user } = useAuth()

	useEffect(() => {
		const newLang =
			LANGUAGES.find(lang => lang.code === localActive) || LANGUAGES[0]
		setSelectedLanguage(newLang)
	}, [localActive])

	const changeLanguage = (nextLocale: string) => {
		startTransition(() => {
			const newPath = `/${nextLocale}${pathname.replace(`/${localActive}`, '')}`
			router.replace(newPath)
			setIsOpen(false)
		})
	}

	const handleNavigateLogin = () => {
		router.push(`/${locale}/auth/login`)
	}

	const handleNavigateProfile = () => {
		router.push(`/${locale}/auth/profile`)
	}

	return (
		<header className='flex px-2 items-center py-2 justify-between'>
			<Link href='/'>
				<Image
					src='/Logo.svg'
					width={130}
					height={70}
					alt={tComponents('logo')}
				/>
			</Link>

			<div className='flex items-center gap-2'>
				<div className='relative'>
					<Image
						src={selectedLanguage.flag}
						width={25}
						height={25}
						alt={tComponents('languageFlag')}
						onClick={() => setIsOpen(!isOpen)}
						className='cursor-pointer'
					/>
					{isOpen && (
						<div className='absolute -left-25 mt-2 w-44 bg-[#f3f4f7] border-x-[0.3px] border-b-[0.3px] border-[#aaaaab] rounded-b-[20px] px-2 py-1.5 z-10'>
							{LANGUAGES.map(lang => (
								<div
									key={lang.code}
									className='flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-100 not-last:border-b-[0.2px] not-last:border-[#aaaaab]'
									onClick={() => changeLanguage(lang.code)}
								>
									<Image
										src={lang.flag}
										width={15}
										height={15}
										alt={tComponents('languageFlag')}
									/>
									<span className='text-[13px] text-black'>{lang.name}</span>
								</div>
							))}
						</div>
					)}
				</div>

				<div className='px-2.5 flex gap-2 items-center'>
					{!isAuthenticated ? (
						<>
							<p
								className='roboto-condensed text-[15px] leading-3 cursor-pointer'
								onClick={handleNavigateLogin}
							>
								{tComponents('login')}
							</p>
							<div className='flex gap-1'>
								<a href='https://vk.com/' target='_blank'>
									<Image
										src='/VK.svg'
										width={16}
										height={16}
										alt={tComponents('vkIcon')}
									/>
								</a>
								<a
									href='https://www.google.com/intl/ru/account/about/'
									target='_blank'
								>
									<Image
										src='/Google.svg'
										width={16}
										height={16}
										alt={tComponents('googleIcon')}
									/>
								</a>
							</div>
						</>
					) : (
						<div className='flex gap-2 items-center'>
							<div className='relative' onClick={handleNavigateProfile}>
								{user?.avatar ? (
									<Image
										src={user.avatar}
										width={26}
										height={26}
										alt={tComponents('profileIcon')}
										className='rounded-full object-cover cursor-pointer'
									/>
								) : (
									<Image
										src='/0067fd1434426fd9b509088b5518c42c 1.png'
										width={26}
										height={26}
										alt={tComponents('profileIcon')}
										className='cursor-pointer'
									/>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
