import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Empty = () => {
	const tComponents = useTranslations('Components')
	const tHistory = useTranslations('History')

	return (
		<>
			<div className='flex flex-col gap-3  mt-7 mb-3 '>
				<p className='font-normal text-[15px] leading-[87%] text-[#14229e]'>
					{tComponents('return')}
				</p>
				<div className='flex gap-1 items-center mb-3'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect width='20' height='20' rx='4' fill='#F03D00' />
						<path
							d='M15.3333 5.33325H4V6.88881H15.3333V5.33325Z'
							fill='white'
						/>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M4.70801 13.1109C4.70801 13.9704 5.34267 14.6665 6.12467 14.6665H13.208C13.9907 14.6665 14.6247 13.9704 14.6247 13.1109V7.6665H4.70801V13.1109ZM8.23551 9.19017H11.1269V10.0488H8.23551V9.19017Z'
							fill='white'
						/>
					</svg>
					<p className='font-bold text-[14px] leading-[93%] text-center text-[#000]'>
						{tHistory('shopping')}
					</p>
				</div>
			</div>
			<div className='rounded-[12px] py-10 w-full flex-col items-center flex justify-center   bg-[#f3f4f7]'>
				<Image src='/Sad diamond.svg' height={70} width={70} alt='pic'></Image>

				<p className='text-center text-[14px] font-normal leading-[93%] text-black mb-3 mt-5'>
					{tHistory('notShopping')}{' '}
				</p>
			</div>
		</>
	)
}

export default Empty
