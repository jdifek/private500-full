'use client'

import $api from '@/app/http'
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'

interface User {
	id: string
	avatar?: string
	name?: string
	email?: string
}

interface AuthContextType {
	isAuthenticated: boolean
	user: User | null
	setIsAuthenticated: (value: boolean) => void
	setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<User | null>(null)

	// useEffect(() => {
	// 	// Проверяем авторизацию при монтировании
	// 	const token = localStorage.getItem('accessToken')
	// 	setIsAuthenticated(!!token)
	// }, [])

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem('accessToken')
			if (token) {
				try {
					const response = await $api.post(
						'/auth/me',
						{ accessToken: token },
						{
							headers: { 'Cache-Control': 'no-cache' },
						}
					)
					setUser(response.data.user)
					setIsAuthenticated(true)
				} catch (error) {
					console.error('Failed to fetch user data:', error)
					setIsAuthenticated(false)
					setUser(null)
					localStorage.removeItem('accessToken')
				}
			} else {
				setIsAuthenticated(false)
				setUser(null)
			}
		}
		fetchUser()
	}, [isAuthenticated])

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user, setIsAuthenticated, setUser }}
		>
			{children}
		</AuthContext.Provider>
	)

	// return (
	// 	<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
	// 		{children}
	// 	</AuthContext.Provider>
	// )
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
