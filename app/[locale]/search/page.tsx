'use client'

import SearchInput from '@/components/SearchInput'
import SuggestedGames from '@/components/SuggestedGames'
import BottomNavigation from '@/components/BottomNavigation'
import { useState } from 'react'

export default function SearchPage() {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const handleSearchChange = (value: string) => {
		setSearchTerm(value)
	}

	return (
		<div className='min-h-screen'>
			<div className='pt-10 pb-20'>
				<SearchInput onSearchChange={handleSearchChange} />
				<SuggestedGames searchTerm={searchTerm} />
			</div>
			<BottomNavigation />
		</div>
	)
}
