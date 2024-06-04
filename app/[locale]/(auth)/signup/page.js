"use client";
import { generateMail } from "@/app/api/emails/sender";
import { signup } from "@/app/api/supabase/auth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {unstable_setRequestLocale} from 'next-intl/server';
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import Head from "next/head";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Cookies from "js-cookie";

const BigLogo = "https://kadinle.com/media/images/BigLogo.png";
const Email = "https://kadinle.com/media/images/Email.svg";
const Forgot = "https://kadinle.com/media/images/Forgot.svg";
const Next2 = "https://kadinle.com/media/images/Next2.svg";
const Profile3 = "https://kadinle.com/media/images/Profile3.svg";

const Page = ({ params: { locale } }) => {
  
  const t = useTranslations();
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (Cookies.get("KADINLE_USER")) router.push(`/${locale}`);
  }, [router, locale]);

  const submitSignup = async (e) => {
    e.preventDefault();
    if (fullName && email && password) {
      let username = fullName?.split(" ");
      let firstName = username?.[0];
      let lastName = username?.slice(1)?.join(" ");
      let res = await signup(email, password, firstName, lastName);
      if (res?.error) {
        setError(res?.error?.message);
      } else {
        router?.push("/login");
        await generateMail("signup_msg", {
          customer_name: firstName + " " + lastName,
          lang: locale,
        });
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
      <Head>
        <title>KADINLE | {t("signUp")}</title>
      </Head>
      <div className="bg-[#F5F6F8] min-h-[100vh]">
        <div className=" flex justify-center mb-10">
          <ScrollUpComponent />
          <div className="flex flex-col text-[12px] w-[90%] max-w-[500px]">
            <div className="flex justify-between mt-6 overflow-x-scroll no-scrollbar">
              <Link
                href="/login"
                className="whitespace-nowrap text-[20px] font-semibold text-[#25252D] opacity-20"
              >
                {t("logIn")}
              </Link>
              <h3 className="whitespace-nowrap text-[20px] font-semibold ">
                {t("signUp")}
              </h3>
              <Link
                href="/forgot-password"
                className="whitespace-nowrap text-[20px] font-semibold text-[#25252D] opacity-20"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            {error ? (
              <p className="text-red-500 bg-red-200 p-2  mt-6 text-center mb-2 rounded-md">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col py-2 px-4 rounded-[12px] mt-6 drop-shadow-sm bg-owhite">
              <div className="flex gap-4 items-center mb-2">
                <Image
                  src={Email}
                  alt="email"
                  height={25}
                  width={25}
                  className="w-[18px] object-contain"
                />
                <div className="flex flex-col w-full">
                  <label className="text-[#25252D] opacity-50 uppercase">
                    {t("email")}
                  </label>
                  <input
                    className="bg-owhite py-1 outline-none w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center mb-2">
                <Image
                  src={Profile3}
                  alt="user icon"
                  height={25}
                  width={25}
                  className="w-[18px] object-contain"
                />
                <div className="flex flex-col w-full">
                  <label className="text-[#25252D] opacity-50 uppercase">
                    {t("userName")}
                  </label>
                  <input
                    className="bg-owhite py-1 outline-none w-full"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Image
                  src={Forgot}
                  alt="forgot"
                  height={25}
                  width={25}
                  className="w-[18px] object-contain"
                />
                <div className="flex flex-col w-full">
                  <label className="text-[#25252D] opacity-50 uppercase">
                    {t("password")}
                  </label>
                  <input
                    type={"password"}
                    className="bg-owhite py-1 outline-none w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={submitSignup}
              className=" cursor-pointer flex justify-between items-center text-owhite rounded-full px-[10px] w-[100%] self-center py-[6px] mt-4 bg-opink"
            >
              <span className="w-1/3"></span>
              <span className="w-1/3 self-center flex justify-center ">
                {t("signUp")}
              </span>
              <span className="w-1/3 rtl:rotate-180 flex justify-end">
                <Image
                  src={Next2}
                  alt="login"
                  className="object-contain"
                  height={25}
                  width={25}
                />
              </span>
            </button>

            <p className="text-[500] text-center mt-6">
              {t("byCreating")}
              <Link href="/terms" className="text-opink capitalize">
                {" "}
                {t("Terms")}
                <br /> {t("ofService")}
              </Link>{" "}
              {t("and")}{" "}
              <Link href="/shipping-policy-turkey" className="text-opink">
                {t("privacyPolicy")}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src={BigLogo}
              alt="logo"
              className="object-contain h-auto w-[140px]"
              height={240}
              width={140}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
