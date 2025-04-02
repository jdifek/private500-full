'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

const purchasesData = [
	{
		id: '2176672',
		date: '21.03.2025, 14:20',
		price: 92.78,
		status: 'delivered',
		items: [{ img: '/Promition banndser.png' }, { img: '/diamonds.png' }],
		userId: '73991789',
		serverId: '63465',
		diamonds: 50,
	},
	{
		id: '2176648',
		date: '21.03.2025, 14:18',
		price: 3711.16,
		status: 'in_delivery',
		items: [{ img: '/Promition banndser.png' }, { img: '/diamonds.png' }],
		userId: '512311',
		serverId: '71873',
		diamonds: 2000,
	},
	{
		id: '2176612',
		date: '21.03.2025, 12:30',
		price: 185.56,
		status: 'failed',
		items: [{ img: '/Promition banndser.png' }, { img: '/diamonds.png' }],
		userId: '6167823',
		serverId: '4241',
		diamonds: 100,
	},
]

const Purchases = () => {
	const tComponents = useTranslations('Components')
	const tHistory = useTranslations('History')
	const [selectedId, setSelectedId] = useState<string | null>(null)

	const getStatusInfo = (status: string) => {
		switch (status) {
			case 'delivered':
				return {
					text: tHistory('deliveryStatus.delivered'),
					color: 'green',
					icon: '/green-successfully.svg',
					smIcon: '/small-green-successfully.svg',
				}
			case 'in_delivery':
				return {
					text: tHistory('deliveryStatus.inDelivery'),
					color: 'blue',
					icon: '/pending.svg',
					smIcon: '/small-pending.svg',
				}
			case 'failed':
				return {
					text: tHistory('deliveryStatus.failed'),
					color: 'red',
					icon: '/icon-error.svg',
					smIcon: '/small-icon-error.svg',
				}
			default:
				return {
					text: tHistory('deliveryStatus.formalized'),
					color: 'gray',
					icon: '/pending.svg',
					smIcon: '/small-pending.svg',
				}
		}
	}

	return (
		<div className='p-4'>
			<div className='flex flex-col gap-3  mt-7 mb-3'>
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

			<ul className='flex flex-col gap-2'>
				{purchasesData.map(purchase => {
					const isOpen = selectedId === purchase.id
					const statusInfo = getStatusInfo(purchase.status)

					return (
						<li
							key={purchase.id}
							className='border-[0.1px] border-gray-200 p-2 rounded-lg bg-[#f3f4f7] flex flex-col justify-between transition-all duration-300'
						>
							<div
								className='flex gap-2 justify-between items-center cursor-pointer'
								onClick={() => setSelectedId(isOpen ? null : purchase.id)}
							>
								<div className='flex gap-2'>
									<p className='text-blue-600 text-[13px] leading-2.5 underline'>
										{tHistory('buying')} #{purchase.id}
									</p>
									<span className='text-[#383838] text-[11px] leading-2.5'>
										{purchase.date}
									</span>
								</div>
								<Image
									src={statusInfo.icon}
									alt='status icon'
									width={20}
									height={20}
								/>
							</div>

							{/* Выпадающая секция */}
							<div className={`details ${isOpen ? 'expanded' : ''}`}>
								<div className='mt-2 p-2 bg-inherit rounded-lg shadow-sm space-y-2'>
									<div className='font-medium flex items-center gap-2'>
										<Image
											src={statusInfo.icon}
											alt='status icon'
											width={20}
											height={20}
										/>
										<p className='text-[12px] leading-2.5'>{statusInfo.text}</p>
									</div>

									<p className='font-light text-[9px] leading-2.5'>
										<span className='font-medium text-[12px] leading-2.5'>
											{tHistory('player')}:
										</span>{' '}
										{purchase.userId}
									</p>
									<p className='font-light text-[9px] leading-2.5'>
										<span className='font-medium text-[12px] leading-2.5'>
											{tHistory('server')}:
										</span>{' '}
										{purchase.serverId}
									</p>
									<p className='font-light text-[9px] leading-2.5'>
										<span className='font-medium text-[12px] leading-2.5'>
											{tHistory('diamonds')}:
										</span>{' '}
										{purchase.diamonds}
									</p>
								</div>
							</div>

							<div className='flex justify-between items-center mt-2'>
								<div className='flex gap-2'>
									{purchase.items.map((item, index) => (
										<div key={index} className='relative'>
											<Image
												src={item.img}
												alt='item'
												width={25}
												height={20}
												className='w-8 h-8 bg-[#e8e8e8] rounded-full flex items-center justify-center'
											/>
											{index === 1 && (
												<Image
													src={statusInfo.smIcon}
													alt='status small icon'
													width={16}
													height={16}
													className='absolute top-4 right-0'
												/>
											)}
										</div>
									))}
								</div>
								<p className='text-[16px] leading-2.5 font-medium'>
									{purchase.price} ₽
								</p>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Purchases
