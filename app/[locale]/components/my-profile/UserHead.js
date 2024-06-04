"use client";

import { updateUserAvatar } from "@/app/api/supabase/user";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

const Camera = "https://kadinle.com/media/images/camera.svg";

export const UserHead = ({
  userData,
  setUserData,
  setRefresh,
  setActiveTab,
}) => {
  const t = useTranslations();
  const [defaultImage, setDefaultImage] = useState(false);

  const uploadFile = (e) => {
    let blob = URL.createObjectURL(e.target.files[0]);
    setUserData((prev) => {
      return {
        ...prev,
        profile_img: blob,
      };
    });
    updateUserAvatar(e.target.files[0]).then(() => {
      setRefresh((p) => !p);
    });
  };

  return (
    <div className="flex gap-6 pb-5 pt-1">
      <div className="relative">
        {defaultImage ? (
          <span className="h-24 w-24 rounded-full flex items-center justify-center bg-primary-light text-primarys">
            {userData?.first_name?.at(0)}
          </span>
        ) : (
          <Image
            className="rounded-full h-24 w-24 object-cover"
            src={userData?.profile_img}
            alt={userData?.first_name}
            onError={() => setDefaultImage(true)}
            height={96}
            width={96}
          />
        )}
        <div
          // onClick={(e) => inputClicked()}
          className="absolute bottom-0 ltr:right-0 rtl:left-0 "
        >
          <Image
            src={Camera}
            alt="change avatar"
            height={25}
            width={25}
            className="object-contain"
          />
        </div>
        <input
          onChange={uploadFile}
          className="absolute top-0 ltr:left-0 rtl:right-0 w-full h-full z-10 opacity-0"
          type="file"
          accept="image/*"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col ">
          <p className="font-[700] text-[24px] flex">
            {userData?.first_name} {userData?.last_name}
          </p>
          <p className="text-[12px]">{userData?.email}</p>
        </div>
        <button
          onClick={() => setActiveTab(13)}
          className="text-[11px] hover:bg-primary hover:text-white rounded-full w-[110px] py-[6px] font-semibold text-[#727C8E] border flex items-center justify-center"
        >
          {t("EDIT_PROFILE")}
        </button>
      </div>
    </div>
  );
};
