import { useTranslations } from 'next-intl'

const Confidentiality = () => {
	const t = useTranslations('About.confidentiality')
	const tComponents = useTranslations('Components')

	return (
		<>
			<div className='flex flex-col gap-7 mt-7 mb-3'>
				{/* Ссылка "Вернуться" */}
				<p className='font-normal text-[15px] leading-[87%] text-[#14229e] cursor-pointer hover:underline'>
					{tComponents('return')}
				</p>

				{/* Контейнер для контактной информации */}
				<div className='flex flex-col gap-4 mb-4'>
					<h2
						className='font-bold text-[14px] leading-[120%] text-[#212529]'
						style={{ fontFamily: 'var(--font3)' }}
					>
						{t('privacyPolicy.title')}
					</h2>

					<div>
						<p className='mb-6'>{t('privacyPolicy.description')}</p>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{t('sourcesOfInformation.title')}
						</h3>
						<p className='font-medium text-[13px] leading-[154%] text-black'>
							{t('sourcesOfInformation.description1')}
							{t('sourcesOfInformation.description2')}
							{t('sourcesOfInformation.description3')}
							{t('sourcesOfInformation.description4')}
						</p>
					</div>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{t('security.title')}
						</h3>
						<p className='font-normal text-black'>
							{t('security.description1')}
							{t('security.description2')}
							{t('security.description3')}
							{t('security.description4')}
						</p>
					</div>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{t('finalProvisions.title')}
						</h3>
						<p className='font-normal text-black'>
							{t('finalProvisions.description1')}
							{t('finalProvisions.description2')}
							{t('finalProvisions.description3')}
							{t('finalProvisions.description4')}
						</p>
					</div>

					<p className='mt-6'>{t('aboutUs')}</p>
				</div>
			</div>
		</>
	)
}

export default Confidentiality
