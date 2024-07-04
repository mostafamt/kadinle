"use client";
import React, { useEffect, useState } from "react";

import { BellIcon } from "../Icons/BellIcon";
import BellSlashIcon from "../Icons/BellSlashIcon";
import {
  getNotification,
  updateNotificationStatus,
  // eslint-disable-next-line import/no-unresolved
} from "@/app/api/supabase/user";
import { useRouter } from "next/navigation";

export const NotificationBarDT = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    getNotification().then((res) => {
      setNotifications(res?.data);
    });
  };
  useEffect(() => {
    const user =
      typeof window === "object" &&
      localStorage.getItem("KADINLE_CUSTOMER_USER");
    if (user === "undefined" || !user) return;
    fetchNotifications();
  }, []);

  const handleLink = (url) => {
    router?.push(url);
  };

  const updateStatus = async (id) => {
    const response = await updateNotificationStatus(id);
    if (!response?.error) fetchNotifications();
  };
  const unRead = notifications?.filter((alert) => !alert?.status);
  return (
    <div className="relative">
      <button
        className={`${
          unRead?.length ? "text-red-500" : "text-white"
        } relative bg-[#ffffff38] p-1 rounded-full justify-center text-[14px] flex items-center`}
        onClick={() => setOpen(true)}
      >
        <BellIcon />
        {unRead?.length ? (
          <span className="text-red-500 px-1">{unRead?.length}</span>
        ) : null}
      </button>
      {open ? (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-[10000]"
            onClick={() => setOpen(false)}
          />
          <ul className="absolute bg-white shadow rounded-md max-h-[500px] overflow-auto z-[10001] top-full ltr:left-0 rtl:right-0 min-w-[250px]">
            {notifications?.length ? (
              notifications?.map((item) => (
                <li
                  key={item?.id}
                  onMouseOver={() =>
                    !item?.status ? updateStatus(item?.id) : undefined
                  }
                  onClick={() => (item?.url ? handleLink(item?.url) : null)}
                  className={`${
                    item?.url ? "cursor-pointer" : ""
                  } first:rounded-t-md last:rounded-b-md border-b last:border-0 border-gray-300 min-h-[60px] py-2 px-4 gap-3 flex text-sm items-start justify-between text-gray-500 ${
                    item?.status
                      ? ""
                      : "ltr:border-l-4 rtl:border-r-4 border-red-500 bg-gray-50"
                  }`}
                >
                  <p>{item?.content}</p>
                  <small>
                    {new Date(item?.created_at).toLocaleDateString("en-US")}
                  </small>
                </li>
              ))
            ) : (
              <div className="mx-auto flex py-4 flex-col gap-2 items-center justify-center">
                <BellSlashIcon className=" w-5 text-primary" />
                <p className="text-sm text-gray-400">
                  There are no notifications
                </p>
              </div>
            )}
          </ul>
        </>
      ) : null}
    </div>
  );
};
