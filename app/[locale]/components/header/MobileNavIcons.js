"use client";

import { getNotification } from "@/app/api/supabase/user";
import React, { useEffect, useState } from "react";
import ChatModal from "../chat/ChatModal";
import { ChatIcon } from "../Icons/ChatIcon";
import Link from "next/link";
import { BellIcon } from "../Icons/BellIcon";

export const MobileNavIcons = () => {
  const [openChat, setOpenChat] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    getNotification().then((res) => {
      setNotifications(res?.data);
    });
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  const unRead = notifications?.filter((alert) => !alert?.status);

  return (
    <>
      {openChat ? <ChatModal setOpenChat={setOpenChat} /> : null}
      <div className="flex justify-end gap-4 mt-3 mb-3 ">
        <button onClick={() => setOpenChat(true)} className="relative">
          <ChatIcon className="text-opink w-6" />
        </button>

        <Link href="/notifications" className="relative">
          <BellIcon className="text-opink w-6" />
          <div className="absolute -bottom-[3px] ltr:-left-[5px] rtl:-right-[5px] flex items-center justify-center w-[15px] h-[15px] bg-opink text-owhite rounded-full">
            <p className="text-[10px]">{unRead?.length || "0"}</p>
          </div>
        </Link>
      </div>
    </>
  );
};
