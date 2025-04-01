import { useTranslations } from 'next-intl'

const Confidentiality = () => {
	const t = useTranslations('About.confidentiality')
	const tComponents = useTranslations('Components')

	return (
		<>
			<div className='flex flex-col gap-7 mt-7 mb-3'>
				{/* Ссылка "Вернуться" */}
				<p className='font-normal text-[15px] leading-3.5 text-[#14229e] cursor-pointer hover:underline'>
					{tComponents('return')}
				</p>

				{/* Контейнер для контактной информации */}
				<div className='flex flex-col gap-4 mb-4'>
					<h2 className='font-bold text-[14px] leading-3.5 text-[#212529]'>
						{t('privacyPolicy.title')}
					</h2>

					<div className='text-[13px] leading-5 text-black'>
						<p className='mb-6'>{t('privacyPolicy.description')}</p>
						<h3 className='font-medium'>{t('sourcesOfInformation.title')}</h3>
						<ul>
							<li>{t('sourcesOfInformation.description1')}</li>
							<li>{t('sourcesOfInformation.description2')}</li>
							<li>{t('sourcesOfInformation.description3')}</li>
							<li>{t('sourcesOfInformation.description4')}</li>
						</ul>
					</div>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>{t('security.title')}</h3>
						<ul>
							<li>{t('security.description1')}</li>
							<li>{t('security.description2')}</li>
							<li>{t('security.description3')}</li>
							<li>{t('security.description4')}</li>
						</ul>
					</div>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>{t('finalProvisions.title')}</h3>
						<ul>
							<li>{t('finalProvisions.description1')}</li>
							<li>{t('finalProvisions.description2')}</li>
							<li>{t('finalProvisions.description3')}</li>
							<li>{t('finalProvisions.description4')}</li>
						</ul>
					</div>

					<p className='mt-6 text-[13px] leading-5 text-black'>
						{t('aboutUs')}
					</p>
				</div>
			</div>
		</>
	)
}

export default Confidentiality
