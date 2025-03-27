import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Footer = () => {
	const tFooter = useTranslations('Footer')

	return (
		<footer className='px-3'>
			<div className='flex items-center justify-between '>
				<Link href='/'>
					<Image src='/Logo.svg' width={130} height={70} alt='logo'></Image>
				</Link>
				<a href='https://www.tbank.ru/' target='_blank'>
					<Image src='/Icon pay.svg' width={30} height={30} alt='logo'></Image>
				</a>
			</div>

			<ul className='font-normal text-[13px] leading-[162%] text-[#383838]'>
				<li>
					<Link href='/about/confidentiality'>{tFooter('userAgreement')}</Link>
				</li>
				<li>
					<Link href='/about/confidentiality'>
						{tFooter('dataProcessingPolicy')}
					</Link>
				</li>
				<li>
					<Link href='/about/oferta'>{tFooter('returnPolicy')}</Link>
				</li>
				<li>
					<Link href='/about/contact'>{tFooter('contactUs')}</Link>
				</li>
				<li>
					<Link href='/review/base'>{tFooter('reviews')}</Link>
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
