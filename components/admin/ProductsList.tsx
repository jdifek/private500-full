'use client'

import { Products } from '@prisma/client'
import $api from '@/app/http'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'

interface ProductsListProps {
	products: Products[]
	setProducts: (products: Products[]) => void
	onCreate: () => void
}

export default function ProductsList({
	products,
	setProducts,
	onCreate,
}: ProductsListProps) {
	// Загружает начальное значение из localStorage или использует 1 по умолчанию
	const [gridCols, setGridCols] = useState<1 | 2>(() => {
		const savedCols = localStorage.getItem('gridCols')
		return savedCols === '2' ? 2 : 1
	})
	const [editingProductId, setEditingProductId] = useState<string | null>(null)

	// Сохраняет значение gridCols в localStorage при изменении
	useEffect(() => {
		localStorage.setItem('gridCols', gridCols.toString())
	}, [gridCols])

	const handleDeleteProduct = async (productId: string) => {
		try {
			await $api.delete(`/products/${productId}`)
			setProducts(products.filter(product => product.id !== productId))
		} catch (error) {
			console.error('Failed to delete product:', error)
		}
	}

	const handleUpdateProduct = (updatedProduct: Products) => {
		console.log('Received updated product:', updatedProduct)
		setProducts(
			products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
		)
		setEditingProductId(null)
	}

	return (
		<div>
			<div className='flex flex-wrap gap-2 justify-between items-center mb-4'>
				<div className='flex gap-2'>
					<button
						className={`px-4 py-2 rounded-md cursor-pointer ${
							gridCols === 1
								? 'bg-blue-500 text-white'
								: 'bg-gray-200 text-gray-700'
						} hover:bg-blue-600 hover:text-white transition-colors`}
						onClick={() => setGridCols(1)}
					>
						1 Column
					</button>
					<button
						className={`px-4 py-2 rounded-md cursor-pointer ${
							gridCols === 2
								? 'bg-blue-500 text-white'
								: 'bg-gray-200 text-gray-700'
						} hover:bg-blue-600 hover:text-white transition-colors`}
						onClick={() => setGridCols(2)}
					>
						2 Columns
					</button>
				</div>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'
					onClick={onCreate}
				>
					Create
				</button>
			</div>
			<ul
				className={`grid gap-6 ${
					gridCols === 1 ? 'grid-cols-1' : 'grid-cols-2'
				}`}
			>
				{products.map(product => (
					<li
						key={product.id}
						className='bg-white shadow-md rounded-lg p-4 flex flex-col'
					>
						<div>
							<h4 className='text-lg font-semibold text-gray-800'>
								{product.name}
							</h4>

							<p className='text-sm text-gray-600'>Type: {product.type}</p>
							<p className='text-gray-700 mt-2'>{product.description}</p>
							{product.image ? (
								<Image
									src={product.image}
									alt={product.name}
									width={64}
									height={64}
									className='w-16 h-16 object-cover mt-4 rounded'
								/>
							) : (
								<p className='mt-4 text-gray-500'>No Image</p>
							)}
						</div>
						<div className='flex gap-2 mt-4'>
							<button
								className='bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'
								onClick={() =>
									setEditingProductId(
										editingProductId === product.id ? null : product.id
									)
								}
							>
								{editingProductId === product.id ? 'Collapse' : 'Edit'}
							</button>
							<button
								className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors cursor-pointer'
								onClick={() => handleDeleteProduct(product.id)}
							>
								Delete
							</button>
						</div>
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${
								editingProductId === product.id ? 'max-h-full mt-4' : 'max-h-0'
							}`}
						>
							{editingProductId === product.id && (
								<ProductForm
									initialProduct={product}
									onSubmit={handleUpdateProduct}
									onClose={() => setEditingProductId(null)}
								/>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
