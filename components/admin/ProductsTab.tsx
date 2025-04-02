'use client'

import { Products, TypeProduct } from '@prisma/client'
import $api from '@/app/http'
import { FormEvent, useState } from 'react'
import Image from 'next/image'

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
	const [newProduct, setNewProduct] = useState({
		type: TypeProduct.SERVICE,
		name: '',
		image: '',
		description: '',
	})

	const handleCreateProduct = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const response = await $api.post('/products', newProduct)
			setProducts([...products, response.data])
			setNewProduct({
				name: '',
				type: TypeProduct.SERVICE,
				image: '',
				description: '',
			})
		} catch (error) {
			console.error('Failed to create product:', error)
		}
	}

	return (
		<div>
			<h2 className='text-2xl mb-4'>Products Management</h2>
			<form onSubmit={handleCreateProduct} className='mb-6 border p-4'>
				<h3 className='text-xl mb-4'>Create New Product</h3>
				<div className='mb-4'>
					<label className='block mb-2'>Name</label>
					<input
						type='text'
						value={newProduct.name}
						onChange={e =>
							setNewProduct(prev => ({ ...prev, name: e.target.value }))
						}
						className='w-full border p-2'
					/>
				</div>
				<div className='mb-4'>
					<label className='block mb-2'>Type</label>
					<select
						value={newProduct.type}
						onChange={e =>
							setNewProduct(prev => ({
								...prev,
								type: e.target.value as TypeProduct,
							}))
						}
						className='w-full border p-2'
					>
						{Object.values(TypeProduct).map(type => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>
				<div className='mb-4'>
					<label className='block mb-2'>Image URL</label>
					<input
						type='text'
						value={newProduct.image}
						onChange={e =>
							setNewProduct(prev => ({ ...prev, image: e.target.value }))
						}
						className='w-full border p-2'
					/>
				</div>
				<div className='mb-4'>
					<label className='block mb-2'>Description</label>
					<textarea
						value={newProduct.description}
						onChange={e =>
							setNewProduct(prev => ({ ...prev, description: e.target.value }))
						}
						className='w-full border p-2'
					/>
				</div>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded'
				>
					Create Product
				</button>
			</form>

			{loading ? (
				<p>Loading products...</p>
			) : (
				<table className='w-full border'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border p-2'>Name</th>
							<th className='border p-2'>Type</th>
							<th className='border p-2'>Description</th>
							<th className='border p-2'>Image</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td className='border p-2'>{product.name}</td>
								<td className='border p-2'>{product.type}</td>
								<td className='border p-2'>{product.description}</td>
								<td className='border p-2'>
									{product.image ? (
										<Image
											src={product.image}
											alt='Product'
											width={64}
											height={64}
											className='w-16 h-16 object-cover'
										/>
									) : (
										'No Image'
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
