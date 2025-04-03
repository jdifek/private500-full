'use client'

import { Products, TypeProduct } from '@prisma/client'
import $api from '@/app/http'
import { FormEvent, useState } from 'react'

interface ProductFormProps {
	initialProduct?: Products
	onSubmit: (product: Products) => void
	onClose?: () => void
}

export default function ProductForm({
	initialProduct,
	onSubmit,
	onClose,
}: ProductFormProps) {
	const [product, setProduct] = useState({
		name: initialProduct?.name || '',
		type: initialProduct?.type || TypeProduct.SERVICE,
		image: initialProduct?.image || '',
		description: initialProduct?.description || '',
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			let response
			if (initialProduct) {
				response = await $api.patch(`/products/${initialProduct.id}`, {
					updatedProductData: product,
				})
			} else {
				response = await $api.post('/products', product)
			}
			onSubmit(response.data)
			if (!initialProduct) {
				setProduct({
					name: '',
					type: TypeProduct.SERVICE,
					image: '',
					description: '',
				})
			}
		} catch (error) {
			console.error(
				`Failed to ${initialProduct ? 'update' : 'create'} product:`,
				error
			)
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSubmit(e as any)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6'>
			<h3 className='text-xl font-semibold mb-4 text-gray-800'>
				{initialProduct ? 'Edit Product' : 'Create New Product'}
			</h3>
			<div className='mb-4'>
				<label className='block mb-2 text-sm font-medium text-gray-700'>
					Name
				</label>
				<input
					type='text'
					value={product.name}
					onChange={e =>
						setProduct(prev => ({ ...prev, name: e.target.value }))
					}
					onKeyPress={handleKeyPress}
					className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-2 text-sm font-medium text-gray-700'>
					Type
				</label>
				<select
					value={product.type}
					onChange={e =>
						setProduct(prev => ({
							...prev,
							type: e.target.value as TypeProduct,
						}))
					}
					className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					{Object.values(TypeProduct).map(type => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
			<div className='mb-4'>
				<label className='block mb-2 text-sm font-medium text-gray-700'>
					Image URL
				</label>
				<input
					type='text'
					value={product.image}
					onChange={e =>
						setProduct(prev => ({ ...prev, image: e.target.value }))
					}
					onKeyPress={handleKeyPress}
					className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-2 text-sm font-medium text-gray-700'>
					Description
				</label>
				<textarea
					value={product.description}
					onChange={e =>
						setProduct(prev => ({ ...prev, description: e.target.value }))
					}
					onKeyPress={handleKeyPress}
					className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[120px]'
				/>
			</div>
			<div className='flex gap-2'>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'
				>
					{initialProduct ? 'Update' : 'Create'} Product
				</button>
				{onClose && (
					<button
						type='button'
						onClick={onClose}
						className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors cursor-pointer'
					>
						Close
					</button>
				)}
			</div>
		</form>
	)
}
