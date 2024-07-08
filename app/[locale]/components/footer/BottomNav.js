"use client";
import React, { useContext, useState } from "react";

import ChatModal from "../chat/ChatModal";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

const BottomNav = () => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      {openChat ? <ChatModal setOpenChat={setOpenChat} /> : null}
      <div className="flex justify-center w-full fixed h-[70px] z-20  bottom-0 ltr:left-0 rtl:right-0  bg-owhite py-2 ">
        <div className=" flex justify-between w-[90%] xs:max-w-[400px] items-start">
          <Link
            href="/"
            className="flex flex-col flex-1  items-center h-[100%] justify-between"
          >
            <Image
              className="w-[20px] mt-auto mb-2"
              src={"https://kadinle.com/media/images/Home.svg"}
              alt="home"
              width={20}
              height={20}
            />
            <span className="whitespace-nowrap text-[11px] text-[#727C8E] capitalize">
              {t("home")}
            </span>
          </Link>

          <Link
            href="/categories"
            className="flex flex-col flex-1  items-center h-[100%] justify-between"
          >
            <Image
              className="w-[20px] mt-auto mb-2"
              src="https://kadinle.com/media/images/category.svg"
              alt="category"
              width={20}
              height={20}
            />
            <span className="whitespace-nowrap text-[11px] text-[#727C8E] capitalize">
              {t("categories")}
            </span>
          </Link>

          <button
            onClick={() => setOpenChat(true)}
            className="flex flex-col flex-1  items-center h-[100%] justify-between relative"
          >
            <Image
              className="w-[41px] mt-auto mb-[-5px]"
              src={"https://kadinle.com/media/images/chat.gif"}
              alt="category"
              width={20}
              height={20}
            />
            {/* <ChatIcon className=" text-opink w-7 h-7 mb-1 mt-auto" /> */}
            <span className="whitespace-nowrap text-[11px] text-opink capitalize">
              {t("chat")}
            </span>
          </button>

          <Link
            href={user?.id ? "/profile" : "/login"}
            className="flex flex-col flex-1  items-center h-[100%] justify-between"
          >
            <Image
              className="w-[20px] mt-auto mb-2"
              src={"https://kadinle.com/media/images/profile.svg"}
              alt="profile"
              width={20}
              height={20}
            />
            <span className="whitespace-nowrap text-[11px] text-[#727C8E] capitalize">
              {t("profile")}
            </span>
          </Link>

          <Link
            href="/more"
            className="flex flex-col flex-1  items-center h-[100%] justify-between"
          >
            <Image
              className="w-[20px] mt-auto mb-2 object-contain"
              src={"https://kadinle.com/media/images/more.svg"}
              alt="more"
              width={20}
              height={20}
            />
            <span className="whitespace-nowrap text-[11px] text-[#727C8E] capitalize">
              {t("more")}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
