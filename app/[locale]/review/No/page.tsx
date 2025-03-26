import { useTranslations } from 'next-intl'
import Image from 'next/image'

const No = () => {
	const tComponents = useTranslations('Components')
	const tReview = useTranslations('Review')

	return (
		<>
			<div className='flex flex-col gap-7  mt-7 mb-3 '>
				<p className='font-normal text-[15px] leading-[87%] text-[#14229e]'>
					{tComponents('return')}
				</p>
			</div>
			<div className=' -mx-3 py-10 w-[100vw] flex-col items-center flex justify-center   bg-[#f3f4f7]'>
				<Image src='/Sad diamond.svg' height={70} width={70} alt='pic'></Image>

				<p className='text-center text-[14px] font-normal leading-[93%] text-black mb-3 mt-5'>
					{tReview('thanksForFeedback')}
				</p>
				<p className=' font-light text-[11px] leading-[127%] text-[#383838] text-center'>
					{tReview('wePostingSoon')}{' '}
				</p>
			</div>
		</>
	)
}

export default No
