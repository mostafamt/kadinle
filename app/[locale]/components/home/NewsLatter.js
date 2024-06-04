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

export const NewsLatter = ({ locale, banner }) => {
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
      <div className="relative h-[184px] pt-6 overflow-hidden letter-sec">
      <div className="absolute top-0 bottom-0 w-full max-w-full z-0">
        <Image
          className="w-full max-w-full h-[100%] max-h-[100%]"
          src={banner}
          alt="banner"
          height={250}
          width={1550}
        />
      </div>
      <h3 className="relative mx-4 md:block max-w-fit md:mx-auto p-2 rounded-md bg-gray-50 mb-6 !text-sm text-opink z-10 whitespace-normal">
        {t("newsletter_msg")}
      </h3>
      <div className="flex items-center md:items-start subs-parent">
        <div className="z-10 block bg-dblue py-2 xl:py-4 ltr:rounded-r-3xl rtl:rounded-l-3xl px-5 rate">
          <p className="text-[20px] lg:text-[30px] xl:text-4xl text-white ">
            -10%
          </p>
        </div>
        <div className="container relative z-10 flex-col h-fit justify-center gap-[20px] md:flex-row md:justify-between w-full flex  md:items-start">
          <p className="text-white ltr:text-left rtl:text-right lg:mt-0 w-full max-w-[370px] text-[16px] md:text-[20px] -mt-0.5 md:mt-0 xl:text-xl ">
            {t("subscribe_msg")}
          </p>
          <div className="">
            {msg === "error" ? (
              <p className="text-red-500 mb-2 bg-red-100 text-sm p-1 rounded-md text-center ">
                {t("valid_email")}
              </p>
            ) : null}
            {msg === "warning" ? (
              <p className="text-yellow-500 mb-2 bg-yellow-100 text-sm p-1 rounded-md text-center ">
                {t("subscribe_error")}
              </p>
            ) : null}
            {msg === "success" ? (
              <p className="text-green-500 mb-2 bg-green-100 text-sm p-1 rounded-md text-center ">
                {t("subscribe_success")}
              </p>
            ) : null}
            <div className="flex gap-4 lg:gap-10 items-center justify-end">
              <div className=" md:block w-full max-w-[350px]  md:mt-0 rtl:mr-6 rtl:md:mr-0 ">
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                  className="outline-none rounded-2xl px-4 py-1 md:px-6  md:py-2 text-[10px] h-[35px] md:text-[13px] w-[200px] min-w-[170px]"
                  placeholder={t("enter_email")}
                />
              </div>
              <div className="flex items-center justify-center bg-dblue transition-all duration-[300ms] cursor-pointer  text-white py-1 px-2 truncate h-[35px] min-w-fit rounded-2xl text-xs hover:text-dblue hover:bg-[#FFFFFF]  ">
                <button
                  className="text-[10px] lg:text-xs "
                  onClick={handleSubscribe}
                >
                  {t("get_discount")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
