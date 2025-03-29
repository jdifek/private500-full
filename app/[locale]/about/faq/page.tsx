"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Confidentiality = () => {
  const t = useTranslations("About.confidentiality");
  const tComponents = useTranslations("Components");

  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState(new Map());

  // Toggle function for expanding/collapsing FAQ items
  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newExpandedItems = new Map(prev);
      if (newExpandedItems.has(id)) {
        newExpandedItems.delete(id);
      } else {
        newExpandedItems.set(id, true);
      }
      return newExpandedItems;
    });
  };

  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "У меня выходит ошибка оплаты. Что делать?",
      answer:
        "Если у вас возникает ошибка во время оплаты, пожалуйста, обратитесь в службу поддержки и уточните, о какой игре идет речь, какой способ оплаты вы выбрали, а также прикрепите скриншот ошибки и игровые данные (айди/почта).",
    },
    {
      id: 2,
      question: "Что делать, если я ввел неправильный UID?",
      answer:
        "Если вы заметили ошибку до оплаты — просто вернитесь и введите правильный ID.\nЕсли уже оплатили — срочно свяжитесь с поддержкой:\n\nTelegram: @davo_dior55\nWhatsApp: +7 (924) 004 0070\nE-mail: hoyakap@gmail.com\nЧем быстрее вы напишете, тем выше шанс скорректировать заказ до отправки.",
    },
    {
      id: 3,
      question: "Могу ли я отменить или вернуть заказ?",
      answer:
        "После оплаты и подтверждения транзакции заказ считается завершённым, и возврат не осуществляется. Однако, если заказ был оформлен с ошибкой — свяжитесь с поддержкой. Мы постараемся помочь в рамках возможного.",
    },
    {
      id: 4,
      question: "Что делать, если заказ в \"обработке\"?",
      answer:
        "Такой статус означает, что мы получили ваш платёж, и он обрабатывается. Если прошло более 30 минут, и алмазы не поступили, свяжитесь с нами — мы проверим.",
    },
    {
      id: 5,
      question: "Что делать, если платёж прошёл, но алмазы не пришли?",
      answer:
        "Убедитесь, что вы правильно указали ID.\nПроверьте статус заказа в личном кабинете.\nСвяжитесь с поддержкой и приложите:\n\n- Скриншот оплаты\n- Ваш Bigo Live ID\n- E-mail, указанный при заказе.",
    },
    {
      id: 6,
      question: "Что такое алмазы Bigo Live и для чего они нужны?",
      answer:
        "Алмазы — это виртуальная валюта внутри приложения Bigo Live, с помощью которой можно:\n\n- Отправлять подарки любимым стримерам во время трансляций.\n- Получать доступ к эксклюзивным функциям и событиям.\n- Повышать уровень аккаунта и взаимодействие с другими пользователями.",
    },
    {
      id: 7,
      question: "Как пополнить счёт Bigo Live на вашем сайте?",
      answer:
        "1. Выберите нужный пакет алмазов.\n2. Перейдите к оформлению заказа.\n3. Укажите данные: Bigo Live ID (внимательно!).\n4. Подтвердите правильность ввода данных.\n5. Выберите способ оплаты.\n6. Завершите оплату и дождитесь подтверждения.\n7. Алмазы автоматически зачислятся на ваш аккаунт после обработки.",
    },
    {
      id: 8,
      question: "Где найти свой Bigo Live ID?",
      answer:
        "1. Откройте приложение Bigo Live.\n2. Перейдите в раздел \"Я\" (профиль).\n3. Под ником будет указан ваш ID.\n\nВажно: Вводите только цифры, без префикса \"ID:\". Например: 100123456.",
    },
    {
      id: 9,
      question: "Как быстро доставляются алмазы?",
      answer:
        "После успешной оплаты алмазы обычно поступают на аккаунт в течение нескольких минут. В редких случаях доставка может занять до 30 минут. Если прошло больше времени — напишите в поддержку.",
    },
    {
      id: 10,
      question: "Какие способы оплаты доступны?",
      answer:
        "Мы поддерживаем множество удобных методов:\n\n- Банковские карты (Visa, MasterCard, UnionPay).",
    },
    {
      id: 11,
      question: "Безопасно ли заказывать у вас?",
      answer:
        "Да! DON-VIP — официальный авторизованный реселлер алмазов Bigo Live. Мы используем защищенные платежные шлюзы и гарантируем безопасность транзакций.",
    },
    {
      id: 12,
      question: "Как доставляются продукты, приобретенные у вас?",
      answer:
        "Процесс выглядит следующим образом:\n\n1. Клиент оплачивает продукт.\n2. Платёж отправляется на сервер банка или приложения.\n3. Банк подтверждает нам получение платежа.\n4. Мы уведомляем разработчика вашей игры/приложения о том, что заказ оплачен, и вы получаете свой продукт.",
    },
    {
      id: 13,
      question: "Сколько по времени доставляется заказ?",
      answer:
        "Время доставки зависит от выбранного платёжного канала. Некоторые методы оплаты могут обрабатываться мгновенно, в то время как другие могут занимать больше времени. Пожалуйста, ознакомьтесь с информацией о времени обработки для выбранного вами способа оплаты.",
    },
    {
      id: 14,
      question: "У вас есть бот-помощник?",
      answer:
        "Да! У нас работает цифровой помощник DON-VIP Assist, который:\n\n- Подскажет, как оформить заказ.\n- Поможет с выбором пакета.\n- Быстро решит распространённые проблемы.\n- Направит в поддержку, если нужно.\n\nЧтобы начать — просто напишите нам в Telegram: @davo_dior55.",
    },
    {
      id: 15,
      question: "Как связаться с поддержкой?",
      answer:
        "Вы можете обратиться в поддержку через:\n\n- E-mail: hoyakap@gmail.com\n- Telegram: @davo_dior55\n- WhatsApp: +7 (924) 004 0070\n\nТакже доступен помощник на сайте.",
    },
  ];
  

  return (
    <div className="flex flex-col gap-7 mt-7 mb-3">
      <p className="font-normal text-[15px] leading-[87%] text-[#14229e] cursor-pointer hover:underline">
        {tComponents("return")}
      </p>

      <div className="flex flex-col gap-4 mb-4">
        <h2 className="font-bold text-[14px] leading-[120%] text-[#212529]">
          FAQ
        </h2>
        <input
          type="text"
          placeholder="Поиск вопроса"
          className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3"
        />

        <div className="flex flex-col gap-2">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border-[0.5px] border-[#1c34ff] rounded-[12px] overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="text-[14px] leading-[120%] text-[#212529]">
                  {item.question}
                </h3>
                <button className="text-[18px] text-[#14229e] w-6 h-6 flex items-center justify-center">
                  {expandedItems.has(item.id) ? "×" : "+"}
                </button>
              </div>

              {expandedItems.has(item.id) && (
                <div className="p-4 pt-0 text-[14px] bg-[#f8f9fd] whitespace-pre-line">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Confidentiality;
