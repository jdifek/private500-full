"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<null | boolean>(null);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(email ? emailRegex.test(email) : null);
  }, [email]);

  const getBorderColor = (isValid: boolean | null) => {
    if (isValid === null) return "border-[#8b8b8b]";
    return isValid ? "border-[#7FFF00]" : "border-[#FF0000]";
  };

  const isFormValid = isEmailValid;
  const buttonColor = isFormValid
    ? "bg-[#007BFF] cursor-pointer"
    : "bg-[#aaaaab] cursor-not-allowed";

  return (
    <>
      <h2 className="my-5 font-medium text-[36px] text-center text-black">
        Забыли пароль?
      </h2>

      {/* Поля ввода */}
      <div className="flex gap-2 flex-col mb-2">
        <p className=" font-normal text-[12px] leading-[167%] text-[#383838]">
          Введите e-mail или номер телефона и мы отправим ссылку для сброса
          пароля
        </p>
        <input
          type="text"
          placeholder="Введите ваш e-mail или номер телефона"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all
            placeholder:text-[13px] placeholder:leading-[162%] 
            placeholder:font-light placeholder:text-[#929294] placeholder:lowercase
            ${getBorderColor(isEmailValid)}`}
        />
      </div>

      <button
        className={`border-0 mt-10 text-white mb-3 rounded-[23px] p-[8px] w-full h-[46px] transition-all ${buttonColor}`}
        disabled={!isFormValid}
      >
        отправить
      </button>

      <p className="text-center text-[13px] mb-5 font-normal text-[#929294] flex flex-col">
        <span> Продолжая, вы соглашаетесь с нашей</span>
        <span className="text-black">политикой конфиденциальности</span>
      </p>

      <p className="text-center mb-2 text-[13px] leading-[154%] font-normal text-[#929294] ">
        Войти с помощью
      </p>

      <div className="mb-5 flex gap-3 justify-center">
        <Image src="/Google2.svg" alt="Google" width={70} height={70} />
        <Image src="/Vk2.svg" alt="Vk2" width={70} height={70} />
      </div>

      <p className="text-center text-[13px] mb-7 leading-[154%] font-normal text-[#929294]">
        Нет аккаунта? <span className="text-black">Зарегистрироваться</span>
      </p>
    </>
  );
};

export default ForgotPassword;
