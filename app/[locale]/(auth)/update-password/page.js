"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { updatePassword } from "@/app/api/supabase/auth";
import { InputField } from "../../components/forms/InputField";
import { EyeIcon } from "../../components/Icons/EyeIcon";
import Head from "next/head";
import {unstable_setRequestLocale} from 'next-intl/server';

const Page = ({ params: { locale } }) => {
  
  const t = useTranslations();
  const router = useRouter();
  const { setUserRefresh } = useGlobalOptions();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nonMatchPassword = () => {
    if (password && password !== confirmPassword) {
      setError(t("not_match"));
      return;
    } else {
      setError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password) {
      if (password !== confirmPassword) {
        setError(`not_match`);
        return;
      }
      const res = await updatePassword(password);
      if (!res?.error) {
        setUserRefresh((p) => p);
        setMessage(t("update_password_successfully"));
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError(t("update_password_failed"));
      }
    } else {
      setError(t("fields_error"));
    }
  };

  return (
    <>
      <Head>
        <title>KADINLE | {t("new_password")}</title>
      </Head>

      <div className={`capitalize`}>
        <div className="my-12 mx-auto md:max-w-md w-[80%]">
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

          <div className={`"opacity-[1] gap-4  flex flex-col`}>
            <h3 className="mt-7 text-center text-opink font-semibold mb-4 text-xl capitalize">
              {t("new_password")}
            </h3>
            <InputField
              label={t("new_password_title")}
              placeholder="******************"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                if (confirmPassword && confirmPassword !== e.target.value)
                  setError(t("not_match"));
                else setError("");
                setPassword(e.target.value);
              }}
              iconEnd={
                <button
                  onClick={() => setShowPassword((p) => !p)}
                  className={`absolute top-3 ltr:right-2 rtl:left-2`}
                >
                  <EyeIcon
                    className={`h-5 w-5  ${showPassword ? "text-opink" : ""}`}
                  />
                </button>
              }
            />
            <InputField
              label={t("confirm_password")}
              // fieldClassName="bg-owhite w-full outline-none text-[14px]"
              type={showPassword ? "text" : "password"}
              placeholder="******************"
              value={confirmPassword}
              onFocus={() => setError("")}
              onBlur={nonMatchPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              iconEnd={
                <button
                  onClick={() => setShowPassword((p) => !p)}
                  className={`absolute top-3 ltr:right-2 rtl:left-2`}
                >
                  <EyeIcon
                    className={`h-5 w-5  ${showPassword ? "text-opink" : ""}`}
                  />
                </button>
              }
            />
            <button
              disabled={!password || password !== confirmPassword}
              onClick={onSubmit}
              className="w-[80%] mt-4 self-center rounded-full disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:!border-0 py-[10px] text-[12px] 2xl:text-[13px] bg-opink text-owhite flex justify-center items-center border transition-all duration-[300ms] border-owhite hover:bg-owhite hover:text-black hover:border-opink cursor-pointer "
            >
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
