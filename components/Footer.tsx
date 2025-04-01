import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const Footer = () => {
	const tFooter = useTranslations('Footer')

	const FooterNavItems = [
		{
			href: '/about/confidentiality',
			label: tFooter('userAgreement'),
		},
		{
			href: '/about/confidentiality',
			label: tFooter('dataProcessingPolicy'),
		},
		{
			href: '/about/oferta',
			label: tFooter('returnPolicy'),
		},
		{
			href: '/about/contact',
			label: tFooter('contactUs'),
		},
		{
			href: '/review/base',
			label: tFooter('reviews'),
		},
		{
			href: '/about/faq',
			label: tFooter('faq'),
		},
	]

	return (
		<footer className='px-3 mb-16 border-t-[0.32px] border-t-[#b0b0b0] pt-3'>
			<div className='flex items-center justify-between '>
				<Link href='/'>
					<Image
						src='/Logo.svg'
						width={130}
						height={70}
						alt={tFooter('logo')}
					></Image>
				</Link>
				<a href='https://www.tbank.ru/' target='_blank'>
					<Image
						src='/Icon pay.svg'
						width={30}
						height={30}
						alt={tFooter('paymentIcon')}
					></Image>
				</a>
			</div>

			<ul className='space-y-2 my-3.5'>
				{FooterNavItems.map((item, index) => (
					<li
						key={index}
						className='roboto-condensed text-[13px] leading-5 uppercase text-[#383838]'
					>
						<Link href={item.href}>{item.label}</Link>
					</li>
				))}
			</ul>

			<p className='roboto-condensed font-light text-[11px] leading-5 text-[#7a7a7a]'>
				© Don-Vip.com, 2025. {tFooter('rightsReserved')}
			</p>
		</footer>
	)
}

export default Footer
