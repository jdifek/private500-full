import Image from "next/image";

const RegisterSuccess = () => {
  return (
    <div className="rounded-[12px] px-[20px] pt-4 py-[108px] w-full flex-col items-center flex mb-3 justify-center mt-9 h-[443px] bg-[#f3f4f7]">
      <Image src="/Pic.svg" height={150} width={150} alt="pic"></Image>

      <p className="text-center text-[14px] font-normal leading-[93%] text-black mb-3 mt-5">
        Благодарим за регистрацию
      </p>
      <p className="text-center text-[13px] font-light leading-[92%] text-[#383838]">
  Ссылка для активации профиля отправлена на вашу почту mail@gmail.com
</p>

    </div>
  );
};

export default RegisterSuccess;
