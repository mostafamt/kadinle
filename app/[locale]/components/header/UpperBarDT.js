"use client";
import Link from "next/link";
import { ChatIcon } from "../Icons/ChatIcon";
import { NotificationBar } from "./NotificationBar";
import { getTranslator } from "next-intl/server";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Chat from "../chat/Chat";
import { useState } from "react";
import { NotificationBarDT } from "./NotificationBarDT";

export const UpperBarDT = () => {
  const t = useTranslations();
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      {openChat ? <Chat setOpenChat={setOpenChat} /> : null}
      <div className="bg-black flex justify-center text-[12px] px-3">
        <div className="flex justify-between  text-white pt-2 pb-2 container-lrg w-[100%]">
          <div className="flex items-center gap-2">
            <NotificationBarDT />
            <button
              onClick={() => setOpenChat(true)}
              className="text-white bg-[#ffffff38] p-1 rounded-full justify-center text-[14px] flex items-center gap-1"
            >
              <ChatIcon />{" "}
            </button>
            <p>{t("download_app_msg")}</p>
          </div>

          <div className="flex gap-[10px] md:gap-[50px] ">
            <Link href="/categories/flash-sale" className="flex gap-3 items-center">
              <Image
                className="w-[10px]"
                src={"https://kadinle.com/media/images/dot.png"}
                alt="dot"
                height={30}
                width={30}
              />
              <Image
                className="w-[30px]"
                src={"https://kadinle.com/media/images/sale.gif"}
                alt="sale"
                height={30}
                width={30}
              />

              <p>{t("Quick_sale")}</p>
            </Link>

            <Link href="/fast-shipping" className="flex gap-3 items-center">
              <Image
                className="w-[10px]"
                src={"https://kadinle.com/media/images/dot.png"}
                alt="dot"
                height={30}
                width={30}
              />
              <Image
                src={"https://kadinle.com/media/images/fast-truck.gif"}
                className="w-[30px]"
                alt="fast shipping"
                height={30}
                width={30}
              />
              <p>{t("fast_shipping")}</p>
            </Link>

            <Link href="/return" className="flex gap-3 items-center">
              <Image
                className="w-[10px]"
                src={"https://kadinle.com/media/images/dot.png"}
                alt="dot"
                height={30}
                width={30}
              />
              <Image
                className="w-[20px]"
                src={"https://kadinle.com/media/images/return.gif"}
                alt="payment"
                height={30}
                width={30}
              />
              <p>{t("Return_and_refund")}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
