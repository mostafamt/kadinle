"use client";
import React from "react";
import {unstable_setRequestLocale} from 'next-intl/server';
import { forgotPassword } from "@/app/api/supabase/auth";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

const Page = ({ params: { locale } }) => {
  
  const t = useTranslations();
  const router = useRouter();
  const { setUserRefresh, user } = useGlobalOptions();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (Cookies.get("KADINLE_USER")) router.push(`/${locale}`);
  }, [router, locale]);

  const submitForgotPassword = async () => {
    if (email) {
      let res = await forgotPassword(email);
      if (!res?.error) {
        setMessage(t("forget_password_sent"));
      } else {
        if (res?.error === "email_not_found") setError(t("email_not_found"));
        else setError(res?.error?.message);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } else {
      setError(t("franchise_msg73"));
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="bg-[#F5F6F8] min-h-[100vh]">
        <div className="flex justify-center mb-10">
          <ScrollUpComponent />
          <div className="flex flex-col text-[12px] w-[90%] max-w-[500px]">
            <div className="flex justify-between gap-4 mt-6 overflow-x-scroll no-scrollbar ">
              <Link
                href="/signup"
                className="whitespace-nowrap text-[20px] font-semibold text-[#25252D] opacity-20"
              >
                {t("signUp")}
              </Link>
              <h3 className="whitespace-nowrap text-[20px] font-semibold ">
                {t("forgotPassword")}
              </h3>
              <Link
                href="/login"
                className="whitespace-nowrap text-[20px] font-semibold text-[#25252D] opacity-20"
              >
                {t("logIn")}
              </Link>
            </div>

            <p className="self-center text-center mt-6 px-4">
              {t("forgotPasswordMessage")}
            </p>
            {error ? (
              <p className="text-red-500 bg-red-200 p-2  mt-6 text-center mb-2 rounded-md">
                {error}
              </p>
            ) : null}
            {message ? (
              <p className="text-green-500 bg-green-200 p-2  mt-6 text-center mb-2 rounded-md">
                {message}
              </p>
            ) : null}
            <div className="flex flex-col py-2 px-4 rounded-[12px] mt-6 drop-shadow-sm bg-owhite">
              <div className="flex gap-4 items-center">
                <Image
                  src={"https://kadinle.com/media/images/Profile3.svg"}
                  className="w-[18px] object-contain"
                  alt="user"
                  height={20}
                  width={20}
                />
                <div className="flex flex-col w-full">
                  <label className="text-[#25252D] opacity-50">{`${t(
                    "email"
                  )}`}</label>

                  <input
                    className="bg-owhite py-1 outline-none w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={submitForgotPassword}
              className="cursor-pointer flex justify-between items-center text-owhite rounded-full px-[10px] w-[100%] self-center py-[6px] mt-4 bg-opink"
            >
              <span className="w-1/3" />
              <span className="w-1/3 self-center flex justify-center">
                {t("sendEmail")}
              </span>
              <span className="w-1/3 flex justify-end rtl:rotate-180">
                <Image
                  src={"https://kadinle.com/media/images/Next2.svg"}
                  alt="send"
                  className="h-6 w-6 object-contain"
                  height={30}
                  width={30}
                />
              </span>
            </button>

            <Link href="/signup" className="text-[500] text-center mt-6">
              {t("swipeRight")}
              <br />
              <span className="text-opink">{t("createAccount")}</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/">
            <Image
              className="w-[140px] object-contain"
              src={"https://kadinle.com/media/images/BigLogo.png"}
              alt="logo"
              height={80}
              width={140}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
