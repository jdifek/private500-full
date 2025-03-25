import React from 'react';
import Image from 'next/image'; // Предполагаю, что ты используешь Next.js
import { Swiper, SwiperSlide } from 'swiper/react'; // Импортируем Swiper и SwiperSlide
import { Pagination, Autoplay } from 'swiper/modules'; // Импортируем модули для пагинации и автоплея

// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const PromotionSlider = () => {
  // Массив с изображениями для слайдера (замени на свои пути)
  const slides = [
    '/maxresdefault (15) 1.png',
    '/maxresdefault (15) 1.png', // Добавь свои изображения
    '/maxresdefault (15) 1.png',
  ];

  return (
    <div className="-mx-3 w-[100vw] mt-7 flex justify-center">
      <Swiper
        modules={[Pagination, Autoplay]} // Подключаем модули
        spaceBetween={0} // Расстояние между слайдами
        slidesPerView={1} // Показываем 1 слайд за раз
        pagination={{ clickable: true }} // Включаем пагинацию (точки), кликабельные
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Автоплей каждые 5 секунд
        loop={true} // Зацикливание слайдов
        className="w-[100vw]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide}
              alt={`promotion-${index}`}
              height={80}
              width={70}
              className="w-[100vw] h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PromotionSlider;