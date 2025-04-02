'use client'

import $api from '@/app/http'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export interface Review {
	id: string
	userId: string
	productId: string
	description: string
	status: 'LIKE' | 'DISLIKE'
	user: User
	product: Product
}

export interface User {
	id: string
	name: string
	secondName: string
	email: string
	avatar: string | null
}

export interface Product {
	id: string
	name: string
	image: string
	description: string
	type: 'SERVICE' | 'MOBILEGAME'
}

const Review = () => {
	const tReview = useTranslations('Review')
	const local = useLocale()

	const [reviewss, setReviews] = useState<Review[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const reviewsResponse = await $api.get('/reviews/full')
				setReviews(reviewsResponse.data)
			} catch (error) {
				console.error('Failed to fetch data:', error)
			}
		}
		fetchData()
	}, [])

	return (
		<>
			<div className='bg-[#f3f4f7] mt-6 rounded-lg p-5 w-full '>
				<p className='font-light text-[11px] leading-4 text-black'>
					{tReview('importantForUs')}
				</p>
			</div>
			<div className='bg-[#f3f4f7] mt-2 rounded-lg px-3 py-2 w-20 '>
				<p className='font-light text-[10px] leading-3.5 text-black'>
					{tReview('allReviews')}
				</p>
			</div>

			<div className='my-5'>
				{reviewss.map(review => (
					<div
						key={review.id}
						className='bg-[#f3f4f7] rounded-[8px] p-3  mb-4 shadow-sm border-0 border-gray-200'
					>
						<div className='flex justify-between items-center mb-2'>
							<div className='flex items-center'>
								<div className='w-8 h-8 bg-gray-300 rounded-full mr-2'></div>{' '}
								{/* Аватар заглушка */}
								<div>
									<p className=' font-normal text-[14px] leading-[164%] text-[#1c34ff] underline decoration-[none]'>
										{review.user.name}
									</p>

									{/* <p className="text-[#6c757d] text-[12px]">{review.date}</p> */}
								</div>
							</div>
							<div>
								{review.status === 'LIKE' ? (
									<Image
										src='/like.svg'
										alt='icon like'
										width={20}
										height={20}
									/>
								) : (
									<Image
										src='/dislike.svg'
										alt='icon dislike'
										width={20}
										height={20}
									/>
								)}
							</div>
						</div>
						<p className='font-light text-[12px] leading-[140%] text-black mb-2'>
							{review.description}
						</p>
						<div className='flex items-center gap-2'>
							<Image
								className=''
								src={review.product.image}
								alt='img'
								width={20}
								height={20}
							></Image>{' '}
							{/* Иконка источника заглушка */}
							<p className='font-normal text-[12px] leading-[164%] text-[#1c34ff] underline decoration-[none]'>
								{review.product.name}
							</p>
						</div>
					</div>
				))}
				<div className='fixed bottom-16 left-0 right-0 flex justify-center z-10'>
					<Link
						href={`/${local}/review/write`}
						className='bg-[#1c34ff] text-white text-[15px] leading-5 font-medium rounded-3xl w-[194px] h-[42px] px-4 py-[11px] text-center shadow-md'
					>
						{tReview('leaveReview')}{' '}
					</Link>
				</div>
			</div>
		</>
	)
}

export default Review
