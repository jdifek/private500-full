import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Empty = () => {
	const tComponents = useTranslations('Components')
	const tHistory = useTranslations('History')

	return (
		<>
			<div className='flex flex-col gap-3  mt-7 mb-3 '>
				<p className='font-normal text-[15px] leading-3.5 text-[#14229e] cursor-pointer hover:underline'>
					{tComponents('return')}
				</p>
				<div className='flex gap-1 items-center mb-2'>
					<Image src='/icon-box.svg' alt='icon box' width={20} height={20} />
					<h2 className='font-medium text-[16px] leading-2.5 text-[#212529] ml-2 lowercase'>
						{tHistory('shopping')}
					</h2>
				</div>
			</div>
			<div className='rounded-[12px] py-10 w-full flex-col items-center flex justify-center gap-3 bg-[#f3f4f7]'>
				<Image src='/Sad diamond.svg' height={70} width={70} alt='pic'></Image>

				<p className='text-center text-[13px] font-normal leading-2.5 text-black mb-3'>
					{tHistory('notShopping')}
				</p>
			</div>
		</>
	)
}

export default Empty
