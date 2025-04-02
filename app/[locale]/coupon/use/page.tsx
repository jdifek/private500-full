'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

const PromoCode = () => {
	const [promoCode, setPromoCode] = useState('')
	const [gameFound, setGameFound] = useState(false)
	const tComponents = useTranslations('Components')
	const tCoupon = useTranslations('Coupon')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPromoCode(e.target.value)
	}

	const handleApplyClick = () => {
		if (promoCode === 'MLBB75353945') {
			setGameFound(true)
		} else {
			setGameFound(false)
		}
	}

	return (
		<>
			<div className='flex flex-col gap-7 mt-7 mb-3 '>
				<p className='font-normal text-[15px] leading-[87%] text-[#14229e]'>
					{tComponents('return')}
				</p>
				<div className='flex gap-1 items-center'>
					<Image
						src='/icon-coupons.svg'
						alt='icon coupons'
						width={20}
						height={20}
					/>
					<p className='font-bold text-[14px] leading-[93%] text-center text-[#000]'>
						{tCoupon('coupons')}
					</p>
				</div>
			</div>

			{/* Applied Promo Code Section */}
			<div className='bg-[#f3f4f7] -mx-4 px-4 py-4 mt-4'>
				<div className='flex w-full rounded-lg overflow-hidden mb-4'>
					<input
						type='text'
						placeholder='MLBB75353945'
						className={`flex-grow ${
							gameFound ? 'border-green-500' : 'border-gray-300'
						} bg-[#E9E9E9] rounded-l-lg py-3 px-4 text-sm outline-none`}
						value={promoCode}
						onChange={handleInputChange}
					/>
					<button
						disabled={!promoCode}
						onClick={handleApplyClick}
						className={`${
							promoCode.length > 0 ? 'bg-[#1C34FF]' : ' bg-[#8B8B8B]'
						}  text-white rounded-lg px-5 py-3 text-sm font-medium`}
					>
						{tCoupon('apply')}
					</button>
				</div>

				{/* Display game info if found */}
				{gameFound && (
					<div className='bg-white rounded-lg p-3 flex items-start gap-3'>
						<div className='w-10 h-10 rounded-full overflow-hidden bg-[#333] flex-shrink-0'></div>
						<div>
							<p className='text-[#1C34FF] text-sm font-medium'>
								Mobile Legends: Bang Bang
							</p>
							<p className='font-bold text-sm'>
								{tCoupon('discount')}: <span className='font-bold'>10%</span>
							</p>
							<p className='text-xs text-gray-500 mt-1'>
								{tCoupon('attention')}
							</p>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default PromoCode
