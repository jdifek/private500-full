'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const games = [
  {
    id: 1,
    name: 'Bigo Live',
    image: '/images/games/bigo.png'
  },
  {
    id: 2,
    name: 'Mobile Legends: Bang Bang',
    image: '/images/games/mlbb.png'
  },
  {
    id: 3,
    name: 'Genshin Impact',
    image: '/images/games/genshin.png'
  },
  {
    id: 4,
    name: 'The Walking Dead',
    image: '/images/games/walking-dead.png'
  },
  {
    id: 5,
    name: 'Watcher of Realms',
    image: '/images/games/watcher.png'
  },
  {
    id: 6,
    name: 'Arena Breakout',
    image: '/images/games/arena.png'
  },
  {
    id: 7,
    name: 'Street Fighter: Duel',
    image: '/images/games/street-fighter.png'
  }
];

export default function SuggestedGames() {
  const t = useTranslations('Search');

  return (
    <div className="mt-6 px-4">
      <h2 className="text-lg font-medium mb-4">{t('suggestedGames')}</h2>
      <div className="space-y-4">
        {games.map((game) => (
          <div 
            key={game.id}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="relative w-7 h-7 rounded-md overflow-hidden">
              <Image
                src={game.image}
                alt={game.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[#1B34FF] text-sm">{game.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 