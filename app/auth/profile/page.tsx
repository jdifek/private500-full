const Profile = () => {
  const buttons = [
    {
      title: "Покупки",
      img: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="4" fill="#F03D00" />
          <path d="M15.3333 5.33325H4V6.88881H15.3333V5.33325Z" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.70801 13.1109C4.70801 13.9704 5.34267 14.6665 6.12467 14.6665H13.208C13.9907 14.6665 14.6247 13.9704 14.6247 13.1109V7.6665H4.70801V13.1109ZM8.23551 9.19017H11.1269V10.0488H8.23551V9.19017Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      title: "Купоны",
      img: (
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
      ),
    },
    {
      title: "Чат-бот",
      img: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1_1846)">
            <path
              d="M17 0H3C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H17C18.6569 20 20 18.6569 20 17V3C20 1.34315 18.6569 0 17 0Z"
              fill="#37AEE2"
            />
            <path
              d="M7.2108 12.1147C6.77375 12.184 6.79891 12.0857 6.64329 11.8746L4.9894 9.66101L14.1991 4.80737"
              fill="#C8DAEA"
            />
            <path
              d="M7.06976 12.1372C7.29871 12.1212 7.42625 12.0651 7.5865 12.0067L9.02303 11.3992L7.16354 11.1282"
              fill="#A9C9DD"
            />
            <path
              d="M7.45938 11.5095L12.6757 15.6184C13.2167 15.992 13.6804 15.7845 13.8349 15.0374L15.9601 4.32919C16.1533 3.41609 15.6124 3.00104 15.0328 3.29157L2.62942 8.43815C1.81799 8.77018 1.81799 9.30974 2.47486 9.51727L5.68196 10.5964L13.0235 5.57433C13.3713 5.3668 13.6804 5.44981 13.4485 5.74035"
              fill="#F6FBFE"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_1846">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Настройки",
      img: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="4" fill="black" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.3324 11.5556C9.29768 11.5556 8.45939 10.7101 8.45939 9.66667C8.45939 8.62324 9.29768 7.77778 10.3324 7.77778C11.3672 7.77778 12.2058 8.62324 12.2058 9.66667C12.2058 10.7101 11.3672 11.5556 10.3324 11.5556ZM15.6243 11.0025L14.7467 10.4917C14.7959 10.2235 14.8284 9.94962 14.8284 9.66667C14.8284 9.38409 14.7959 9.10983 14.7467 8.8416L15.6243 8.33084C15.9828 8.12231 16.1052 7.65991 15.8982 7.29875L15.1491 5.99014C14.9424 5.62898 14.4838 5.50469 14.1257 5.7136L13.239 6.22927C12.825 5.87416 12.3543 5.58364 11.8311 5.39664V4.75556C11.8311 4.33849 11.4956 4 11.0816 4H9.58328C9.16924 4 8.83377 4.33849 8.83377 4.75556V5.39664C8.31055 5.58364 7.83984 5.87416 7.42579 6.22927L6.53915 5.7136C6.18102 5.50469 5.72239 5.62898 5.51575 5.99014L4.76662 7.29875C4.55959 7.65991 4.68237 8.12231 5.0405 8.33084L5.91808 8.8416C5.86897 9.10983 5.83648 9.38409 5.83648 9.66667C5.83648 9.94962 5.86897 10.2235 5.91808 10.4917L5.0405 11.0025C4.68237 11.211 4.55959 11.6734 4.76662 12.0346L5.51575 13.3432C5.72239 13.7044 6.18102 13.8286 6.53915 13.6197L7.42579 13.1041C7.83984 13.4592 8.31055 13.7501 8.83377 13.9367V14.5778C8.83377 14.9948 9.16924 15.3333 9.58328 15.3333H11.0816C11.4956 15.3333 11.8311 14.9948 11.8311 14.5778V13.9367C12.3543 13.7501 12.825 13.4592 13.239 13.1041L14.1257 13.6197C14.4838 13.8286 14.9424 13.7044 15.1491 13.3432L15.8982 12.0346C16.1052 11.6734 15.9828 11.211 15.6243 11.0025ZM10.3324 8.53333C9.71173 8.53333 9.20853 9.04107 9.20853 9.66667C9.20853 10.2926 9.71173 10.8 10.3324 10.8C10.9531 10.8 11.4563 10.2926 11.4563 9.66667C11.4563 9.04107 10.9531 8.53333 10.3324 8.53333Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      title: "Выйти из аккаунта",
      img: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="4" fill="#FF272C" />
          <g clip-path="url(#clip0_1_1871)">
            <path
              d="M6.81667 3C5.27123 3 4 4.27123 4 5.81667V13.1833C4 14.7288 5.27123 16 6.81667 16H10.5342C11.9697 16 13.168 14.903 13.3312 13.5083H11.5711C11.4386 13.956 11.0352 14.2667 10.5342 14.2667H6.81667C6.20151 14.2667 5.73333 13.7985 5.73333 13.1833V5.81667C5.73333 5.20151 6.20151 4.73333 6.81667 4.73333H10.5342C11.0352 4.73333 11.4386 5.04403 11.5711 5.49167H13.3312C13.168 4.09705 11.9697 3 10.5342 3H6.81667Z"
              fill="white"
            />
            <path
              d="M14.332 6.8999C14.2181 6.8999 14.1054 6.92231 14.0003 6.96586C13.8951 7.00941 13.7996 7.07325 13.7191 7.15372C13.6386 7.2342 13.5748 7.32974 13.5312 7.4349C13.4877 7.54005 13.4653 7.65275 13.4653 7.76657C13.4653 7.88039 13.4877 7.99309 13.5312 8.09824C13.5748 8.20339 13.6386 8.29894 13.7191 8.37941L13.9729 8.63324H7.54733C7.31748 8.63324 7.09704 8.72454 6.9345 8.88708C6.77197 9.04961 6.68066 9.27005 6.68066 9.4999C6.68066 9.72976 6.77197 9.9502 6.9345 10.1127C7.09704 10.2753 7.31748 10.3666 7.54733 10.3666H13.9729L13.7191 10.6204C13.6386 10.7009 13.5748 10.7964 13.5312 10.9016C13.4877 11.0067 13.4653 11.1194 13.4653 11.2332C13.4653 11.3471 13.4877 11.4598 13.5312 11.5649C13.5748 11.6701 13.6386 11.7656 13.7191 11.8461C13.7996 11.9266 13.8951 11.9904 14.0003 12.034C14.1054 12.0775 14.2181 12.0999 14.332 12.0999C14.4458 12.0999 14.5585 12.0775 14.6636 12.034C14.7688 11.9904 14.8643 11.9266 14.9448 11.8461L16.5219 10.2689C16.6648 10.1973 16.785 10.0875 16.8694 9.95181C16.9537 9.81609 16.9989 9.65969 16.9999 9.4999C16.9997 9.33766 16.954 9.17874 16.8679 9.04121C16.7818 8.90368 16.6589 8.79307 16.5131 8.72198L14.9448 7.15372C14.8643 7.07325 14.7688 7.00941 14.6636 6.96586C14.5585 6.92231 14.4458 6.8999 14.332 6.8999Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_1871">
              <rect
                width="13"
                height="13"
                fill="white"
                transform="translate(4 3)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className=" border-0 bg-gray-400 w-16 h-16 rounded-full m-auto mt-5"></div>
      <p className="font-light text-[12px] leading-[108%] text-center text-[#383838] mt-2 mb-1">
        Don-Vip ID: 6758797
      </p>
      <p className="font-normal text-[18px] leading-[72%] text-center text-[#000] mb-8">
        Винсент Вега
      </p>

      <ul className="">
        {buttons.map((button, index) => (
          <li key={index} className="flex gap-2 mb-2">
            <div className="border-0 border-[#8b8b8b] rounded-[8px] flex gap-2 items-center p-[8px_16px] w-full h-[36px] bg-[#f3f4f7]">
              {button.img}
              <p className="font-normal text-[14px] leading-[93%] text-center text-[#000]">
                {button.title}
              </p>
            </div>
            <div className="border-0 border-[#8b8b8b] rounded-[8px] p-[8px_16px] flex items-center justify-center h-[36px] bg-[#f3f4f7]">
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.43359 0.923584L7.57799 6.99997L1.43359 13.0764"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Profile;
