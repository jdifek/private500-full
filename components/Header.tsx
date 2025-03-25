import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex px-2 items-center py-2 justify-between">
      <Image src="/Logo.svg" width={130} height={70} alt="logo"></Image>

      <div className="flex gap-2">
        <Image src="/RU.svg" width={25} height={25} alt="logo"></Image>
        <p>Войти</p>
        <Image src="/VK.svg" width={16} height={16} alt="logo"></Image>
        <Image src="/Google.svg" width={16} height={16} alt="logo"></Image>
      </div>
    </header>
  );
};
