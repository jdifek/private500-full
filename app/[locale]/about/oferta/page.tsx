import { useTranslations } from 'next-intl'

const Oferta = () => {
	const tComponents = useTranslations('Components')
	const tOffer = useTranslations('About.offer')

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
						{tOffer('publicOffer.title')}
					</h2>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{tOffer('generalProvisions.title')}
						</h3>
						<p className='font-medium text-[13px] leading-[154%] text-black'>
							{tOffer('generalProvisions.description1')}
							{tOffer('generalProvisions.description2')}
							{tOffer('generalProvisions.description3')}
							{tOffer('generalProvisions.description4')}
						</p>
					</div>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{tOffer('subjectOfContract.title')}
						</h3>
						<p className='font-normal text-black'>
							{tOffer('subjectOfContract.description1')}
						</p>
					</div>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{tOffer('procedureForConcluding.title')}
						</h3>
						<p className='font-normal text-black'>
							{tOffer('procedureForConcluding.description1')}
							{tOffer('procedureForConcluding.description2')}
							{tOffer('procedureForConcluding.description3')}
							{tOffer('procedureForConcluding.description4')}
							{tOffer('procedureForConcluding.description5')}
						</p>
					</div>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{tOffer('orderAndPayment.title')}
						</h3>
						<p className='font-normal text-black'>
							{tOffer('orderAndPayment.description1')}
							{tOffer('orderAndPayment.description2')}
							{tOffer('orderAndPayment.description3')}
							{tOffer('orderAndPayment.description4')}
							{tOffer('orderAndPayment.description5')}
						</p>
					</div>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{tOffer('orderModification.title')}
						</h3>
						<p className='font-normal text-black'>
							{tOffer('orderModification.description1')}
						</p>
					</div>

					<div>
						<h3 className='font-bold text-[16px] leading-[120%] text-[#212529]'>
							{tOffer('otherProvisions.title')}
						</h3>
						<p className='font-normal text-black'>
							{tOffer('otherProvisions.description1')}{' '}
							{tOffer('otherProvisions.description2')}:
							{tOffer('otherProvisions.soleProprietor')}{' '}
							{tOffer('otherProvisions.tin')}: 250822605454{' '}
							{tOffer('otherProvisions.ogrnip')}: 324253600050587{' '}
							{tOffer('otherProvisions.email')}: hoyakap@gmail.com{' '}
							{tOffer('otherProvisions.bankingDetails')}:{' '}
							{tOffer('otherProvisions.settlementAccount')}
							40802810100006388483 {tOffer('otherProvisions.bank.title')}:{' '}
							{tOffer('otherProvisions.bank.name')}
							{tOffer('otherProvisions.bank.bic')}: 044525974
							{tOffer('otherProvisions.bank.correspondentAccount')}:
							30101810145250000974
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Oferta
