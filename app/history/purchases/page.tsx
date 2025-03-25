"use client";
import { useState } from "react";

const purchasesData = [
  {
    id: "2176672",
    date: "21.03.2025, 14:20",
    price: 92.78,
    status: "delivered",
    items: [{ img: "/icons/item1.png" }, { img: "/icons/currency.png" }],
    userId: "73991789",
    serverId: "63465",
    diamonds: 50,
  },
  {
    id: "2176648",
    date: "21.03.2025, 14:18",
    price: 3711.16,
    status: "in_delivery",
    items: [{ img: "/icons/item2.png" }, { img: "/icons/currency.png" }],
    userId: "512311",
    serverId: "71873",
    diamonds: 2000,
  },
  {
    id: "2176612",
    date: "21.03.2025, 12:30",
    price: 185.56,
    status: "failed",
    items: [{ img: "/icons/item3.png" }, { img: "/icons/currency.png" }],
    userId: "6167823",
    serverId: "4241",
    diamonds: 100,
  },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case "delivered":
      return { text: "Успешная доставка", color: "green", icon: "✅" };
    case "in_delivery":
      return { text: "В доставке", color: "blue", icon: "🚚" };
    case "failed":
      return { text: "Оплата не прошла", color: "red", icon: "❌" };
    default:
      return { text: "Оформлена", color: "gray", icon: "🛒" };
  }
};

const Purchases = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3  mt-7 mb-3">
        <p className="font-normal text-[15px] leading-[87%] text-[#14229e]">
          Вернуться
        </p>
        <div className="flex gap-1 items-center mb-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="20" height="20" rx="4" fill="#F03D00" />
            <path
              d="M15.3333 5.33325H4V6.88881H15.3333V5.33325Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.70801 13.1109C4.70801 13.9704 5.34267 14.6665 6.12467 14.6665H13.208C13.9907 14.6665 14.6247 13.9704 14.6247 13.1109V7.6665H4.70801V13.1109ZM8.23551 9.19017H11.1269V10.0488H8.23551V9.19017Z"
              fill="white"
            />
          </svg>
          <p className="font-bold text-[14px] leading-[93%] text-center text-[#000]">
            Покупки
          </p>
        </div>
      </div>
      {purchasesData.map((purchase) => {
        const isOpen = selectedId === purchase.id;
        const statusInfo = getStatusInfo(purchase.status);

        return (
          <div
            key={purchase.id}
            className="mb-4 border p-4 rounded-lg bg-gray-100"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setSelectedId(isOpen ? null : purchase.id)}
            >
              <div className="flex gap-2">
                {purchase.items.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    alt="item"
                    className="w-6 h-6"
                  />
                ))}
                <p className="text-blue-600 underline">
                  Покупка #{purchase.id}
                </p>
              </div>
              <span className="text-gray-600">{purchase.date}</span>
            </div>

            {isOpen && (
              <div className="mt-2 p-2 bg-white rounded-lg shadow-sm">
                <p className={`text-${statusInfo.color}-600 font-medium`}>
                  {statusInfo.icon} {statusInfo.text}
                </p>
                <p>
                  <strong>Игрок ID:</strong> {purchase.userId}
                </p>
                <p>
                  <strong>Сервер ID:</strong> {purchase.serverId}
                </p>
                <p>
                  <strong>Diamonds:</strong> {purchase.diamonds}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-bold">{purchase.price} ₽</p>
              <span>{statusInfo.icon}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Purchases;
