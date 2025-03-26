import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Footer = () => {
	const tFooter = useTranslations('Footer')

	return (
		<footer className='px-3'>
			<div className='flex items-center justify-between '>
				<Image src='/Logo.svg' width={110} height={60} alt='logo'></Image>
				<Image src='/Icon pay.svg' width={30} height={30} alt='logo'></Image>
			</div>

			<ul className='font-normal text-[13px] leading-[162%] text-[#383838]'>
				<li>{tFooter('userAgreement')}</li>
				<li>{tFooter('dataProcessingPolicy')}</li>
				<li>{tFooter('returnPolicy')}</li>
				<li>
					<Link href='/about/contact'>{tFooter('contactUs')}</Link>
				</li>
				<li>{tFooter('faq')}</li>
			</ul>

			<p className=' font-light text-[11px] leading-[191%] text-[#7a7a7a]'>
				© Don-Vip.com, 2025. {tFooter('rightsReserved')}
			</p>
		</footer>
	)
}

export default Footer
