'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

const RegisterSuccess = () => {
	const tAuth = useTranslations('Auth')
	const searchParams = useSearchParams()
	const email = searchParams.get('email') || 'mail@gmail.com'

	return (
		<div className='rounded-[12px] px-[20px]  py-[108px] w-full flex-col items-center flex justify-center mt-9  bg-[#f3f4f7]'>
			<Image src='/Pic.svg' height={150} width={150} alt='pic'></Image>

			<p className='text-center text-[14px] font-normal leading-3.5 text-black mb-3 mt-5'>
				{tAuth('passwordResetAccepted')}
			</p>
			<p className='text-center text-[13px] font-light leading-5 text-[#383838]'>
				{tAuth('linkToActivate')}{' '}
				<span className='font-medium'>{decodeURIComponent(email)}</span>
			</p>
		</div>
	)
}

export default RegisterSuccess
