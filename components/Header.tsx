'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { startTransition, useEffect, useState } from 'react'

const LANGUAGES = [
	{ code: 'en', name: 'English' },
	{ code: 'ru', name: 'Русский' },
]

export const Header = () => {
	const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0])
	const [isOpen, setIsOpen] = useState(false)
	const tHeader = useTranslations('Header')
	const router = useRouter()
	const pathname = usePathname()
	const localActive = useLocale()

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

	return (
		<header className='flex px-2 items-center py-2 justify-between'>
			<Image src='/Logo.svg' width={130} height={70} alt='logo'></Image>

			<div className='flex gap-2'>
				{/* <Image src='/RU.svg' width={25} height={25} alt='logo'></Image> */}
				<div className='relative mt-3 lg:mt-0'>
					<div
						className='flex items-center w-fit min-w-[140px] text-gray-600 text-sm px-3 py-2 cursor-pointer pr-8'
						onClick={() => setIsOpen(!isOpen)}
					>
						<span>{selectedLanguage.name}</span>
					</div>

					{isOpen && (
						<div className='absolute top-full left-0 mt-2 w-[120px] bg-[#1D202F] rounded-lg shadow-lg z-10'>
							{LANGUAGES.map(lang => (
								<div
									key={lang.code}
									className='flex items-center px-3 py-2 text-white hover:bg-[#141621] cursor-pointer'
									onClick={() => changeLanguage(lang.code)}
								>
									<span>{lang.name}</span>
								</div>
							))}
						</div>
					)}
				</div>
				<p>{tHeader('login')}</p>
				<Image src='/VK.svg' width={16} height={16} alt='logo'></Image>
				<Image src='/Google.svg' width={16} height={16} alt='logo'></Image>
			</div>
		</header>
	)
}
