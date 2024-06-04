"use client";
import React, { useState } from "react";
import CloseIcon from "../Icons/CloseIcon";
import CalenderIcon from "../Icons/CalenderIcon";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { EyeIcon } from "../Icons/EyeIcon";
import AddressesIcon from "../Icons/AddressesIcon";
import ChevronIcon from "../chat/ChevronIcon";
import HeartIcon from "../Icons/HeartIcon";
import { CheckIcon } from "../Icons/CheckIcon";
import CardIcon from "../Icons/CardIcon";
import { GlobalIcon } from "../Icons/GlobalIcon";
import { EditIcon } from "./../Icons/EditIcon";
import { UserPlusIcon } from "../Icons/UserPlusIcon";
import { HeadPhone } from "../Icons/HeadPhone";
import { ListIcon } from "../Icons/ListIcon";
import PowerIcon from "../Icons/PowerIcon";
import { logout } from "@/app/api/supabase/auth";
import { ConfirmAction } from "../global/ConfirmAction";
import { ScissorsIcon } from "../Icons/ScissorsIcon";

const Camera = "https://kadinle.com/media/images/camera.svg";
const choose = "https://kadinle.com/media/images/choose.svg";
const chooseYes = "https://kadinle.com/media/images/chooseYes.svg";

const optionsList = [
  {
    title: "All_my_Orders",
    icon: <ListIcon className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/orders.svg",
    tabNumber: 1,
  },
  {
    title: "return_orders",
    icon: <CloseIcon className="w-5 h-5 text-inherit" />,
    // img: "",
    tabNumber: 2,
  },
  {
    title: "reports",
    icon: <CalenderIcon className="w-5 h-5 text-inherit" />,
    // img: "",
    tabNumber: 3,
  },
  {
    title: "My_Favourites",
    icon: <HeartIcon className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/Favourites.svg",
    tabNumber: 4,
  },
  {
    title: "My_Points",
    icon: (
      <button className="border-2 rounded-full flex items-center justify-center border-gray-400 h-5 w-5 group-hover:border-white">
        <CheckIcon className="w-4 h-4 text-inherit stroke-2" />
      </button>
    ),
    // img: "https://kadinle.com/media/images/points.svg",
    tabNumber: 5,
  },
  {
    title: "My_Wallet",
    icon: <CardIcon className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/wallet.svg",
    tabNumber: 6,
  },
  {
    title: "Country",
    icon: <GlobalIcon className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/country.svg",
    tabNumber: 7,
  },
  {
    title: "My_Addresses",
    icon: <AddressesIcon className="w-5 h-5 text-inherit" />,
    // img: "",
    tabNumber: 8,
  },
  {
    title: "Invite_friend",
    icon: <UserPlusIcon className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/invite.svg",
    tabNumber: 9,
  },
  {
    title: "Suggestion",
    icon: <EditIcon className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/suggest.svg",
    tabNumber: 10,
  },
  {
    title: "Customer_Support",
    icon: <HeadPhone className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/support.svg",
    tabNumber: 11,
  },
  {
    title: "control_view",
    icon: <EyeIcon className="w-5 h-5 text-inherit" />,
    // img: "",
    tabNumber: 12,
  },
  {
    title: "kadinle_tailor",
    icon: <ScissorsIcon className="w-5 h-5 text-inherit" />,
    // img: "",
    tabNumber: 14,
  },
];

// Logout

export const ProfileList = ({ activeTab, setActiveTab }) => {
  const t = useTranslations();
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  const handleLogout = async () => {
    await logout();

    if (typeof window !== "object") return;
    window.location.pathname = "/";
  };

  return (
    <>
      <ConfirmAction
        open={openConfirmLogout}
        onCancel={() => setOpenConfirmLogout(false)}
        onConfirm={handleLogout}
        title={t("logout")}
        msg={t("confirm_logout")}
        btnConfirmLabel={t("yes")}
      />

      <ul className="mb-20 ">
        {optionsList?.map((item, index) => (
          <li
            key={item?.title}
            onClick={(e) => setActiveTab(item?.tabNumber)}
            className={`${
              index === 8 ? "mt-10" : ""
            } flex justify-between capitalize shadow cursor-pointer group hover:bg-primary hover:text-white items-center p-2 border-b w-full ${
              activeTab === 12
                ? "bg-primary text-owhite"
                : "bg-owhite text-black"
            }`}
          >
            <span className="flex gap-5  w-full items-center">
              {item?.icon ? item?.icon : null}
              {/* {item?.img ? (
              <Image
                src={item?.img}
                alt={t(item?.title)}
                height={24}
                width={24}
              />
            ) : null} */}
              {t(item?.title)}
            </span>
            <Image
              className="object-contain rtl:rotate-180"
              src="https://kadinle.com/media/images/choose.svg"
              height={20}
              width={20}
              alt="choose"
            />
            {/* <span className="h-4 w-4 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 group-hover:bg-white group-hover:!text-primary">
            <ChevronIcon className="stroke-2 w-3 h-3 text-inherit ltr:rotate-180" />
          </span> */}
          </li>
        ))}
        <button
          onClick={() => setOpenConfirmLogout(true)}
          className={`flex gap-5 shadow bg-white cursor-pointe text-red-500 font-medium items-center p-2 border-b w-full`}
        >
          <PowerIcon className="text-red-500 h-6 w-6" />
          {t("Logout")}
        </button>
      </ul>
    </>
  );
};
