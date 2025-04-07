'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import $api from '@/app/http'
import { Toaster, toast } from 'react-hot-toast'

const diamonds = [
	{ price: 37.11, amount: 20 },
	{ price: 92.78, amount: 50 },
	{ price: 185.56, amount: 100 },
	{ price: 371.12, amount: 200 },
	{ price: 927.79, amount: 500 },
	{ price: 1855.58, amount: 1000 },
	{ price: 3711.16, amount: 2000 },
	{ price: 9277.91, amount: 5000 },
	{ price: 18555.81, amount: 10000 },
]

export default function Order({ params }: { params: { id: string } }) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selected, setSelected] = useState(20)
	const [userId, setUserId] = useState('')
	const [isConfirmed, setIsConfirmed] = useState<boolean>(true)
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
	const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false)
	const [selectedPayment, setSelectedPayment] = useState('T-bank (SBP)')
	const [loading, setLoading] = useState<boolean>(false)
	const tOrder = useTranslations('Order')
	const tHistory = useTranslations('History')
	const tComponents = useTranslations('Components')

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen)
	}

	const handlePurchase = async () => {
		if (!userId || !isConfirmed) {
			toast.error('Please enter your Bigo ID and confirm')
			return
		}

		setLoading(true)

		const selectedDiamond = diamonds.find(d => d.amount === selected)
		if (!selectedDiamond) {
			toast.error('Invalid diamond selection')
			setLoading(false)
			return
		}

		try {
			const response = await $api.post(`/order/${params.id}`, {
				bigoId: userId,
				diamonds: selectedDiamond.amount,
				totalCost: selectedDiamond.price,
			})

			const { status, message, paymentMessage } = response.data

			if (status === 'completed') {
				toast.success(
					`${paymentMessage}. ${selectedDiamond.amount} diamonds successfully requested for ${userId}.`,
					{ duration: 5000 }
				)
				setUserId('')
			} else {
				toast.error(`Payment: ${paymentMessage}. Bigo Live: ${message}`, {
					duration: 5000,
				})
			}
		} catch (error: any) {
			toast.error(error.response?.data?.error || 'Failed to process purchase')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />

			<div className='-mx-3 w-[100vw] flex justify-center'>
				<Image
					src={'/Promition banner.png'}
					alt='promotion'
					height={50}
					width={70}
					className='w-[100vw]'
				/>
			</div>

			<div className='w-full mt-5'>
				<motion.div
					className='w-full bg-blue-600 text-white px-4 pt-3 pb-2 rounded-lg flex flex-col items-center text-center'
					onClick={() => setIsOpen(!isOpen)}
					initial={{ borderRadius: 12 }}
					whileHover={{ scale: 1.05 }}
				>
					<div className='w-full flex justify-center items-center gap-1 cursor-pointer'>
						<span className='roboto-condensed min-w-[146px] w-fit text-center text-[16px] leading-5'>
							{tOrder('productInformation.title')}
						</span>
						<motion.img
							animate={{ rotate: isOpen ? 180 : 0 }}
							transition={{ duration: 0.3 }}
							src='/arrow-down.svg'
							alt='arrow down'
							className='w-4 h-4'
						></motion.img>
					</div>
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='overflow-hidden w-full roboto-condensed text-[15px] leading-5 text-center mt-2'
					>
						{tOrder('productInformation.label')}
					</motion.div>
				</motion.div>
			</div>

			<div className='mt-6'>
				<h3 className='text-[16px] font-medium leading-2.5 mb-2'>
					{tOrder('selectAmountOfRep')}
				</h3>
				<div className='grid grid-cols-2 gap-2'>
					{diamonds.map(item => (
						<button
							key={item.amount}
							className='p-3 flex flex-col rounded-xl relative h-[104px] shadow-md'
							onClick={() => setSelected(item.amount)}
						>
							<div
								className={`absolute inset-0 rounded-xl ${
									selected === item.amount ? 'bg-[#eeeff3]' : 'bg-[#eeeff3]'
								}`}
							></div>
							{selected === item.amount && (
								<div className='absolute top-0 right-0 w-8 h-8'>
									<div className='absolute top-0 right-0 w-0 h-0 border-t-[44px] border-t-[#00d057] border-l-[58px] border-l-transparent rounded-tr-xl'></div>
									<Image
										src='/check.svg'
										alt='icon check'
										width={13}
										height={13}
										className='relative top-1 left-3'
									/>
								</div>
							)}
							<div className='relative z-10 flex flex-col items-start gap-5'>
								<span className='font-semibold text-[16px] leading-2.5 text-[#212529]'>
									{item.price} {tOrder('rub')}
								</span>
								<span className='text-[14px] font-light leading-2.5 text-[#212529]'>
									{item.amount} {tHistory('diamonds')}
								</span>

								<div className='ml-auto'>
									<Image
										src='/diamonds.png'
										width={24}
										height={24}
										alt='diamonds'
										className='w-6 h-6'
									/>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			<div className='mt-6'>
				<div className='flex gap-2 mb-2 items-center relative'>
					<p className='font-medium text-[16px] leading-2.5 text-[#212529]'>
						{tOrder('enterId')}
					</p>
					<Image
						src={'/question-mark-in-circular-shape-svgrepo-com 1.svg'}
						alt='question'
						width={25}
						height={25}
						onClick={togglePopup}
					/>
					{isPopupOpen && (
						<div className='absolute top-8 right-0 z-10 bg-[#383838] text-white px-5 pb-5 pt-3 rounded-xl shadow-lg w-full'>
							<div className='flex justify-between items-center mb-3'>
								<Image
									src='/icon-info-circle.svg'
									alt='icon info'
									width={24}
									height={24}
								/>
								<button onClick={togglePopup} className='text-white'>
									<Image
										src='/icon-close.svg'
										alt='icon close'
										width={16}
										height={16}
									/>
								</button>
							</div>
							<p className='text-[16px] leading-5'>{tOrder('howEnterId')}</p>
						</div>
					)}
				</div>
				<input
					type='text'
					placeholder={tOrder('placeholder')}
					className='border-0 rounded-xl p-2 w-full h-10 bg-[#f3f4f7] transition-all placeholder:text-[13px] placeholder:font-light placeholder:leading-5'
					value={userId}
					onChange={e => setUserId(e.target.value)}
				/>
				<div className={`flex items-center mtAbsol2 p-2 rounded-lg`}>
					<input
						type='checkbox'
						id='confirm'
						className={`mr-2 ${
							userId ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
						}`}
						checked={isConfirmed}
						onChange={() => userId && setIsConfirmed(!isConfirmed)}
						disabled={!userId}
					/>
					<label
						htmlFor='confirm'
						className={`font-light text-[11px] leading-5 text-black uppercase`}
					>
						{tOrder('confirming')}
					</label>
				</div>
			</div>

			<div className='mt-3 mb-5'>
				<h3 className='font-medium text-[15px] leading-5 roboto-condensed text-[#212529] capitalize mb-2.5'>
					{tOrder('whereToFindId.title')}
				</h3>
				<ul className='mb-2 font-normal roboto-condensed text-[15px] leading-5 text-[#212529]'>
					<li>{tOrder('whereToFindId.item1')}</li>
					<li>{tOrder('whereToFindId.item2')}</li>
					<li>{tOrder('whereToFindId.item3')}</li>
					<li>{tOrder('whereToFindId.item4')}</li>
				</ul>
				<Image
					src={'/Screen.png'}
					width={250}
					height={150}
					alt='screen'
				></Image>
			</div>

			<div className='mt-6'>
				<label className='block font-medium text-[16px] leading-2.5 text-[#212529] mb-2.5'>
					{tOrder('selectPayment')}
				</label>
				<div className='relative'>
					<div
						className={`w-full rounded-lg p-3 bg-[#f3f4f7] cursor-pointer flex justify-between items-center text-[13px] leading-5 transition-all ${
							isPaymentOpen
								? 'border-[1px] border-blue-500'
								: 'border-[0.3px] border-black/13'
						}`}
						onClick={() => setIsPaymentOpen(!isPaymentOpen)}
					>
						<div className='flex gap-2 items-center'>
							<Image src='/Icon pay.svg' width={30} height={30} alt='logo' />
							<span className='font-medium text-[#212529] capitalize'>
								{selectedPayment}
							</span>
						</div>
						<Image
							src='/arrow-down-black.svg'
							alt='arrow'
							width={18}
							height={14}
							className={`transition-transform ${
								isPaymentOpen ? 'rotate-180' : ''
							}`}
						/>
					</div>
					{isPaymentOpen && (
						<div className='absolute w-full bg-[#f3f4f7] shadow-lg rounded-lg mt-1 z-10 text-[13px] leading-5'>
							<div
								className='p-3 hover:bg-gray-100 cursor-pointer flex gap-2 items-center'
								onClick={() => {
									setSelectedPayment('T-bank (SBP)')
									setIsPaymentOpen(false)
								}}
							>
								<Image src='/Icon pay.svg' width={30} height={30} alt='logo' />
								<span className='font-medium text-[#212529] capitalize'>
									T-bank (SBP)
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className='fixed bottom-32 left-0 right-4 flex justify-end z-10'>
				<button
					className={`px-3 py-4 rounded-3xl text-white font-semibold text-[14px] leading-4 transition-all ${
						userId && isConfirmed && !loading
							? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
							: 'bg-gray-400 cursor-not-allowed'
					}`}
					disabled={!userId || !isConfirmed || loading}
					onClick={handlePurchase}
				>
					{loading ? 'Processing...' : tComponents('buyNow')}
				</button>
			</div>
		</>
	)
}
