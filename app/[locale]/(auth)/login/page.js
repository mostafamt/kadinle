"use client";

import { login, loginWith } from "@/app/api/supabase/auth";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import Head from "next/head";
import Cookies from "js-cookie";
import {unstable_setRequestLocale} from 'next-intl/server';

const BigLogo = "https://kadinle.com/media/images/BigLogo.png";
const Apple = "https://kadinle.com/media/images/Apple.svg";
const Cancel2 = "https://kadinle.com/media/images/Cancel2.svg";
const Facebook = "https://kadinle.com/media/images/Facebook.svg";
const Forgot = "https://kadinle.com/media/images/Forgot.svg";
const Gmail = "https://kadinle.com/media/images/Gmail.svg";
const Next2 = "https://kadinle.com/media/images/Next2.svg";
const Profile3 = "https://kadinle.com/media/images/Profile3.svg";

const LoginPage = ({ params: { locale } }) => {
  
  const t = useTranslations();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserRefresh } = useGlobalOptions();
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("KADINLE_USER")) router.push(`/${locale}`);
  }, [router, locale]);

  const submitLogin = async () => {
    if (email && password) {
      let { error, session } = await login(email, password);
      if (error) {
        setError(error.message);
      } else {
        setError("");
        setUserRefresh((p) => !p);
        const expiresAt = new Date(session?.expires_at * 1000);
        Cookies.set("KADINLE_USER", JSON.stringify(session?.user), {
          expires: expiresAt,
        });
        router.push(`/${locale}`);
      }
    } else {
      setError(t("fields_error"));
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleLoginWith = (provider) => {
    loginWith(provider).then((res) => {});
  };

  return (
    <>
      <Head>
        <title>KADINLE | {t("logIn")}</title>
      </Head>
      <div className="bg-[#F5F6F8] min-h-[100vh]">
        <div className="flex justify-center mb-10">
          <ScrollUpComponent />
          <div className="flex flex-col text-[12px] w-[90%] max-w-[500px]">
            <div className="flex justify-between mt-6 overflow-x-scroll no-scrollbar whitespace-n-wrap">
              <Link
                href="/signup"
                className="whitespace-nowrap text-[20px] font-semibold text-[#25252D] opacity-20"
              >
                {t("signUp")}
              </Link>
              <h3 className="whitespace-nowrap text-[20px] font-semibold text-[#25252D">
                {t("logIn")}
              </h3>
              <Link
                href="/forgot-password"
                className="whitespace-nowrap text-[20px] text-[#25252D] opacity-20"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <div className="flex flex-col py-2 px-4 rounded-[12px] mt-6 drop-shadow-sm bg-owhite">
              {error ? (
                <p className="text-red-500 bg-red-200 p-2 text-center mb-2 rounded-md">
                  {error}
                </p>
              ) : null}
              <div className="flex gap-4 items-center mb-2">
                <Image
                  src={Profile3}
                  alt="user"
                  className="w-[18px] object-contain"
                  height={20}
                  width={20}
                />
                <div className="flex flex-col w-full">
                  <label className="text-[#25252D] opacity-50">{`${t(
                    "userName"
                  )}/${t("email")}`}</label>
                  <input
                    className="bg-owhite py-1 outline-none w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Image
                  src={Forgot}
                  alt="password"
                  className="object-contain"
                  height={20}
                  width={20}
                />
                <div className="flex flex-col w-full">
                  <label className="text-[#25252D] opacity-50">
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
              onClick={submitLogin}
              className=" cursor-pointer flex justify-between items-center text-owhite rounded-full px-[10px] w-[100%] self-center py-[6px] mt-4 bg-opink"
            >
              <span className="w-1/3"></span>
              <span className="w-1/3 self-center flex justify-center uppercase">
                {t("logIn")}
              </span>
              <span className="w-1/3 flex justify-end rtl:rotate-180">
                <Image
                  src={Next2}
                  alt="login"
                  className="object-contain"
                  height={25}
                  width={25}
                />
              </span>
            </button>
            <div className="my-6 flex gap-2 items-center justify-center w-full">
              <button
                type="button"
                onClick={() => handleLoginWith("facebook")}
                className="flex justify-center cursor-pointer py-[10px] rounded-full px-4 text-owhite bg-[#3B5998] items-center gap-3"
              >
                <Image
                  src={Facebook}
                  alt="Facebook"
                  className="object-contain h-5 w-5"
                  height={25}
                  width={25}
                />
                <span className="text-[12px] 2xl:text-[13px]">Facebook</span>
              </button>

              <button
                type="button"
                onClick={() => handleLoginWith("google")}
                className="flex justify-center cursor-pointer py-[10px] rounded-full px-4  bg-owhite border border-opink items-center gap-3"
              >
                <Image
                  src={Gmail}
                  alt="Gmail"
                  className="object-contain h-5 w-5"
                  height={25}
                  width={25}
                />
                <p className="text-[12px] 2xl:text-[13px]">Gmail</p>
              </button>

              {/* <button
              type="button"
              onClick={() => handleLoginWith("apple")}
              className="flex justify-center cursor-pointer py-[10px] rounded-full px-4 text-owhite bg-black items-center gap-3"
            >
              <Image src={Apple} 
               alt="Apple"
                className="object-contain"
                height={25}
                width={25}
              />
              <p className="text-[12px] 2xl:text-[13px]">Apple</p>
            </button> */}
            </div>
            <Link href="/signup" className="text-[500] text-center ">
              {t("swipeRight")}
              <br />
              <span className="text-opink">{t("createAccount")}</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src={BigLogo}
              alt="logo"
              className="object-contain w-[140px]"
              height={240}
              width={140}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
