'use client'
import $api from '@/app/http'
import { FullScreenLoader } from '@/components/FullscreenLoader'
import { Products, Review } from '@prisma/client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Write = () => {
	const [reviewText, setReviewText] = useState('') // Состояние для текста отзыва
	const [rating, setRating] = useState<null | 'negative' | 'positive'>(null) // Состояние для лайка/дизлайка ("positive" или "negative")
	const [error, setError] = useState('') // Состояние для ошибок
	const [isSubmitting, setIsSubmitting] = useState(false) // Состояние для отслеживания отправки формы

	const tComponents = useTranslations('Components')
	const tReview = useTranslations('Review')
	const [products, setProducts] = useState<Products[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Products | null>(null)

	// Loading states
	const [loading, setLoading] = useState({
		products: true,
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch products
				const productsResponse = await $api.get('/products')
				setProducts(productsResponse.data)
				setLoading(prev => ({ ...prev, products: false }))
			} catch (error) {
				console.error('Failed to fetch data:', error)
				setLoading({ products: false })
			}
		}
		fetchData()
	}, [])

	const validateForm = () => {
		setError('')

		if (!selectedProduct) {
			setError('Продукт не выбран')
			return false
		}

		if (!rating) {
			setError('Пожалуйста, выберите оценку (лайк или дизлайк)')
			return false
		}

		if (!reviewText.trim()) {
			setError('Пожалуйста, напишите текст отзыва')
			return false
		}

		return true
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)

		try {
			const accessToken = localStorage.getItem('accessToken')

			if (!selectedProduct || !selectedProduct.id) {
				setError('Продукт не выбран')
				return
			}

			const response = await $api.post('/reviews', {
				accessToken,
				productId: selectedProduct.id, // Ensure id is accessible here
				description: reviewText,
				status: rating === 'negative' ? 'DISLIKE' : 'LIKE',
			})

			// Очистка формы после успешной отправки
			setReviewText('')
			setRating(null)
			setSelectedProduct(null)

			// Можно добавить сообщение об успехе
			setError('Отзыв успешно отправлен!')

			return response
		} catch (error) {
			console.error('Failed to submit review:', error)
			setError('Произошла ошибка при отправке отзыва')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleProductChange = e => {
		const productId = e.target.value
		console.log(productId)

		if (!productId) {
			setSelectedProduct(null)
			return
		}

		const product = products.find(p => p.id === productId)
		setSelectedProduct(product || null)
	}

	return (
		<>
			{/* {loading && <FullScreenLoader />} */}

			<div className='flex flex-col gap-4 mt-7 mb-3 '>
				{/* Ссылка "Вернуться" */}
				<p className='font-normal text-[15px] leading-[87%] text-[#14229e] cursor-pointer hover:underline'>
					{tComponents('return')}
				</p>

				{/* Заголовок */}
				<div className='flex gap-2 items-center'>
					<Image
						src='/icon-review.svg'
						alt='icon review'
						width={20}
						height={20}
					/>
					<h2 className='font-bold text-[14px] leading-3.5 text-[#212529] lowercase'>
						{tReview('leaveReview')}
					</h2>
				</div>

				{/* Сообщение об ошибке */}
				{error && (
					<div
						className={`text-sm py-2 px-3 rounded ${
							error === 'Отзыв успешно отправлен!'
								? 'text-green-700 bg-green-100'
								: 'text-red-700 bg-red-100'
						}`}
					>
						{error}
					</div>
				)}

				{/* Форма */}
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					{/* Текстовое поле с иконкой микрофона */}
					<div className='relative'>
						<textarea
							value={reviewText}
							onChange={e => setReviewText(e.target.value)}
							placeholder={tReview('placeholder')}
							className='w-full h-24 p-3 border border-gray-300 rounded-[8px] text-[#212529] text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14229e] resize-none placeholder:font-light placeholder:text-[11px] placeholder:leading-5'
						/>
						{/* Иконка микрофона */}
					</div>

					{/* Кнопка "Оставить отзыв" */}
					<div className='flex justify-between items-center'>
						<div className='flex gap-2 items-center'>
							<div
								className={`cursor-pointer rounded-full p-1 ${
									rating === 'positive' ? 'bg-[#eafff4]' : 'hover:bg-gray-100'
								}`}
								onClick={() => setRating('positive')}
							>
								<Image src='/like.svg' alt='like icon' width={24} height={24} />
							</div>

							<div
								className={`cursor-pointer rounded-full p-1 ${
									rating === 'negative' ? 'bg-[#ffebeb]' : 'hover:bg-gray-100'
								}`}
								onClick={() => setRating('negative')}
							>
								<Image
									src='/dislike.svg'
									alt='dislike icon'
									width={24}
									height={24}
								/>
							</div>
						</div>
						<select
							value={selectedProduct?.id[0] || ''} // selectedProduct?.id will be used as the value if it's available, otherwise an empty string will be used.
							onChange={handleProductChange} // handleProductChange should update the selectedProduct state
							className='p-2 border border-gray-300 rounded-[8px] text-[#212529] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#14229e]'
						>
							<option value='' disabled>
								выбрать
							</option>
							{products.map(product => (
								<option key={product.id} value={product.id}>
									{product.name}
								</option>
							))}
						</select>

						<button
							type='submit'
							disabled={isSubmitting}
							className={`self-end text-[#ffffff] text-[14px] font-medium py-2 px-4 rounded-[25px] transition-colors ${
								isSubmitting
									? 'bg-gray-400 cursor-not-allowed'
									: selectedProduct && rating && reviewText.trim()
									? 'bg-[#14229e] hover:bg-[#0f1a75]'
									: 'bg-[#aaaaab] hover:bg-[#c0c1c5]'
							}`}
						>
							{isSubmitting ? 'Отправка...' : tReview('leaveReview')}
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Write
