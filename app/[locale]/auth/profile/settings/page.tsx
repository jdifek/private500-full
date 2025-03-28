"use client";
import $api from "@/app/http";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const tAuth = useTranslations("Auth");
  const router = useRouter();
  const tComponents = useTranslations("Components");

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [gender, setGender] = useState("Мужской");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("accessToken");
        const response = await $api.post("/auth/me", { accessToken });

        const user = response.data.user;
        setUserData(user);
        setName(user.name || "");
        setSecondName(user.secondName || "");
        setGender(user.sex || "Мужской");
        setBirthDate(user.birthDate || "");
        setPhone(user.phone || "");
        setEmail(user.email || "");
      } catch (err: any) {
        setError(err.response?.data?.error || tAuth("fetchProfileFailed"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [tAuth, router]);

  const handleSave = async (userId: string) => {
    try {
      setError(null);
      const accessToken = localStorage.getItem("accessToken");
      const updatedUserData = {
        name,
        secondName,
        sex: gender === "Женский" ? "FEMALE" : "MALE",  // Меняем gender на sex
        birthDate,
        phoneNumber: phone, // Меняем phone на phoneNumber
        email,
      };

      // Отправляем запрос на обновление данных
      const response = await $api.patch(`/users/${userId}`, {
        accessToken,
        updatedUserData,
      });

      if (response.status === 200) {
        setUserData(response.data.user);
        setError(null);
        alert(tComponents("profileUpdated"));
      }
    } catch (err: any) {
      setError(err.response?.data?.error || tAuth("updateFailed"));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">{tAuth("loading")}</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="border-0 bg-gray-400 w-16 h-16 rounded-full m-auto mt-5"></div>
      <p className="text-center text-gray-600 mt-2">
        Don-Vip ID: {userData?.id || "N/A"}
      </p>
      <p className="text-center text-xl font-semibold mb-6">
        {name} {secondName}
      </p>

      <label>Имя</label>
      <input
        type="text"
        className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Фамилия</label>
      <input
        type="text"
        className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3"
        value={secondName}
        onChange={(e) => setSecondName(e.target.value)}
      />

      <label>Пол</label>
      <select
        className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="MALE">MALE</option>
        <option value="FEMALE">FEMALE</option>
      </select>

      <label>Дата рождения</label>
      <input
        type="date"
        className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />

      <label>Телефон</label>
      <input
        type="tel"
        className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <label>Электронная почта</label>
      <input
        type="email"
        className="border-0 rounded-[12px] p-[8px] w-full h-[40px] bg-[#f3f4f7] transition-all mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="bg-sky-500 text-white p-2 px-4 w-full rounded-lg mt-3"
        onClick={() => handleSave(userData?.id)}
        >
        Сохранить
      </button>
    </div>
  );
};

export default Profile;
