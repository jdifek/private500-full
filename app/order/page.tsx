"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

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
];

const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(20);
  const [userId, setUserId] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {/* Баннер */}
      <div className="-mx-3 w-[100vw] flex justify-center">
        <Image
          src={"/Promition banner.png"}
          alt="promotion"
          height={50}
          width={70}
          className="w-[100vw]"
        />
      </div>

      {/* Кнопка "Информация о товаре" */}
      <div className="w-full mt-5">
        <motion.div
          className="w-full bg-blue-600 text-white px-4 pt-3 pb-1 rounded-lg flex flex-col items-center text-center"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ borderRadius: 12 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full flex justify-between items-center cursor-pointer">
            <span className="w-full text-center">информация о товаре</span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden w-full text-center mt-2"
          >
            Bigo live — это глобальная социальная платформа для видео стриминга,
            на которой пользователи проводят трансляции, чтобы показать моменты
            своей жизни, продемонстрировать свои таланты.
          </motion.div>
        </motion.div>
      </div>

      {/* Выбор суммы пополнения */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">
          1 ВЫБЕРИТЕ СУММУ ПОПОЛНЕНИЯ
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {diamonds.map((item) => (
            <button
              key={item.amount}
              className="p-3 rounded-lg text-center relative"
              onClick={() => setSelected(item.amount)}
            >
              <div 
                className={`absolute inset-0 rounded-lg ${
                  selected === item.amount ? "bg-[#f1f1f1]" : "bg-[#f1f1f1]"
                }`}
              ></div>
              
              {selected === item.amount && (
                <div className="absolute top-0 right-0 w-8 h-8">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-t-[#00d057] border-l-[32px] border-l-transparent"></div>
                  <svg 
                    className="absolute top-0 right-0 w-4 h-4 mt-1 mr-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M5 12L10 17L20 7" 
                      stroke="white" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-bold text-black">{item.price} руб</span>
                <span className="text-sm text-black">{item.amount} Diamonds</span>
                {item.amount === 20 && (
                  <div className="mt-1">
                    <Image
                      src="/diamond-icon.svg"
                      width={24}
                      height={24}
                      alt="diamonds"
                      className="w-6 h-6"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%230091ff' d='M12 2L2 12l10 10 10-10L12 2zm0 2.83L19.17 12 12 19.17 4.83 12 12 4.83z'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ввод Bigo Live ID */}
      <div className="mt-6">
        <div className="flex mb-3 items-center justify-between relative">
          <p className="font-bold text-[16px] leading-[62%] text-[#212529]">
            2 ВВЕДИТЕ ВАШ ID (НЕ ВВОДИТЕ «ID:»)
          </p>

          <Image
            src={"/question-mark-in-circular-shape-svgrepo-com 1.svg"}
            alt="question"
            width={25}
            height={25}
            onClick={togglePopup}
          />

          {isPopupOpen && (
            <div className="absolute top-8 right-0 z-10 bg-[#383838] text-white p-4 rounded-lg shadow-lg w-full">
              <div className="flex justify-between items-center mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.8279 6.5C13.8279 7.32843 13.1563 8 12.3279 8C11.4994 8 10.8279 7.32843 10.8279 6.5C10.8279 5.67157 11.4994 5 12.3279 5C13.1563 5 13.8279 5.67157 13.8279 6.5ZM9.479 11H11.1227L10.1053 16.0928C9.91311 17.117 10.3905 18.1506 11.2948 18.6684C12.1658 19.167 13.2529 19.0834 14.0374 18.4574L14.0787 18.4244C14.5521 18.0467 14.874 17.5114 14.9857 16.9162L15.2415 15.5532H13.2066L13.02 16.5473C12.9968 16.6711 12.9298 16.7825 12.8313 16.8611L12.7899 16.8941C12.6465 17.0086 12.4477 17.0239 12.2885 16.9327C12.1231 16.838 12.0359 16.649 12.071 16.4618L13.3107 10.1845C13.3656 9.89206 13.2874 9.5904 13.0974 9.36144C12.9074 9.13248 12.6254 9 12.3279 9H9.979L9.479 11Z"
                    fill="white"
                    fillOpacity="0.8"
                  />
                </svg>
                <button onClick={togglePopup} className="text-white">
                  ✕
                </button>
              </div>
              <p className="text-sm">
                Как правильно ввести ваш ID и номер сервера находиться в личном
                профиле. Эти данные обычно можно найти в разделе «Настройки» или
                «Информация о профиле».
              </p>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="USER ID"
          className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="confirm"
            className="mr-2"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
          />
          <label
            htmlFor="confirm"
            className="font-light text-[11px] leading-[191%] text-black uppercase lowercase"
          >
            ПОДТВЕРЖДАЮ пРАВИЛЬНОСТЬ ВВОДА ДАННЫХ
          </label>
        </div>
      </div>

      <div className="mt-2 mb-5">
        <h3 className="font-bold text-[15px] leading-[133%] text-[#212529] capitalize">
          Где найти <span className="lowercase">bigo live</span>{" "}
          <span className="uppercase">ID</span>?
        </h3>
        <ul className="mb-2 font-normal text-[15px] leading-[147%] text-[#212529]">
          <li>1. Войдите в приложение Bigo Live</li>
          <li>2. Перейдите на страницу Я</li>
          <li>3. Под вашим ником отобразится Bigo Live ID</li>
          <li>4. Скопируйте и введите цифры на сайте</li>
        </ul>

        <Image
          src={"/Screen.png"}
          width={250}
          height={150}
          alt="screen"
        ></Image>
      </div>

      <div className="mb-6">
        <p className="font-bold text-[16px] leading-[62%] text-[#212529] mb-3">
          3 ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ
        </p>

        <div className="border-[0.3px] border-black/13 rounded-[12px] p-3 w-full h-[52px]">
          <div className="flex gap-2 items-center">
            <Image
              src="/Icon pay.svg"
              width={30}
              height={30}
              alt="logo"
            ></Image>
            <p className="font-semibold text-[13px] leading-[162%] text-[#212529] capitalize">
              T-bank (SBP)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;