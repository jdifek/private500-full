'use client'

import { User, Role } from '@prisma/client'
import $api from '@/app/http'
import { useState, useEffect } from 'react'

interface UsersTabProps {
	users: User[]
	setUsers: (users: User[]) => void
	loading: boolean
}

export default function UsersTab({ users, setUsers, loading }: UsersTabProps) {
	const [editUsers, setEditUsers] = useState<{ [key: string]: Partial<User> }>(
		{}
	)

	useEffect(() => {
		setEditUsers(prev => {
			const updatedEditUsers = { ...prev }
			users.forEach(user => {
				if (!updatedEditUsers[user.id]) {
					updatedEditUsers[user.id] = {
						name: user.name || '',
						email: user.email || '',
						role: user.role,
					}
				} else {
					updatedEditUsers[user.id] = {
						name: updatedEditUsers[user.id].name ?? user.name ?? '',
						email: updatedEditUsers[user.id].email ?? user.email ?? '',
						role: updatedEditUsers[user.id].role ?? user.role,
					}
				}
			})
			return updatedEditUsers
		})
	}, [users])

	const handleInputChange = (
		userId: string,
		field: keyof User,
		value: string
	) => {
		setEditUsers(prev => ({
			...prev,
			[userId]: {
				...prev[userId],
				[field]: value,
			},
		}))
	}

	const handleUpdateUser = async (userId: string) => {
		try {
			const updates = editUsers[userId]
			const response = await $api.patch(`/users/${userId}`, {
				updatedUserData: { ...updates, role: updates.role },
			})
			setUsers(
				users.map(user =>
					user.id === userId ? { ...user, ...response.data.user } : user
				)
			)
		} catch (error) {
			console.error('Failed to update user:', error)
		}
	}

	const handleDeleteUser = async (userId: string) => {
		try {
			await $api.delete(`/users/${userId}`)
			setUsers(users.filter(user => user.id !== userId))
			setEditUsers(prev => {
				const newEditUsers = { ...prev }
				delete newEditUsers[userId]
				return newEditUsers
			})
		} catch (error) {
			console.error('Failed to delete user:', error)
		}
	}

	const handleKeyPress = (
		e: React.KeyboardEvent<HTMLInputElement>,
		userId: string
	) => {
		if (e.key === 'Enter') {
			handleUpdateUser(userId)
		}
	}

	return (
		<div>
			<h2 className='text-2xl mb-4'>Users Management</h2>
			{loading ? (
				<p>Loading users...</p>
			) : (
				<table className='w-full border overflow-x-auto'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border p-2'>Email</th>
							<th className='border p-2'>Name</th>
							<th className='border p-2'>Role</th>
							<th className='border p-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td className='border p-2'>
									<input
										type='text'
										value={editUsers[user.id]?.email || ''}
										onChange={e =>
											handleInputChange(user.id, 'email', e.target.value)
										}
										onKeyPress={e => handleKeyPress(e, user.id)}
										className='w-full border p-1'
									/>
								</td>
								<td className='border p-2'>
									<input
										type='text'
										value={editUsers[user.id]?.name || ''}
										onChange={e =>
											handleInputChange(user.id, 'name', e.target.value)
										}
										onKeyPress={e => handleKeyPress(e, user.id)}
										className='w-full border p-1'
									/>
								</td>
								<td className='border p-2'>
									<select
										value={editUsers[user.id]?.role || user.role}
										onChange={e =>
											handleInputChange(user.id, 'role', e.target.value)
										}
										className='w-full border p-1'
									>
										{Object.values(Role).map(role => (
											<option key={role} value={role}>
												{role}
											</option>
										))}
									</select>
								</td>
								<td className='border p-2 flex gap-2'>
									<button
										className='bg-blue-500 text-white px-2 py-1 rounded'
										onClick={() => handleUpdateUser(user.id)}
									>
										Update
									</button>
									<button
										className='bg-red-500 text-white px-2 py-1 rounded'
										onClick={() => handleDeleteUser(user.id)}
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
