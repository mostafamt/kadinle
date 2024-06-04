"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateNotificationStatus } from "@/app/api/supabase/user";
import BellSlashIcon from "../Icons/BellSlashIcon";
import { MobileNav } from "../header/MobileNav";

const Notifications = ({ notifications }) => {
  const t = useTranslations();
  const router = useRouter();

  const isInternalLink = (url) => url && !url.includes("http");

  const handleLink = (url) => {
    router.push(url);
  };

  const updateStatus = async (id) => {
    await updateNotificationStatus(id);
  };
  return (
    <div className="bg-#f5f6f8 min-h-screen">
      <div className="md:max-w-[575px] md:mx-auto w-full">
        <MobileNav title={t("notifications")} showIcons />
        <div className="mt-8">
          {notifications?.length ? (
            <ul className=" bg-white shadow rounded-md max-h-[500px] overflow-auto z-[10001] top-full ltr:left-0 rtl:right-0 min-w-[250px]">
              {notifications?.map((item) => {
                const isInternal = isInternalLink(item?.url);

                return isInternal ? (
                  <li
                    key={item?.id}
                    onMouseOver={() =>
                      !item?.status ? updateStatus(item?.id) : undefined
                    }
                    onClick={() => (item?.url ? handleLink(item?.url) : null)}
                    className={`${
                      item?.url ? "cursor-pointer" : ""
                    } first:rounded-t-md last:rounded-b-md border-b last:border-0 border-gray-300 min-h-[60px] py-3 px-4 gap-3 flex text-sm items-center justify-between text-gray-500 ${
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
                ) : (
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    key={item?.id}
                    href={item?.url}
                    onMouseOver={() =>
                      !item?.status ? updateStatus(item?.id) : undefined
                    }
                    className={` first:rounded-t-md last:rounded-b-md border-b last:border-0 border-gray-300 min-h-[60px] py-3 px-4 gap-3 flex text-sm items-center justify-between text-gray-500 ${
                      item?.status
                        ? ""
                        : "ltr:border-l-4 rtl:border-r-4 border-red-500 bg-gray-50"
                    }`}
                  >
                    <p>{item?.content}</p>
                    <small>
                      {new Date(item?.created_at).toLocaleDateString("en-US")}
                    </small>
                  </a>
                );
              })}
            </ul>
          ) : (
            <div className="mx-auto flex flex-col gap-2 items-center justify-center">
              <BellSlashIcon className=" w-9 text-opink" />
              <p className="text-sm text-gray-400">{t("no_results")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
