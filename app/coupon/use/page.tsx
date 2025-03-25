"use client";
import { useState } from "react";

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState("");
  const [gameFound, setGameFound] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleApplyClick = () => {
    if (promoCode === "MLBB75353945") {
      setGameFound(true);
    } else {
      setGameFound(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-7 mt-7 mb-3 ">
        <p className="font-normal text-[15px] leading-[87%] text-[#14229e]">
          Вернуться
        </p>
        <div className="flex gap-1 items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="20" height="20" rx="4" fill="#1C34FF" />
            <path
              d="M14.8265 13.2642L15.7842 12.3079C16.1625 11.9302 16.1658 11.3212 15.7918 10.9477L9.12656 4.29253C8.7525 3.91901 8.1426 3.92237 7.76433 4.30008L6.80019 5.26276C7.09417 5.65605 7.06057 6.21816 6.69899 6.57919C6.33741 6.94023 5.77443 6.97381 5.38068 6.68015L4.41642 7.64296C4.03827 8.02053 4.0349 8.62953 4.40897 9.00303L11.0742 15.6582C11.4482 16.0317 12.0582 16.0284 12.4363 15.6508L13.3942 14.6944C13.0356 14.3008 13.049 13.6885 13.434 13.3041C13.819 12.9198 14.4322 12.9064 14.8265 13.2642ZM6.06714 9.79578L5.83411 9.5631L6.44863 8.94951L6.68166 9.18219L6.06714 9.79578ZM7.14678 8.71777L6.91375 8.48509L7.52824 7.87151L7.76128 8.10419L7.14678 8.71777ZM8.22638 7.63979L7.99335 7.40711L8.60799 6.79339L8.84102 7.02607L8.22638 7.63979ZM9.30598 6.56181L9.07295 6.32912L9.68746 5.71553L9.9205 5.94821L9.30598 6.56181Z"
              fill="#F6FBFE"
            />
          </svg>
          <p className="font-bold text-[14px] leading-[93%] text-center text-[#000]">
            Купоны
          </p>
        </div>
      </div>

      {/* Applied Promo Code Section */}
      <div className="bg-[#f3f4f7] -mx-4 px-4 py-4 mt-4">
        <div className="flex w-full rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            placeholder="MLBB75353945"
            className={`flex-grow ${
              gameFound ? "border-green-500" : "border-gray-300"
            } bg-[#E9E9E9] rounded-l-lg py-3 px-4 text-sm outline-none`}
            value={promoCode}
            onChange={handleInputChange}
          />
          <button
            disabled={!promoCode}
            onClick={handleApplyClick}
            className={`${
              promoCode.length > 0 ? "bg-[#1C34FF]" : " bg-[#8B8B8B]"
            }  text-white rounded-lg px-5 py-3 text-sm font-medium`}
          >
            Применить
          </button>
        </div>

        {/* Display game info if found */}
        {gameFound && (
          <div className="bg-white rounded-lg p-3 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#333] flex-shrink-0"></div>
            <div>
              <p className="text-[#1C34FF] text-sm font-medium">
                Mobile Legends: Bang Bang
              </p>
              <p className="font-bold text-sm">
                Скидка: <span className="font-bold">10%</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Внимание! Минимальная сумма для покупки составляет 1 000 рублей
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PromoCode;
