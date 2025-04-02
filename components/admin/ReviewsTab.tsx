'use client'

import { Review, Status, User, Products } from '@prisma/client'
import $api from '@/app/http'
import { useState, useEffect } from 'react'

interface ReviewsTabProps {
	reviews: Review[]
	setReviews: (reviews: Review[]) => void
	users: User[]
	products: Products[]
	loading: boolean
}

export default function ReviewsTab({
	reviews,
	setReviews,
	users,
	products,
	loading,
}: ReviewsTabProps) {
	const [editReviews, setEditReviews] = useState<{
		[key: string]: Partial<Review>
	}>({})

	useEffect(() => {
		setEditReviews(prev => {
			const updatedEditReviews = { ...prev }
			reviews.forEach(review => {
				if (!updatedEditReviews[review.id]) {
					updatedEditReviews[review.id] = {
						description: review.description || '',
						status: review.status,
					}
				} else {
					updatedEditReviews[review.id] = {
						description:
							updatedEditReviews[review.id].description ??
							review.description ??
							'',
						status: updatedEditReviews[review.id].status ?? review.status,
					}
				}
			})
			return updatedEditReviews
		})
	}, [reviews])

	const handleInputChange = (
		reviewId: string,
		field: keyof Review,
		value: string
	) => {
		setEditReviews(prev => ({
			...prev,
			[reviewId]: {
				...prev[reviewId],
				[field]: value,
			},
		}))
	}

	const handleUpdateReview = async (reviewId: string) => {
		try {
			const updates = editReviews[reviewId]
			const response = await $api.patch(`/reviews/${reviewId}`, {
				updatedReviewData: updates,
			})
			setReviews(
				reviews.map(review =>
					review.id === reviewId ? { ...review, ...response.data } : review
				)
			)
		} catch (error) {
			console.error('Failed to update review:', error)
		}
	}

	const handleDeleteReview = async (reviewId: string) => {
		try {
			await $api.delete(`/reviews/${reviewId}`)
			setReviews(reviews.filter(review => review.id !== reviewId))
			setEditReviews(prev => {
				const newEditReviews = { ...prev }
				delete newEditReviews[reviewId]
				return newEditReviews
			})
		} catch (error) {
			console.error('Failed to delete review:', error)
		}
	}

	const handleKeyPress = (
		e: React.KeyboardEvent<HTMLInputElement>,
		reviewId: string
	) => {
		if (e.key === 'Enter') {
			handleUpdateReview(reviewId)
		}
	}

	return (
		<div>
			<h2 className='text-2xl mb-4'>Reviews Management</h2>
			{loading ? (
				<p>Loading reviews...</p>
			) : (
				<table className='w-full border'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border p-2'>User</th>
							<th className='border p-2'>Product</th>
							<th className='border p-2'>Description</th>
							<th className='border p-2'>Status</th>
							<th className='border p-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{reviews.map(review => (
							<tr key={review.id}>
								<td className='border p-2'>
									{users.find(u => u.id === review.userId)?.email || 'Unknown'}
								</td>
								<td className='border p-2'>
									{products.find(p => p.id === review.productId)?.name ||
										'Unknown'}
								</td>
								<td className='border p-2'>
									<input
										type='text'
										value={editReviews[review.id]?.description || ''}
										onChange={e =>
											handleInputChange(
												review.id,
												'description',
												e.target.value
											)
										}
										onKeyPress={e => handleKeyPress(e, review.id)}
										className='w-full border p-1'
									/>
								</td>
								<td className='border p-2'>
									<select
										value={editReviews[review.id]?.status || review.status}
										onChange={e =>
											handleInputChange(review.id, 'status', e.target.value)
										}
										className='w-full border p-1'
									>
										{Object.values(Status).map(status => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</select>
								</td>
								<td className='border p-2 flex gap-2'>
									<button
										className='bg-blue-500 text-white px-2 py-1 rounded'
										onClick={() => handleUpdateReview(review.id)}
									>
										Update
									</button>
									<button
										className='bg-red-500 text-white px-2 py-1 rounded'
										onClick={() => handleDeleteReview(review.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
