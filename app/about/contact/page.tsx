const Contact = () => {
  return (
    <>
      <div className="flex flex-col gap-7 mt-7 mb-3">
        {/* Ссылка "Вернуться" */}
        <p className="font-normal text-[15px] leading-[87%] text-[#14229e] cursor-pointer hover:underline">
          Вернуться
        </p>

        {/* Контейнер для контактной информации */}
        <div className="flex flex-col gap-4">
          <h2
            className="font-bold text-[14px] leading-[120%] text-[#212529]"
            style={{ fontFamily: "var(--font3)" }}
          >
            СВЯЗАТЬСЯ С НАМИ
          </h2>

          {/* Контактные данные */}
          <div className="flex flex-col gap-1 text-[15px] leading-[140%] text-[#212529]">
            <p>
              <span className="font-semibold">Email: </span>
              <a
                href="mailto:hoyakap@gmail.com"
                className="text-[#14229e] hover:underline"
              >
                hoyakap@gmail.com
              </a>
            </p>
            <p>
              <span className="font-semibold">For cooperation email: </span>
              <a
                href="mailto:support@don-vip.com"
                className="text-[#14229e] hover:underline"
              >
                support@don-vip.com
              </a>
            </p>
            <p className=" mb-5">
              <span className="font-semibold">Address: </span>
              Russia, Nakhodka city
            </p>
            <p>
              <span className="font-semibold">Company name: </span>
              S.P. Aslanyan David Armenovich
            </p>
            <p>
              <span className="font-semibold">Partner company: </span>
              DMME HK LIMITED
            </p>
            <p>
              <span className="font-semibold">INN: </span>
              250822605454
            </p>
            <p className=" mb-5">
              <span className="font-semibold">OGRNIP: </span>
              3242536000050587
            </p>
            <p>
              <span className="font-semibold">Tel./WhatsApp: </span>
              <a
                href="https://wa.me/+79240040070"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#14229e] hover:underline"
              >
                +7 (924) 004 00 70
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
