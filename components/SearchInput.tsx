'use client';

import { useTranslations } from 'next-intl';

export default function SearchInput() {
  const t = useTranslations('Search');

  return (
    <div className="px-4">
      <div className="bg-[#1B34FF]/5 rounded-xl p-3 flex items-center gap-2">
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 14 14" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-label={t('searchIcon')}
        >
          <path d="M13 13L9 9M10.5 5.5C10.5 8.26142 8.26142 10.5 5.5 10.5C2.73858 10.5 0.5 8.26142 0.5 5.5C0.5 2.73858 2.73858 0.5 5.5 0.5C8.26142 0.5 10.5 2.73858 10.5 5.5Z" stroke="#AAAAAB" strokeWidth="1.5"/>
        </svg>
        <input 
          type="text"
          placeholder={t('searchPlaceholder')}
          className="w-full bg-transparent text-[#929293] placeholder-[#929293] focus:outline-none"
        />
      </div>
    </div>
  );
} 