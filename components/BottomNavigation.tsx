'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function BottomNavigation() {
	const pathname = usePathname()
	const t = useTranslations('Navigation')
	const locale = pathname.split('/')[1]
	const isHomeActive = pathname === `/${locale}`
	const isSearchActive = pathname === `/${locale}/search`
	const isProfileActive = pathname.startsWith(`/${locale}/auth/profile`)

	return (
		<div className='fixed bottom-0 left-0 right-0 h-[46px] bg-[#F3F4F7] border-t border-black/20'>
			<div className='flex justify-between items-center h-full px-[60px]'>
				{/* Home */}
				<Link
					href={`/${locale}`}
					className='flex items-center justify-center w-[18px] h-[18px]'
					aria-label={t('home')}
				>
					<Image
						src={isHomeActive ? '/active-home.svg' : '/home.svg'}
						alt='icon home'
						width={18}
						height={18}
					/>
				</Link>

				{/* Search */}
				<Link
					href={`/${locale}/search`}
					className='flex items-center justify-center w-[18px] h-[18px]'
					aria-label={t('search')}
				>
					<Image
						src={
							isSearchActive ? '/active-icon-search.svg' : '/icon-search.svg'
						}
						alt='icon search'
						width={18}
						height={18}
					/>
				</Link>

				{/* Profile */}
				<Link
					href={`/${locale}/auth/profile`}
					className='flex items-center justify-center w-[18px] h-[18px]'
					aria-label={t('profile')}
				>
					<Image
						src={isProfileActive ? '/active-profile.svg' : '/profile.svg'}
						alt='icon profile'
						width={18}
						height={18}
					/>
				</Link>
			</div>
		</div>
	)
}
