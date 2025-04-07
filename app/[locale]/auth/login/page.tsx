'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import $api from '@/app/http'
import { useAuth } from '@/contexts/AuthContext'
import { FullScreenLoader } from '@/components/FullscreenLoader'

const Login = () => {
	const [identifier, setIdentifier] = useState('')
	const [password, setPassword] = useState('')
	const [isEmailValid, setIsEmailValid] = useState<null | boolean>(null)
	const [isPasswordValid, setIsPasswordValid] = useState<null | boolean>(null)
	const [error, setError] = useState('')
	const [isError, setIsError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const tAuth = useTranslations('Auth')
	const tComponents = useTranslations('Components')
	const router = useRouter()
	const pathname = usePathname()
	const locale = pathname.split('/')[1] || 'ru'
	const { login } = useAuth()

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const phoneRegex = /^\+?[1-9]\d{9,14}$/

	useEffect(() => {
		if (!identifier) {
			setIsEmailValid(null)
		} else if (emailRegex.test(identifier) || phoneRegex.test(identifier)) {
			setIsEmailValid(true)
		} else {
			setIsEmailValid(false)
		}
		setIsPasswordValid(password.length >= 8)
	}, [identifier, password])

	const getBorderColor = (isValid: boolean | null) =>
		isValid === null
			? 'border-[#8b8b8b]'
			: isValid
			? 'border-[#7FFF00]'
			: 'border-[#FF0000]'

	const isFormValid = isEmailValid && isPasswordValid
	const buttonColor = isFormValid
		? 'bg-[#007BFF] cursor-pointer'
		: 'bg-[#aaaaab] cursor-not-allowed'

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!isFormValid) return
		setIsLoading(true)
		try {
			const response = await $api.post('/auth/login', { identifier, password })
			const { accessToken, refreshToken, role } = response.data
			await login(accessToken, refreshToken)

			if (role === 'ADMIN') {
				router.push(`/${locale}/admin`)
			} else {
				router.push(`/${locale}`)
			}
		} catch (err: any) {
			setIsError(true)
			setError(err.response?.data?.error || tAuth('loginFailed'))
		} finally {
			setIsLoading(false)
		}
	}

	const handleClickForgotPass = () =>
		router.push(`/${locale}/auth/forgot-password`)
	const handleClickRegister = () => router.push(`/${locale}/auth/register`)

	return (
		<>
			{isLoading && <FullScreenLoader />}
			<h2 className='mb-6 font-medium text-[28px] text-center leading-[100%] text-black'>
				{tAuth('login')}
			</h2>
			<div className='flex gap-3 flex-col mb-3'>
				<input
					type='text'
					placeholder={tAuth('placeholders.email')}
					value={identifier}
					onChange={e => setIdentifier(e.target.value)}
					className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all placeholder:text-[13px] placeholder:leading-5 placeholder:font-light placeholder:text-[#929294] ${getBorderColor(
						isEmailValid
					)}`}
				/>
				<input
					type='password'
					placeholder={tAuth('placeholders.password')}
					value={password}
					onChange={e => setPassword(e.target.value)}
					className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all placeholder:text-[13px] placeholder:leading-5 placeholder:font-light placeholder:text-[#929294] ${getBorderColor(
						isPasswordValid
					)}`}
				/>
			</div>
			<div
				className={`flex items-center mb-6 ${
					isError ? 'justify-between' : 'justify-end'
				}`}
			>
				{error && (
					<p className='text-[12px] leading-[100%] text-red-500'>{error}</p>
				)}
				<p
					onClick={handleClickForgotPass}
					className='text-[13px] leading-5 font-normal text-black capitalize inline-block cursor-pointer'
				>
					{tAuth('forgotYourPassword.question')}
				</p>
			</div>
			<button
				onClick={handleLogin}
				className={`border-0 text-white text-[16px] leading-5 font-medium mb-3 rounded-[23px] p-[8px] w-full h-[46px] transition-all ${buttonColor}`}
				disabled={!isFormValid}
			>
				{tComponents('login')}
			</button>
			<p className='text-center text-[13px] leading-5 mb-6 font-normal text-[#929294] flex flex-col'>
				<span>{tAuth('you Agree')}</span>
				<span className='text-black'>{tAuth('privacyPolicy')}</span>
			</p>
			<p className='text-center mb-2 text-[13px] leading-[154%] font-normal text-[#929294]'>
				{tAuth('signInWith')}
			</p>
			<div className='mb-6 flex gap-3 justify-center'>
				<Image src='/Google2.svg' alt='Google' width={70} height={70} />
				<Image src='/Vk2.svg' alt='Vk2' width={70} height={70} />
			</div>
			<p className='text-center text-[15px] leading-5 font-light text-[#929294]'>
				{tAuth('notAccount')}{' '}
				<span
					onClick={handleClickRegister}
					className='text-black cursor-pointer'
				>
					{tAuth('signUp')}
				</span>
			</p>
		</>
	)
}

export default Login

// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { useTranslations } from 'next-intl'
// import { usePathname, useRouter } from 'next/navigation'
// import { setTokens } from '@/lib/auth'
// import $api from '@/app/http'
// import { useAuth } from '@/contexts/AuthContext'
// import { FullScreenLoader } from '@/components/FullscreenLoader'

