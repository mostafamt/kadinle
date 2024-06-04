"use client";
import React, { useEffect, useState } from "react";

import { getNotification } from "@/app/api/supabase/user";
import Link from "next/link";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { BellIcon } from "../Icons/BellIcon";

export const NotificationBar = ({ userId }) => {
  const { user } = useGlobalOptions();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await getNotification();
    setNotifications(res?.data);
  };
  useEffect(() => {
    if (!user) return;
    fetchNotifications();
  }, [user]);

  const unRead = notifications?.filter((alert) => !alert?.status);

  return (
    <Link className="relative" href="/notifications">
      <span className="h-[18px] min-w-[16px] flex items-center justify-center text-xs rounded-[50%] bg-primary absolute -top-1 -right-1 text-white px-[2px] py-0 leading-[0px]">
        {unRead?.length || "0"}
      </span>
      <BellIcon color="#727C8E" className="h-6 w-6" />
    </Link>
  );
};
