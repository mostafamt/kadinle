import { supabase } from "@/app/api/supabase/supabase.config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import React, { useContext } from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = { title: "KADINLE | Retrieval and mechanism" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("thankYouForChoosing")} />
      <div className="flex flex-col poppins pb-[120px] md:max-w-[575px] md:mx-auto w-full">
        <h2 className="text-opink mx-auto w-fit my-2 text-xs">
          <span className="block text-center">{t("thanks_Kadinle")}</span>
          <span className="block text-center">{t("thanks_Kadinle_msg")}</span>
        </h2>

        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3">
              <h3 className="text-black font-[500]">{t("howCanReturn")}</h3>
            </div>

            {/* <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">
                {t("wishExchange")}
                <Link href="/support" className="text-opink">
                  {t("return_order_msg2")}
                </Link>
                {t("return_order_msg3")}
              </p>
            </div> */}

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">
                {t("logInTo")}
                <Link
                  href={user ? "/profile" : "/login"}
                  className="text-opink font-[500]"
                >
                  {t("yourAccount")}
                </Link>
                {t("inKadinle")}
              </p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("submitRequestReturn")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("deliverProductNearest")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("shipmentDetailsTracking")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("whenReceiveReturned")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("yourFundsReturned")}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
