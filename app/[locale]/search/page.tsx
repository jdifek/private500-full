'use client';

import { useTranslations } from 'next-intl';
import SearchInput from '@/components/SearchInput';
import SuggestedGames from '@/components/SuggestedGames';
import BottomNavigation from '@/components/BottomNavigation';

export default function SearchPage() {
  const t = useTranslations('Search');

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="pt-10 pb-20">
        <SearchInput />
        <SuggestedGames />
      </div>
      <BottomNavigation />
    </div>
  );
} 