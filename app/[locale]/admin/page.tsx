'use client'

import $api from '@/app/http'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { User, Products, Review } from '@prisma/client'
import UsersTab from '@/components/admin/UsersTab'
import ProductsTab from '@/components/admin/ProductsTab'
import ReviewsTab from '@/components/admin/ReviewsTab'

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState<'users' | 'products' | 'reviews'>(
		'users'
	)
	const [users, setUsers] = useState<User[]>([])
	const [products, setProducts] = useState<Products[]>([])
	const [reviews, setReviews] = useState<Review[]>([])
	const [loading, setLoading] = useState({
		users: true,
		products: true,
		reviews: true,
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usersResponse = await $api.get('/users')
				setUsers(usersResponse.data)
				setLoading(prev => ({ ...prev, users: false }))

				const productsResponse = await $api.get('/products')
				console.log('Products from server:', productsResponse.data)
				setProducts(productsResponse.data)
				setLoading(prev => ({ ...prev, products: false }))

				const reviewsResponse = await $api.get('/reviews')
				setReviews(reviewsResponse.data)
				setLoading(prev => ({ ...prev, reviews: false }))
			} catch (error) {
				console.error('Failed to fetch data:', error)
				setLoading({ users: false, products: false, reviews: false })
			}
		}
		fetchData()
	}, [])

	return (
		<ProtectedRoute requireAdmin>
			<div className='p-6 max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
				<div className='flex mb-6 border-b'>
					{['users', 'products', 'reviews'].map(tab => (
						<button
							key={tab}
							className={`px-4 py-2 cursor-pointer ${
								activeTab === tab
									? 'border-b-2 border-blue-500 text-blue-600'
									: ''
							}`}
							onClick={() =>
								setActiveTab(tab as 'users' | 'products' | 'reviews')
							}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>
				{activeTab === 'users' && (
					<UsersTab users={users} setUsers={setUsers} loading={loading.users} />
				)}
				{activeTab === 'products' && (
					<ProductsTab
						products={products}
						setProducts={setProducts}
						loading={loading.products}
					/>
				)}
				{activeTab === 'reviews' && (
					<ReviewsTab
						reviews={reviews}
						setReviews={setReviews}
						users={users}
						products={products}
						loading={loading.reviews}
					/>
				)}
			</div>
		</ProtectedRoute>
	)
}