// const Login = () => {
// 	const [identifier, setIdentifier] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [isEmailValid, setIsEmailValid] = useState<null | boolean>(null)
// 	const [isPasswordValid, setIsPasswordValid] = useState<null | boolean>(null)
// 	const [error, setError] = useState('')
// 	const [isError, setIsError] = useState<boolean>(false)
// 	const [isLoading, setIsLoading] = useState<boolean>(false)
// 	const tAuth = useTranslations('Auth')
// 	const tComponents = useTranslations('Components')
// 	const router = useRouter()
// 	const pathname = usePathname()
// 	const locale = pathname.split('/')[1] || 'ru'
// 	const { setIsAuthenticated, setUser } = useAuth()

// 	// Регулярные выражения для проверки identifier и телефона
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 	const phoneRegex = /^\+?[1-9]\d{9,14}$/ // Поддерживает номера от 10 до 15 цифр

// 	useEffect(() => {
// 		if (!identifier) {
// 			setIsEmailValid(null)
// 		} else if (emailRegex.test(identifier) || phoneRegex.test(identifier)) {
// 			setIsEmailValid(true)
// 		} else {
// 			setIsEmailValid(false)
// 		}

// 		setIsPasswordValid(password.length >= 8)
// 	}, [identifier, password])

// 	const getBorderColor = (isValid: boolean | null) => {
// 		if (isValid === null) return 'border-[#8b8b8b]'
// 		return isValid ? 'border-[#7FFF00]' : 'border-[#FF0000]'
// 	}

// 	const isFormValid = isEmailValid && isPasswordValid
// 	const buttonColor = isFormValid
// 		? 'bg-[#007BFF] cursor-pointer'
// 		: 'bg-[#aaaaab] cursor-not-allowed'

// 	const handleLogin = async (e: React.FormEvent) => {
// 		e.preventDefault()
// 		if (!isFormValid) return
// 		setIsLoading(true)
// 		try {
// 			const response = await $api.post('/auth/login', { identifier, password })
// 			const { accessToken, refreshToken, role } = response.data
// 			setTokens(accessToken, refreshToken)
// 			setIsAuthenticated(true)

// 			const userResponse = await $api.post('/auth/me', { accessToken })
// 			setUser(userResponse.data.user)

// 			// Перенаправляем в зависимости от роли
// 			if (role === 'ADMIN') {
// 				router.push('/')
// 			} else {
// 				router.push('/') // Главная страница для USER
// 			}
// 		} catch (err: any) {
// 			setIsError(true)
// 			setError(err.response?.data?.error || tAuth('loginFailed'))
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	const handleClickForgotPass = () => {
// 		router.push(`/${locale}/auth/forgot-password`)
// 	}

// 	const handleClickRegister = () => {
// 		router.push(`/${locale}/auth/register`)
// 	}

// 	return (
// 		<>
// 			{isLoading && <FullScreenLoader />}

// 			<h2 className='mb-6 font-medium text-[28px] text-center leading-[100%] text-black'>
// 				{tAuth('login')}
// 			</h2>

// 			{/* Поля ввода */}
// 			<div className='flex gap-3 flex-col mb-3'>
// 				<input
// 					type='text'
// 					placeholder={tAuth('placeholders.email')}
// 					value={identifier}
// 					onChange={e => setIdentifier(e.target.value)}
// 					className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all
//             placeholder:text-[13px] placeholder:leading-5
//             placeholder:font-light placeholder:text-[#929294]
//             ${getBorderColor(isEmailValid)}`}
// 				/>

// 				<input
// 					type='password'
// 					placeholder={tAuth('placeholders.password')}
// 					value={password}
// 					onChange={e => setPassword(e.target.value)}
// 					className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all
//             placeholder:text-[13px] placeholder:leading-5             placeholder:font-light placeholder:text-[#929294]
//             ${getBorderColor(isPasswordValid)}`}
// 				/>
// 			</div>

// 			<div
// 				className={`flex items-center mb-6 ${
// 					isError ? 'justify-between' : 'justify-end'
// 				}`}
// 			>
// 				{error && (
// 					<p className='text-[12px] leading-[100%] text-red-500'>{error}</p>
// 				)}
// 				<p
// 					onClick={handleClickForgotPass}
// 					className='text-[13px] leading-5 font-normal text-black capitalize inline-block'
// 				>
// 					{tAuth('forgotYourPassword.question')}
// 				</p>
// 			</div>

// 			<button
// 				onClick={handleLogin}
// 				className={`border-0 text-white text-[16px] leading-5 font-medium mb-3 rounded-[23px] p-[8px] w-full h-[46px] transition-all ${buttonColor}`}
// 				disabled={!isFormValid}
// 			>
// 				{tComponents('login')}
// 			</button>

// 			<p className='text-center text-[13px] leading-5 mb-6 font-normal text-[#929294] flex flex-col'>
// 				<span>{tAuth('youAgree')}</span>
// 				<span className='text-black'>{tAuth('privacyPolicy')}</span>
// 			</p>

// 			<p className='text-center mb-2 text-[13px] leading-[154%] font-normal text-[#929294]'>
// 				{tAuth('signInWith')}
// 			</p>

// 			<div className='mb-6 flex gap-3 justify-center'>
// 				<Image src='/Google2.svg' alt='Google' width={70} height={70} />
// 				<Image src='/Vk2.svg' alt='Vk2' width={70} height={70} />
// 			</div>

// 			<p className='text-center text-[15px] leading-5 font-light text-[#929294]'>
// 				{tAuth('notAccount')}{' '}
// 				<span onClick={handleClickRegister} className='text-black'>
// 					{tAuth('signUp')}
// 				</span>
// 			</p>
// 		</>
// 	)
// }

// export default Login
