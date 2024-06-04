"use client";
import { generateMail } from "@/app/api/emails/sender";
import {
  forgotPassword,
  login,
  loginWith,
  signup,
  updateSessionDuration,
} from "@/app/api/supabase/auth";
import { supabase } from "@/app/api/supabase/supabase.config";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const Apple = "https://kadinle.com/media/images/Apple.svg";
const Cancel2 = "https://kadinle.com/media/images/Cancel2.svg";
const Facebook = "https://kadinle.com/media/images/Facebook.svg";
const Gmail = "https://kadinle.com/media/images/Gmail.svg";

const AuthPopup = ({ locale }) => {
  const t = useTranslations();
  const { showAuthPopup, setShowAuthPopup, setUserRefresh } =
    useGlobalOptions();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agree, setAgree] = useState("");

  useEffect(() => {
    setEmail("");
    setAgree(false);
    setPassword("");
  }, [active]);

  useEffect(() => {
    setError("");
    setMessage("");
    setAgree(false);
  }, [showAuthPopup]);

  const submitLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      let { error, session } = await login(email, password);
      if (error) {
        setMessage("");
        setError(error.message);
      } else {
        setError("");
        setMessage(t("login_msg"));
        if (agree) {
          localStorage.setItem("supabaseSession", JSON.stringify(session));
        }
        setTimeout(() => {
          setMessage("");
          setUserRefresh((p) => !p);
          setShowAuthPopup(false);
          const expiresAt = new Date(session?.expires_at * 1000);
          Cookies.set("KADINLE_USER", JSON.stringify(session?.user), {
            expires: expiresAt,
          });
        }, 2000);
      }
    } else {
      setError(t("fields_error"));
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const submitSignup = async (e) => {
    generateMail("signup_msg", {
      customer_name: firstName + " " + lastName,
      lang: locale,
    }).then((res) => {});
    e.preventDefault();
    if (firstName && lastName && email && password) {
      let res = await signup(email, password, firstName, lastName);
      if (res?.error) {
        setError(res?.error?.message);
      } else {
        setActive(1);
        generateMail("signup_msg", {
          customer_name: firstName + " " + lastName,
          lang: locale,
        }).then((res) => {});
      }
    } else {
      setError(t("fields_error"));
    }
  };

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

  const handleLoginWith = async (provider) => {
    await loginWith(provider);
  };

  return (
    <div className={`${showAuthPopup ? "block" : "hidden"} capitalize`}>
      <button
        onClick={() => setShowAuthPopup(false)}
        className="fixed min-w-[100vw] min-h-[100vh] bg-[#2A131B] top-0 rtl:right-0 ltr:left-0 z-[9000] opacity-60"
      />
      <div className="fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[50%] xl:w-[36%] xl:max-w-[530px] flex flex-col px-4 pb-5 bg-owhite rounded-[10px]">
        <div
          onClick={(e) => {
            setShowAuthPopup(false);
            setActive(1);
          }}
          className="absolute -top-[8%] ltr:-left-[25px] rtl:-right-[25px] cursor-pointe"
        >
          <Image src={Cancel2} alt="close popup" height={55} width={55} />
        </div>

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

        {active !== 2 && (
          <div className="flex w-full justify-between bg-opink rounded-full mt-4 py-2 px-3">
            <button
              onClick={(e) => setActive(0)}
              className={`${
                active === 0 ? "bg-owhite text-opink" : "text-owhite bg-opink"
              } rounded-full transition-all capitalize duration-[500ms] cursor-pointer py-2 w-[45%] flex items-center justify-center`}
            >
              {t("signup")}
            </button>
            <button
              onClick={(e) => setActive(1)}
              className={`${
                active === 1 ? "bg-owhite text-opink" : "text-owhite bg-opink"
              } rounded-full transition-all capitalize duration-[500ms] cursor-pointer py-2 w-[45%] flex items-center justify-center`}
            >
              {t("signin")}
            </button>
          </div>
        )}

        {active == 2 && (
          <p className="self-center text-center mt-6 px-3">
            {t("login_description")}
          </p>
        )}

        <div
          className={`${
            active === 2 ? "opacity-[1] block" : "opacity-[0] hidden"
          }  flex flex-col`}
        >
          <div className="rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-7">
            <input
              className="bg-owhite w-full outline-none text-[14px]"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={submitForgotPassword}
            className="w-[80%] mt-4 self-center rounded-full py-[10px] text-[12px] 2xl:text-[13px] bg-opink text-owhite flex justify-center items-center border transition-all duration-[300ms] border-owhite hover:bg-owhite hover:text-[#000000] hover:border-opink cursor-pointer "
          >
            {t("SEND_EMAIL")}
          </button>
        </div>

        <form
          onSubmit={submitSignup}
          className={`${
            active === 0 ? "opacity-[1] block" : "opacity-[0] hidden"
          }  flex flex-col`}
        >
          {/* 
          <div className='rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-4'>
            <input className='bg-owhite w-full outline-none text-[14px] ' placeholder='Type of account' />
          </div> */}

          <div className="rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-4">
            <input
              type="text"
              className="bg-owhite w-full outline-none text-[14px] "
              placeholder={t("first_name")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-4">
            <input
              type="text"
              className="bg-owhite w-full outline-none text-[14px] "
              placeholder={t("last_name")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-4">
            <input
              type="email"
              className="bg-owhite w-full outline-none text-[14px] "
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-4">
            <input
              type="password"
              className="bg-owhite w-full outline-none text-[14px] "
              value={password}
              placeholder={t("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className=" flex gap-3 items-center ltr:ml-6 rtl:mr-6 mt-4">
            <input
              type={"checkbox"}
              className="w-[20px] h-[20px] border cursor-pointer"
              checked={agree}
              onChange={(e) => {
                if (e.target.checked) setAgree(true);
                else setAgree(false);
              }}
            />
            <p className="text-[12px] 2xl:text-[13px]">{t("agree_msg")}</p>
          </div>

          <button className="w-[80%] mt-4 self-center rounded-full py-[10px] text-[12px] 2xl:text-[13px] bg-[#00ADC9] text-owhite flex justify-center items-center border transition-all duration-[300ms] border-owhite hover:bg-owhite hover:text-[#000000] hover:border-[#99ADC9] cursor-pointer ">
            {t("signup")}
          </button>

          <div className="self-center mt-3 mb-3 flex justify-center gap-1 capitalize items-center text-[12px] 2xl:text-[13px] cursor-pointer ">
            <p>{t("member_msg")}</p>
            <button className="text-[13px] 2xl:text-[14px] text-opink">
              {t("signin")}
            </button>
          </div>
        </form>

        <form
          onSubmit={submitLogin}
          className={`${
            active === 1 ? "opacity-[1] block" : "opacity-[0] hidden"
          }  flex flex-col`}
        >
          <div className="rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-7">
            <input
              type="email"
              className="bg-owhite w-full outline-none text-[14px]"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="rounded-full py-[10px] border border-[#D8D8D8] px-8 mt-4">
            <input
              type="password"
              className="bg-owhite w-full outline-none text-[14px] "
              value={password}
              placeholder={t("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full mt-4 flex justify-between items-center">
            <div className=" flex gap-3 items-center ltr:ml-3 rtl:mr-3">
              <input
                type={"checkbox"}
                className="w-[20px] h-[20px] border cursor-pointer"
                checked={agree}
                onChange={(e) => {
                  if (e.target.checked) setAgree(true);
                  else setAgree(false);
                }}
              />
              <p className="text-[12px] 2xl:text-[13px]">{t("keep_me")}</p>
            </div>

            <button
              onClick={(e) => setActive(2)}
              className="text-[#808080] text-[13px] hover:text-opink cursor-pointer ltr:mr-5 rtl:ml-5"
            >
              {t("forgot_password")}
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-6">
            <button
              type="button"
              onClick={() => handleLoginWith("facebook")}
              className="flex justify-center cursor-pointer py-[10px] rounded-full px-4 text-owhite bg-[#3B5998] items-center gap-3"
            >
              <Image
                src={Facebook}
                className=" h-auto object-contain"
                alt="login with Facebook"
                height={12}
                width={12}
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
                className=" h-auto object-contain"
                alt="login with Gmail"
                height={18}
                width={18}
              />
              <p className="text-[12px] 2xl:text-[13px]">Gmail</p>
            </button>

            {/* 
            <button
              type="button"
              onClick={() => handleLoginWith("apple")}
              className="flex justify-center cursor-pointer py-[10px] rounded-full px-4 text-owhite bg-[#000000] items-center gap-3"
            >
              <Image src={Apple} className=" h-auto object-contain" alt="login with Apple" height={25} width={25} />
              <p className="text-[12px] 2xl:text-[13px]">Apple</p>
            </button>
            */}
          </div>

          <button className="w-[80%] mt-4 self-center capitalize rounded-full py-[10px] text-[12px] 2xl:text-[13px] bg-[#00ADC9] text-owhite flex justify-center items-center border transition-all duration-[300ms] border-owhite hover:bg-owhite hover:text-[#000000] hover:border-[#99ADC9] cursor-pointer ">
            {t("signin")}
          </button>

          <div className="self-center mt-3 mb-3 flex justify-center gap-9 items-center text-[12px] 2xl:text-[13px] ">
            <span>{t("not_member")}</span>
            <button
              onClick={(e) => setActive(0)}
              className="text-[13px] 2xl:text-[14px]  text-opink capitalize cursor-pointer"
            >
              {t("signup")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPopup;
