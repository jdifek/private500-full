import { useTranslations } from 'next-intl'
import Image from 'next/image'

const No = () => {
	const tComponents = useTranslations('Components')
	const tCoupon = useTranslations('Coupon')

	return (
		<>
			<div className='flex flex-col gap-7  mt-7 mb-3 '>
				<p className='font-normal text-[15px] leading-[87%] text-[#14229e]'>
					{tComponents('return')}
				</p>
				<div className='flex gap-1 items-center'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect width='20' height='20' rx='4' fill='#1C34FF' />
						<path
							d='M14.8265 13.2642L15.7842 12.3079C16.1625 11.9302 16.1658 11.3212 15.7918 10.9477L9.12656 4.29253C8.7525 3.91901 8.1426 3.92237 7.76433 4.30008L6.80019 5.26276C7.09417 5.65605 7.06057 6.21816 6.69899 6.57919C6.33741 6.94023 5.77443 6.97381 5.38068 6.68015L4.41642 7.64296C4.03827 8.02053 4.0349 8.62953 4.40897 9.00303L11.0742 15.6582C11.4482 16.0317 12.0582 16.0284 12.4363 15.6508L13.3942 14.6944C13.0356 14.3008 13.049 13.6885 13.434 13.3041C13.819 12.9198 14.4322 12.9064 14.8265 13.2642ZM6.06714 9.79578L5.83411 9.5631L6.44863 8.94951L6.68166 9.18219L6.06714 9.79578ZM7.14678 8.71777L6.91375 8.48509L7.52824 7.87151L7.76128 8.10419L7.14678 8.71777ZM8.22638 7.63979L7.99335 7.40711L8.60799 6.79339L8.84102 7.02607L8.22638 7.63979ZM9.30598 6.56181L9.07295 6.32912L9.68746 5.71553L9.9205 5.94821L9.30598 6.56181Z'
							fill='#F6FBFE'
						/>
					</svg>
					<p
						className='font-bold text-[14px] leading-[120%] text-[#212529]'
						style={{ fontFamily: 'var(--font3)' }}
					>
						{tCoupon('coupons')}
					</p>
				</div>
			</div>
			<div className=' -mx-3 py-10 w-[100vw] flex-col items-center flex justify-center   bg-[#f3f4f7]'>
				<Image src='/Sad diamond.svg' height={70} width={70} alt='pic'></Image>

				<p className='text-center text-[14px] font-normal leading-[93%] text-black mb-3 mt-5'>
					{tCoupon('notCoupons')}{' '}
				</p>
				<p className=' font-light text-[11px] leading-[127%] text-[#383838] text-center'>
					{tCoupon('getDiscountCoupons')}
				</p>
			</div>
		</>
	)
}

export default No
