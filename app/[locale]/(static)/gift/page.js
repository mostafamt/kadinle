import {
  replaceManyWordsWithLink,
  replaceTextWithLink,
} from "@/app/api/lib/functions";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = {
  title: "Gift",
};

const Gift1 = "https://kadinle.com/media/images/Gift1.svg";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("gift")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src={Gift1}
                alt="gift photo"
                className="object-contain w-full"
                height={350}
                width={350}
              />
            </div>
            <div className="flex flex-col mt-3">
              <h2 className="text-black text-sm">{t("gift_msg1")}</h2>
              <div className="bg-opink h-[2px] w-[30px]"></div>
            </div>

            <p className="mt-1 leading-[24px]">{t("gift_msg2")}</p>

            <p className="text-black mt-3 font-medium">{t("gift_msg3")}</p>

            <p className="mt-1 leading-[24px]">{t("gift_msg4")}</p>

            <p className="mt-1 leading-[24px]">{t("gift_msg5")}</p>

            <p className="mt-1 leading-[24px] text-indent text-opink font-[500]">
              {t("gift_msg6")}
            </p>

            <p className="mt-1 leading-[24px] text-indent-two">
              - {t("gift_msg7")}
            </p>

            <p className="mt-1 leading-[24px] text-indent-two">
              - {t("gift_msg8")}
            </p>

            <p className="mt-1 leading-[24px] text-indent-two">
              - {t("gift_msg9")}
            </p>

            <p className="mt-5 leading-[24px] font-medium">{t("gift_msg10")}</p>

            <p className="leading-[24px] text-indent">
              <span className="text-black">{t("gift_msg11")}</span>
              {t("gift_msg12")}
            </p>

            <p className="leading-[24px] text-indent">
              <span className="text-black">{t("gift_msg13")}</span>:
              {t("gift_msg14")}
            </p>

            <p className="mt-5 leading-[24px] text-opink font-[500]">
              {t("Purchase_Vouchers")}
            </p>

            <p className=" leading-[24px]">{t("gift_msg15")}</p>

            <p className="mt-5 leading-[24px] text-opink font-[500]">
              {t("gift_msg16")}
            </p>

            <p className=" leading-[24px]">{t("gift_msg17")}</p>

            <h4 className="text-black mt-5 leading-[24px] font-medium">
              {t("gift_msg18")}
            </h4>
            <p className="mt-1 leading-[24px]">
              1-{" "}
              {replaceTextWithLink(
                t("gift_msg19"),
                `{LINK}`,
                t("gift_msg19_link"),
                "/"
              )}
            </p>
            <p className="mt-1 leading-[24px]">2- {t("gift_msg20")}</p>
            <p className="mt-1 leading-[24px]">3- {t("gift_msg21")}</p>
            <p className="mt-1 leading-[24px]">4- {t("gift_msg22")}</p>
            <p className="mt-1 leading-[24px]">5- {t("gift_msg24")}</p>
            <p className="mt-1 leading-[24px]">6- {t("gift_msg25")}</p>

            <p className="text-black mt-5 leading-[24px] font-medium">
              {t("gift_msg26")}
            </p>
            <p className=" leading-[24px]">{t("gift_msg27")}</p>

            <p className="text-black mt-5 leading-[24px] font-medium">
              {t("gift_msg28")}
            </p>
            <p className=" leading-[24px]">{t("gift_msg29")}</p>

            <h4 className="mt-5 leading-[24px] text-opink font-[500]">
              {t("gift_msg30")}
            </h4>
            <p className=" leading-[24px]">- {t("gift_msg31")}</p>
            <p className=" leading-[24px]">- {t("gift_msg32")}</p>
            <p className=" leading-[24px]">- {t("gift_msg33")}</p>
            <p className=" leading-[24px]">- {t("gift_msg34")}</p>
            <p className=" leading-[24px]">- {t("gift_msg35")}</p>
            <p className=" leading-[24px]">- {t("gift_msg36")}</p>
            <p className=" leading-[24px]">
              - {t("gift_msg37")}
              <Link href="/send-gift" className="text-opink underline">
                ({t("gift_msg38")})
              </Link>
            </p>

            <h4 className="text-black mt-5 leading-[24px] font-medium">
              {t("gift_msg39")}
            </h4>
            <p className="leading-[24px]">- {t("gift_msg40")}</p>
            <p className="leading-[24px]">- {t("gift_msg41")}</p>
            <p className=" leading-[24px]">- {t("gift_msg42")}</p>
            <p className="leading-[24px]">- {t("gift_msg43")}</p>
            <p className=" leading-[24px]">- {t("gift_msg44")}</p>
            <p className="leading-[24px]">- {t("gift_msg45")}</p>
            <p className=" leading-[24px]">- {t("gift_msg46")}</p>
            <p className="leading-[24px]">- {t("gift_msg47")}</p>
            <p className=" leading-[24px]">- {t("gift_msg48")}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
