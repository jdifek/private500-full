'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

interface SearchInputProps {
	onSearchChange: (value: string) => void
}

export default function SearchInput({ onSearchChange }: SearchInputProps) {
	const t = useTranslations('Search')
	const [searchTerm, setSearchTerm] = useState<string>('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchTerm(value)
		if (typeof onSearchChange === 'function') {
			onSearchChange(value)
		}
	}

	return (
		<div className='px-4'>
			<div className='bg-[#1B34FF]/5 rounded-xl p-3 flex items-center gap-2'>
				<Image
					src='/icon-search.svg'
					alt='icon search'
					width={14}
					height={14}
				/>
				<input
					type='text'
					placeholder={t('searchPlaceholder')}
					value={searchTerm}
					onChange={handleInputChange}
					className='w-full bg-transparent text-[#929293] placeholder-[#929293] placeholder:text-[13px] placeholder:font-light placeholder:leading-5 focus:outline-none'
				/>
			</div>
		</div>
	)
}
