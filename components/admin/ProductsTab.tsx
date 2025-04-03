'use client'

import { Products } from '@prisma/client'
import { useState } from 'react'
import ProductForm from './ProductForm'
import ProductsList from './ProductsList'

interface ProductsTabProps {
	products: Products[]
	setProducts: (products: Products[]) => void
	loading: boolean
}

export default function ProductsTab({
	products,
	setProducts,
	loading,
}: ProductsTabProps) {
	const [activeTab, setActiveTab] = useState<'list' | 'create'>('list')

	const handleCreateProduct = (product: Products) => {
		setProducts([...products, product])
		setActiveTab('list')
	}

	return (
		<div>
			<h2 className='text-2xl font-bold mb-6 text-gray-800'>
				Products Management
			</h2>

			{/* Tabs */}
			<div className='flex mb-6 border-b border-gray-200'>
				<button
					className={`px-4 py-2 font-medium cursor-pointer ${
						activeTab === 'list'
							? 'border-b-2 border-blue-500 text-blue-600'
							: 'text-gray-600'
					}`}
					onClick={() => setActiveTab('list')}
				>
					List
				</button>
				<button
					className={`px-4 py-2 font-medium cursor-pointer ${
						activeTab === 'create'
							? 'border-b-2 border-blue-500 text-blue-600'
							: 'text-gray-600'
					}`}
					onClick={() => setActiveTab('create')}
				>
					Create
				</button>
			</div>

			{/* Content */}
			{activeTab === 'list' && (
				<>
					{loading ? (
						<p className='text-gray-600'>Loading products...</p>
					) : (
						<ProductsList
							products={products}
							setProducts={setProducts}
							onCreate={() => setActiveTab('create')}
						/>
					)}
				</>
			)}
			{activeTab === 'create' && <ProductForm onSubmit={handleCreateProduct} />}
		</div>
	)
}
