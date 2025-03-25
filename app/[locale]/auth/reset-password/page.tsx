import Image from "next/image";

const RegisterSuccess = () => {
  return (
    <div className="rounded-[12px] px-[20px]  py-[108px] w-full flex-col items-center flex justify-center mt-9  bg-[#f3f4f7]">
      <Image src="/Pic.svg" height={150} width={150} alt="pic"></Image>

      <p className="text-center text-[14px] font-normal leading-[93%] text-black mb-3 mt-5">
        Запрос на сброс пароля принят
      </p>
      <p className="text-center text-[13px] font-light leading-[92%] text-[#383838]">
        Ссылка для сброса пароля отправлена на вашу почту mail@gmail.com
      </p>
    </div>
  );
};

export default RegisterSuccess;
