import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-3">
      <div className="flex items-center justify-between ">
        <Image src="/Logo.svg" width={110} height={60} alt="logo"></Image>
        <Image src="/Icon pay.svg" width={30} height={30} alt="logo"></Image>
      </div>

      <ul className="font-normal text-[13px] leading-[162%] text-[#383838]">
        <li>пользовательское соглашение</li>
        <li>политика обработки данных</li>
        <li>политика возврата</li>
        <li>
          <Link href='/about/contact'>связаться с нами</Link>
        </li>
        <li>FAQ</li>
      </ul>

      <p className=" font-light text-[11px] leading-[191%] text-[#7a7a7a]">
        © Don-Vip.com, 2025. Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
