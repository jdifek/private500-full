'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function BottomNavigation() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  // Получаем текущую локаль из пути
  const locale = pathname.split('/')[1];
  
  // Определяем активный элемент на основе пути с учетом локали
  const isHomeActive = pathname === `/${locale}`;
  const isProfileActive = pathname.startsWith(`/${locale}/auth/profile`);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[46px] bg-[#F3F4F7] border-t border-black/20">
      <div className="flex justify-between items-center h-full px-[60px]">
        <Link 
          href={`/${locale}`}
          className={`flex items-center justify-center w-[18px] h-[18px] ${
            isHomeActive ? 'text-[#1B34FF]' : 'text-[#AAAAAB]'
          }`}
          aria-label={t('home')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0L0 9H2V18H8V12H10V18H16V9H18L9 0Z" fill="currentColor"/>
          </svg>
        </Link>

        <Link 
          href={`/${locale}/search`}
          className={`flex items-center justify-center w-[18px] h-[18px] ${
            pathname === `/${locale}/search` ? 'text-[#1B34FF]' : 'text-[#AAAAAB]'
          }`}
          aria-label={t('search')}
        >
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 16.5L12.5 12.5M14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </Link>

        <Link 
          href={`/${locale}/auth/profile`}
          className={`flex items-center justify-center w-[18px] h-[18px] ${
            isProfileActive ? 'text-[#1B34FF]' : 'text-[#AAAAAB]'
          }`}
          aria-label={t('profile')}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 9C11.25 9 13 7.25 13 5C13 2.75 11.25 1 9 1C6.75 1 5 2.75 5 5C5 7.25 6.75 9 9 9ZM9 11C6.25 11 1 12.25 1 15V17H17V15C17 12.25 11.75 11 9 11Z" fill="currentColor"/>
          </svg>
        </Link>
      </div>
    </div>
  );
} 