'use client'

import { CustomNotification } from '@/components/CustomNotification'
import PromotionSlider from '@/components/PromotionSlider'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import $api from '../http'
import { Products } from '@prisma/client'

export default function Home() {
	const [search, setSearch] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	const tHome = useTranslations('Home')
	const tComponents = useTranslations('Components')
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const locale = pathname.split('/')[1] || 'ru'
	const verified = searchParams.get('verified')
	const [products, setProducts] = useState<Products[]>([])

	if (verified === 'true' && !showNotification) {
		setShowNotification(true)
	}

	const handleCloseNotification = () => {
		setShowNotification(false)
		window.history.replaceState({}, document.title, '/')
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const productsResponse = await $api.get('/products')
				setProducts(productsResponse.data)
			} catch (error) {
				console.error('Failed to fetch data:', error)
			}
		}
		fetchData()
	}, [])

	const servicesProducts = products.filter(el => el.type === 'SERVICE')
	const mobileProducts = products.filter(el => el.type === 'MOBILEGAME')

	const handleProductClick = (productId: string) => {
		router.push(`${locale}/order/${productId}`)
	}

	return (
		<>
			<div className='mt-3 mb-7'>
				<div className='bg-[#1B34FF]/5 rounded-xl p-3 flex items-center gap-2'>
					<Image
						src='/icon-search.svg'
						alt='icon search'
						width={14}
						height={14}
					/>
					<input
						type='text'
						placeholder={tComponents('placeholder')}
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='w-full bg-transparent text-[#929293] placeholder-[#929293] placeholder:text-[13px] placeholder:font-light placeholder:leading-5 focus:outline-none'
					/>
				</div>
				<PromotionSlider />
				<div className='mt-7'>
					<div className='flex gap-3'>
						<Image
							src='/services.svg'
							alt='services icon'
							width={14}
							height={14}
						/>
						<h2 className='font-medium text-[16px] leading-2.5 text-[#212529]'>
							{tHome('titles.services')}
						</h2>
					</div>

					<div className='grid grid-cols-2 gap-y-2 gap-x-2 mt-3 place-items-center'>
						{servicesProducts.map(product => (
							<div
								key={product.id}
								className='flex justify-center cursor-pointer'
								onClick={() => handleProductClick(product.id)}
							>
								<Image
									src={product.image || '/default-service.png'}
									alt={product.name}
									width={150}
									height={150}
									className='object-cover'
								/>
							</div>
						))}
					</div>
				</div>

				<div className='mt-7'>
					<div className='flex gap-3'>
						<Image src='/arcade.svg' alt='arcade icon' width={14} height={14} />
						<h2 className='font-medium text-[16px] leading-2.5 text-[#212529]'>
							{tHome('titles.mobileGames')}
						</h2>
					</div>

					<div className='grid grid-cols-2 gap-y-2 gap-x-2 mt-3 place-items-center'>
						{mobileProducts.map(product => (
							<div
								key={product.id}
								className='flex justify-center cursor-pointer'
								onClick={() => handleProductClick(product.id)}
							>
								<Image
									src={product.image || '/default-game.png'}
									alt={product.name}
									width={150}
									height={150}
									className='object-cover'
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			{showNotification && (
				<CustomNotification
					message='Ваш email успешно подтвержден!'
					onClose={handleCloseNotification}
				/>
			)}
		</>
	)
}
