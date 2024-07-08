"use client";

import React, { useState } from "react";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import { generateMail } from "@/app/api/emails/sender";
import Image from "next/image";
import { subscribe } from "@/app/api/supabase/user";
import {
  checkIfEmailHasSubscribe,
  increasePointsByType,
} from "@/app/api/supabase/points";

export const NewsLatterDT = ({ locale, banner }) => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = () => {
    if (!email && email?.indexOf("@") !== -1) {
      setMsg("error");
      return;
    }

    subscribe(email).then((res) => {
      if (!res?.error) {
        setMsg("success");
        setEmail("");
        if (checkIfEmailHasSubscribe()) return;
        else increasePointsByType("SUBSCRIPTION", user?.id);

        generateMail("subscription_msg", {
          customer_name:
            user?.user_metadata?.first_name +
            " " +
            user?.user_metadata?.last_name,
          lang: locale,
        });
      } else {
        setMsg("warning");
      }
      setTimeout(() => {
        setMsg("");
      }, 3000);
    });
  };
  
    return (
    <div className="relative mt-[7%] py-4">
      <Image
        className="w-full object-cover absolute top-0 ltr:left-0 rtl:right-0 h-full"
        src={banner}
        alt="banner"
        height={200}
        width={500}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <p className=" text-white block bg-dblue py-2 rtl:rounded-l-3xl ltr:rounded-r-3xl w-fit px-5">
            -10%
          </p>
          <p className="text-white rtl:text-right ltr:text-left text-sm flex-1 w-full">
            {t("subscribeNewsletter")}
          </p>
        </div>
        {msg === "error" ? (
          <p className="my-2 xs:max-w-[400px] mx-auto text-red-500 bg-red-100 p-1 rounded-md text-center ">
            {t("valid_email")}
          </p>
        ) : null}
        {msg === "warning" ? (
          <p className="my-2 xs:max-w-[400px] mx-auto text-yellow-500 bg-yellow-100 p-1 rounded-md text-center ">
            {t("subscribe_error")}
          </p>
        ) : null}
        {msg === "success" ? (
          <p className="my-2 xs:max-w-[400px] mx-auto text-green-500 bg-green-100 p-1 rounded-md text-center ">
            {t("subscribe_success")}
          </p>
        ) : null}

        <div className="flex  gap-2 items-center px-4">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            className="outline-none rounded-3xl text-sm p-2 w-full"
            placeholder={t("enterEmail")}
          />
          <button
            onClick={handleSubscribe}
            className="capitalize text-sm rounded-2xl whitespace-nowrap  bg-dblue p-2 text-[#FFFFFF] transition-all duration-[300ms]  hover:text-dblue hover:bg-[#FFFFFF]"
          >
            {t("getDiscount")}
          </button>
        </div>
        <p className="relative mx-4 max-w-fit xl:mx-auto p-2 rounded-md bg-gray-50 mt-4 text-center !text-[10px] text-opink z-10 whitespace-normal">
          {t("newsletter_msg")}
        </p>
      </div>
    </div>
  );
};
