'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import $api from '@/app/http'
import { FullScreenLoader } from '@/components/FullscreenLoader'

const Register = () => {
	const [identifier, setIdentifier] = useState('')
	const [password, setPassword] = useState('')
	const [code, setCode] = useState('')
	const [isEmailValid, setIsEmailValid] = useState<null | boolean>(null)
	const [isPasswordValid, setIsPasswordValid] = useState<null | boolean>(null)
	const [isCodeSent, setIsCodeSent] = useState(false) // Флаг для отображения ввода кода
	const [error, setError] = useState('')
	const [isError, setIsError] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const tAuth = useTranslations('Auth')
	const tComponents = useTranslations('Components')
	const router = useRouter()
	const pathname = usePathname()
	const locale = pathname.split('/')[1] || 'ru'

	useEffect(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const phoneRegex = /^\+?[1-9]\d{1,14}$/
		setIsEmailValid(
			identifier
				? emailRegex.test(identifier) || phoneRegex.test(identifier)
				: null
		)
		setIsPasswordValid(password ? password.length >= 8 : null)
	}, [identifier, password])

	const getBorderColor = (isValid: boolean | null) => {
		if (isValid === null) return 'border-[#8b8b8b]'
		return isValid ? 'border-[#7FFF00]' : 'border-[#FF0000]'
	}

	const isFormValid = isEmailValid && isPasswordValid
	const buttonColor = isFormValid
		? 'bg-[#007BFF] cursor-pointer'
		: 'bg-[#aaaaab] cursor-not-allowed'

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!isFormValid) return
		setIsLoading(true)
		try {
			const response = await $api.post('/auth/register', {
				identifier,
				password,
			})
			setError('')

			if (response.data.message.includes('phone')) {
				setIsCodeSent(true) // Показываем поле для ввода кода
			} else {
				setTimeout(
					() =>
						router.push(
							`/${locale}/auth/registerSuccess?identifier=${encodeURIComponent(
								identifier
							)}`
						),
					2000
				)
			}
		} catch (err: any) {
			setIsError(true)
			setError(err.response?.data?.error || tAuth('registrationFailed'))
		} finally {
			setIsLoading(false)
		}
	}

	const handleVerifyCode = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const response = await $api.post('/auth/verifyCode', {
				phoneNumber: identifier,
				code,
			})
			setError('')
			setTimeout(
				() =>
					router.push(
						`/${locale}/auth/registerSuccess?identifier=${encodeURIComponent(
							identifier
						)}`
					),
				2000
			)
		} catch (err: any) {
			setIsError(true)
			setError(err.response?.data?.error || tAuth('verificationFailed'))
		} finally {
			setIsLoading(false)
		}
	}

	const handleClickForgotPass = () => {
		router.push(`/${locale}/auth/forgot-password`)
	}

	return (
		<>
			{isLoading && <FullScreenLoader />}

			<h2 className='mb-6 font-medium text-[28px] text-center leading-[100%] text-black'>
				{tAuth('registration')}
			</h2>

			{!isCodeSent ? (
				<>
					<div className='flex gap-2 flex-col mb-3'>
						<input
							type='text'
							placeholder={tAuth('placeholders.email')}
							value={identifier}
							onChange={e => setIdentifier(e.target.value)}
							className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all
            placeholder:text-[13px] placeholder:leading-5 
            placeholder:font-light placeholder:text-[#929294]
                ${getBorderColor(isEmailValid)}`}
						/>

						<input
							type='password'
							placeholder={tAuth('placeholders.password')}
							value={password}
							onChange={e => setPassword(e.target.value)}
							className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all
            placeholder:text-[13px] placeholder:leading-5 
            placeholder:font-light placeholder:text-[#929294]
                ${getBorderColor(isPasswordValid)}`}
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
							className='text-[13px] leading-5 font-normal text-black capitalize inline-block'
						>
							{tAuth('forgotYourPassword.question')}
						</p>
					</div>

					<button
						onClick={handleRegister}
						className={`border-0 text-white text-[16px] leading-5 font-medium mb-3 rounded-[23px] p-[8px] w-full h-[46px] transition-all ${buttonColor}`}
						disabled={!isFormValid || isLoading}
					>
						{isLoading ? tComponents('loading') : tAuth('signUp')}
					</button>
				</>
			) : (
				<>
					<div className='flex gap-2 flex-col mb-2'>
						<input
							type='text'
							placeholder={tAuth('placeholders.code')}
							value={code}
							onChange={e => setCode(e.target.value)}
							className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all
            placeholder:text-[13px] placeholder:leading-5 
            placeholder:font-light placeholder:text-[#929294]`}
						/>
					</div>

					{error && (
						<p className='text-[12px] leading-[100%] text-red-500'>{error}</p>
					)}

					<button
						onClick={handleVerifyCode}
						className={`border-0 text-white text-[16px] leading-5 font-medium mb-3 rounded-[23px] p-[8px] w-full h-[46px] transition-all bg-[#007BFF] cursor-pointer`}
						disabled={isLoading}
					>
						{isLoading ? tComponents('loading') : tAuth('verifyCode')}
					</button>
				</>
			)}

			<p className='text-center text-[13px] leading-5 mb-6 font-normal text-[#929294] flex flex-col'>
				<span>{tAuth('youAgree')}</span>
				<span className='text-black'>{tAuth('privacyPolicy')}</span>
			</p>

			<p className='text-center mb-2 text-[13px] leading-[154%] font-normal text-[#929294]'>
				{tAuth('signInWith')}
			</p>

			<div className='mb-6 flex gap-3 justify-center'>
				<Image src='/Google2.svg' alt='Google' width={70} height={70} />
				<Image src='/Vk2.svg' alt='Vk2' width={70} height={70} />
			</div>
		</>
	)
}

export default Register
