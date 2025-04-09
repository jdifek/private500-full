'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const Faq = () => {
	// State to track which FAQ items are expanded
	const [expandedItems, setExpandedItems] = useState(new Map())
	const tComponents = useTranslations('Components')
	const tFaq = useTranslations('About.faq')
	const tSearch = useTranslations('Search')

	// FAQ data
	const faqItems = [
		{
			id: 1,
			question: tFaq('question1'),
			answer: tFaq('answer1'),
		},
		{
			id: 2,
			question: tFaq('question2'),
			answer: tFaq('answer2'),
		},
		{
			id: 3,
			question: tFaq('question3'),
			answer: tFaq('answer3'),
		},
		{
			id: 4,
			question: tFaq('question4'),
			answer: tFaq('answer4'),
		},
		{
			id: 5,
			question: tFaq('question5'),
			answer: tFaq('answer5'),
		},
		{
			id: 6,
			question: tFaq('question6'),
			answer: tFaq('answer6'),
		},
		{
			id: 7,
			question: tFaq('question7'),
			answer: tFaq('answer7'),
		},
		{
			id: 8,
			question: tFaq('question8'),
			answer: tFaq('answer8'),
		},
		{
			id: 9,
			question: tFaq('question9'),
			answer: tFaq('answer9'),
		},
		{
			id: 10,
			question: tFaq('question10'),
			answer: tFaq('answer10'),
		},
		{
			id: 11,
			question: tFaq('question11'),
			answer: tFaq('answer11'),
		},
		{
			id: 12,
			question: tFaq('question12'),
			answer: tFaq('answer12'),
		},
		{
			id: 13,
			question: tFaq('question13'),
			answer: tFaq('answer13'),
		},
		{
			id: 14,
			question: tFaq('question14'),
			answer: tFaq('answer14'),
		},
		{
			id: 15,
			question: tFaq('question15'),
			answer: tFaq('answer15'),
		},
	]

	// Toggle function for expanding/collapsing FAQ items
	const toggleItem = (id: number) => {
		setExpandedItems(prev => {
			const newExpandedItems = new Map(prev)
			if (newExpandedItems.has(id)) {
				newExpandedItems.delete(id)
			} else {
				newExpandedItems.set(id, true)
			}
			return newExpandedItems
		})
	}

	return (
		<div className='flex flex-col gap-7 mt-7 mb-3'>
			<p className='font-normal text-[15px] leading-3.5 text-[#14229e] cursor-pointer hover:underline'>
				{tComponents('return')}
			</p>

			<div className='flex flex-col gap-4 mb-4'>
				<h2 className='font-bold text-[14px] leading-3.5 text-[#212529]'>
					FAQ
				</h2>
				<input
					type='text'
					placeholder={tSearch('searchQuestion')}
					className='border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3'
				/>

				<div className='flex flex-col gap-2'>
					{faqItems.map(item => (
						<div
							key={item.id}
							className='border-[0.5px] border-[#1c34ff] rounded-[12px] overflow-hidden'
						>
							<div
								className='flex justify-between items-center p-4 cursor-pointer'
								onClick={() => toggleItem(item.id)}
							>
								<h3 className='text-[14px] leading-[120%] text-[#212529]'>
									{item.question}
								</h3>
								<button className='text-[18px] text-[#14229e] w-6 h-6 flex items-center justify-center'>
									{expandedItems.has(item.id) ? '×' : '+'}
								</button>
							</div>

							{/* Блок ответа всегда рендерится, но управляется через класс */}
							<div
								className={`faq-answer ${
									expandedItems.has(item.id) ? 'expanded' : ''
								}`}
							>
								<div className='p-4 pt-0 text-[13px] font-light leading-5 bg-[#f8f9fd] whitespace-pre-line'>
									{item.answer}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Faq
