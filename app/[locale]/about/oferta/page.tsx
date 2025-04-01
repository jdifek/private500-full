import { useTranslations } from 'next-intl'

const Oferta = () => {
	const tComponents = useTranslations('Components')
	const tOffer = useTranslations('About.offer')

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
						{tOffer('publicOffer.title')}
					</h2>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>{tOffer('generalProvisions.title')}</h3>
						<ul>
							<li>{tOffer('generalProvisions.description1')}</li>
							<li>{tOffer('generalProvisions.description2')}</li>
							<li>{tOffer('generalProvisions.description3')}</li>
							<li>{tOffer('generalProvisions.description4')}</li>
						</ul>
					</div>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>{tOffer('subjectOfContract.title')}</h3>
						<p>{tOffer('subjectOfContract.description1')}</p>
					</div>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>
							{tOffer('procedureForConcluding.title')}
						</h3>
						<ul>
							<li>{tOffer('procedureForConcluding.description1')}</li>
							<li>{tOffer('procedureForConcluding.description2')}</li>
							<li>{tOffer('procedureForConcluding.description3')}</li>
							<li>{tOffer('procedureForConcluding.description4')}</li>
							<li>{tOffer('procedureForConcluding.description5')}</li>
						</ul>
					</div>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>{tOffer('orderAndPayment.title')}</h3>
						<ul>
							<li>{tOffer('orderAndPayment.description1')}</li>
							<li>{tOffer('orderAndPayment.description2')}</li>
							<li>{tOffer('orderAndPayment.description3')}</li>
							<li>{tOffer('orderAndPayment.description4')}</li>
							<li> {tOffer('orderAndPayment.description5')}</li>
						</ul>
					</div>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>{tOffer('orderModification.title')}</h3>
						<p>{tOffer('orderModification.description1')}</p>
					</div>

					<div className='text-[13px] leading-5 text-black'>
						<h3 className='font-medium'>{tOffer('otherProvisions.title')}</h3>
						<p>{tOffer('otherProvisions.description1')}</p>

						<p>{tOffer('otherProvisions.description2')}:</p>
						<ul>
							<li>{tOffer('otherProvisions.soleProprietor')}</li>
							<li>{tOffer('otherProvisions.tin')}: 250822605454</li>
							<li>{tOffer('otherProvisions.ogrnip')}: 324253600050587</li>
							<li>{tOffer('otherProvisions.email')}: hoyakap@gmail.com</li>
							<li>{tOffer('otherProvisions.bankingDetails')}:</li>
							<li>
								{tOffer('otherProvisions.settlementAccount')}
								40802810100006388483
							</li>
							<li>
								{tOffer('otherProvisions.bank.title')}:
								{tOffer('otherProvisions.bank.name')}
							</li>
							<li>{tOffer('otherProvisions.bank.bic')}: 044525974</li>
							<li>
								{tOffer('otherProvisions.bank.correspondentAccount')}:
								30101810145250000974
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Oferta
