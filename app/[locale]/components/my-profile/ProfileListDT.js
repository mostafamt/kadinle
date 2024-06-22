"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CloseIcon from "../Icons/CloseIcon";
import CalenderIcon from "../Icons/CalenderIcon";
import HeartIcon from "../Icons/HeartIcon";
import { CheckIcon } from "../Icons/CheckIcon";
import { ListIcon } from "../Icons/ListIcon";
import CardIcon from "../Icons/CardIcon";
import { GlobalIcon } from "../Icons/GlobalIcon";
import AddressesIcon from "../Icons/AddressesIcon";
import { EditIcon } from "./../Icons/EditIcon";
import { UserPlusIcon } from "../Icons/UserPlusIcon";
import { EyeIcon } from "../Icons/EyeIcon";
import { HeadPhone } from "../Icons/HeadPhone";
import { logout } from "@/app/api/supabase/auth";
import { ChevronIcon } from "../Icons/ChevronIcon";
import PowerIcon from "../Icons/PowerIcon";
import UserIcon from "../Icons/UserIcon";
import { ConfirmAction } from "../global/ConfirmAction";
import { ScissorsIcon } from "../Icons/ScissorsIcon";

const optionsList = [
  {
    title: "Profile_Info",
    icon: <UserIcon className="w-5 h-5 text-inherit" />,
    // img: "https://kadinle.com/media/images/orders.svg",
    tabNumber: 13,
  },
  {
    title: "answer2_1_link",
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

export const ProfileListDT = ({ activeTab, setActiveTab }) => {
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
        title={t("remove_item")}
        msg={t("confirm_remove_item_from_cart")}
        btnConfirmLabel={t("logout")}
      />

      <div className="w-[25%] md:w-[27%] max-w-[280px] text-[11px] text-lg">
        <ul className="flex flex-col space-y-[2px]">
          {optionsList?.map((item, index) => (
            <li
              key={item?.title}
              onClick={(e) => setActiveTab(item?.tabNumber)}
              className={`flex cursor-pointer items-center capitalize ltr:border-l-4 rtl:border-r-4 border-primary rtl:pl-2 ltr:pr-2 ${
                activeTab === item?.tabNumber
                  ? "bg-opink text-owhite"
                  : "bg-owhite text-[#727C8E]"
              }`}
            >
              <span
                className={`flex w-full gap-2 items-center capitalize py-3 px-2 `}
              >
                {item?.icon ? item?.icon : null}

                {t(item?.title)}
              </span>
              {activeTab === item?.tabNumber ? null : (
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-400 group-hover:bg-white group-hover:!text-primary">
                  <ChevronIcon className="w-4 h-4 text-inherit rtl:rotate-90 ltr:-rotate-90" />
                </span>
              )}
            </li>
          ))}
          <button
            onClick={() => setOpenConfirmLogout(true)}
            className={`flex ltr:border-l-4 rtl:border-r-4 border-primary rtl:pl-2 ltr:pr-2 gap-5 shadow cursor-pointe bg-white text-red-500 items-center p-2  w-full`}
          >
            <PowerIcon className="text-red-500 h-6 w-6" />
            {t("Logout")}
          </button>
        </ul>
      </div>
    </>
  );
};
