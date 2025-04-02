import { useTranslations } from 'next-intl'
import Image from 'next/image'

const No = () => {
	const tComponents = useTranslations('Components')
	const tReview = useTranslations('Review')

	return (
		<>
			<div className='flex flex-col gap-7  mt-7 mb-3 '>
				<p className='font-normal text-[15px] leading-3.5 text-[#14229e] cursor-pointer hover:underline'>
					{tComponents('return')}
				</p>
			</div>
			<div className=' -mx-3 py-10 w-[100vw] flex-col items-center flex justify-center gap-2 bg-[#f3f4f7]'>
				<Image
					src='/feedback-diamond.png'
					height={70}
					width={70}
					alt='pic'
				></Image>

				<p className='text-center text-[13px] font-normal leading-2.5 text-black'>
					{tReview('thanksForFeedback')}
				</p>
				<p className=' font-light text-[11px] leading-3.5 text-[#383838] text-center'>
					{tReview('wePostingSoon')}{' '}
				</p>
			</div>
		</>
	)
}

export default No
