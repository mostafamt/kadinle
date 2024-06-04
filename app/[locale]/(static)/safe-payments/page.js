import React from "react";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "KADINLE | Safe payments" };

const americanExpress = "https://kadinle.com/media/images/americanExpress.png";
const applePay = "https://kadinle.com/media/images/applePay.png";
const background = "https://kadinle.com/media/images/background.png";
const googlePay = "https://kadinle.com/media/images/googlePay.png";
const mastercard2 = "https://kadinle.com/media/images/mastercard2.png";
const Safe1 = "https://kadinle.com/media/images/Safe1.png";
const Safe2 = "https://kadinle.com/media/images/Safe2.svg";
const visa = "https://kadinle.com/media/images/visa.png";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Safe_Payments")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3 self-center">
              <h2 className="text-black font-semibold text-center">
                {t("Shop_with_confidence")}
              </h2>
              <div className="bg-opink h-[2px] w-[25px]"></div>
            </div>

            <div className="self-center mt-6">
              {/* <Best1/> */}
              <Image
                src={Safe1}
                alt="safe payment image 1"
                className="object-contain w-full"
                height={240}
                width={320}
              />
            </div>

            <p className="text-black font-semibold text-center mt-4">
              {t("safe_payment_text1")}
            </p>

            <p className="mt-2 leading-[24px] text-center px-4">
              {t("safe_payment_text2")}
            </p>

            <div className="flex gap-6 self-center items-center mt-2">
              <Image
                className="w-[25px] object-contain"
                src={mastercard2}
                alt="mastercard2"
                height={25}
                width={25}
              />
              <Image
                className="w-[23px] object-contain"
                src={googlePay}
                alt="googlePay"
                height={25}
                width={23}
              />
              <Image
                className="w-[40px] object-contain"
                src={applePay}
                alt="applePay"
                height={25}
                width={40}
              />
              <Image
                className="w-[25px] object-contain"
                src={americanExpress}
                alt="americanExpress"
                height={25}
                width={25}
              />
              <Image
                className="w-[30px] object-contain"
                src={visa}
                alt="visa"
                height={25}
                width={30}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center text-[12px] text-[#707070] bg-[#F8F8F8] mt-3 py-2">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src={Safe2}
                alt="safe payments image 2"
                className="object-contain w-full"
                height={240}
                width={320}
              />
            </div>

            <p className="text-black font-semibold text-center mt-4">
              {t("safe_payment_text3")}
            </p>

            <p className="mt-2 leading-[24px] text-center px-4">
              {t("safe_payment_text4")}
            </p>
          </div>
        </div>

        <div className="flex justify-center text-[12px] text-[#707070] mt-2">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center mt-3">
              {/* <Safe3/> */}
              <Image
                src={Safe1}
                className="object-contain w-full"
                height={240}
                width={320}
              />
            </div>

            <p className="text-black font-semibold text-center mt-4">
              {t("safe_payment_text5")}
            </p>

            <p className="mt-2 leading-[24px] text-center px-4">
              {t("safe_payment_text6")}
            </p>

            <Link
              href="/new-arrivals"
              className="self-center mt-4 flex justify-center items-center bg-opink rounded-full text-owhite w-[45%] py-2"
            >
              {t("SHOP_NOW")}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
