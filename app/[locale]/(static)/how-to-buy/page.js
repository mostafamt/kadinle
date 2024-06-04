import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = {
  title: "How to buy",
};

const buy1 = "https://kadinle.com/media/images/buy1.png";
const buy2 = "https://kadinle.com/media/images/buy2.png";
const buy3 = "https://kadinle.com/media/images/buy3.png";
const buy4 = "https://kadinle.com/media/images/buy4.png";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("how_buy_msg10")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3">
              <h2 className="text-black font-semibold">{t("how_buy_msg")}</h2>
              <div className="bg-opink h-[2px] w-[25px]"></div>
            </div>

            <p className="mt-1 leading-[24px] text-black  ltr:ml-2  rtl:mr-2">
              <span className="text-opink">1-</span>
              {t("how_buy_msg2")}
              <span className=" font-semibold px-1">{t("add_to_cart")}</span>
              {t("add_to_cart_turkey")}
            </p>

            <div className="self-center">
              <Image
                className="w-[150px] mt-2 ltr:ml-2  rtl:mr-2 object-contain"
                src={buy1}
                alt="how to buy image 1"
                height={180}
                width={200}
              />
            </div>

            <h3 className="mt-4 text-black ">
              <span className="text-opink">2-</span>
              {t("how_buy_msg3")}
            </h3>

            <div className="self-center">
              <Image
                className="w-[150px] mt-2 ltr:ml-2  rtl:mr-2 object-contain"
                src={buy2}
                alt="how to buy image 2"
                height={180}
                width={200}
              />
            </div>

            <p className="mt-3 text-black ">
              <span className="text-opink">3-</span>
              {t("how_buy_msg41")}{" "}
              <span className="font-semibold">{t("how_buy_msg42")}</span>
              {t("how_buy_msg43")}
            </p>
            <p className="mt-1 mb-3">
              <span className="text-opink">{t("note")}: </span>
              {t("how_buy_msg44")}
            </p>

            <div className="self-center">
              <Image
                className="w-[260px] mt-2 ltr:ml-2  rtl:mr-2 object-contain"
                src={buy3}
                alt="how to buy image 3"
                height={140}
                width={260}
              />
            </div>

            <h3 className="mt-3 text-black ">
              <span className="text-opink">4-</span>
              {t("how_buy_msg5")}
            </h3>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3 text-black mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("how_buy_msg6")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3 text-black mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("how_buy_msg7")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3 text-black mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("how_buy_msg8")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3 text-black mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("how_buy_msg9")}</p>
            </div>

            <div className="self-center">
              <Image
                className="w-[150px] mt-2 ltr:ml-2  rtl:mr-2 object-contain"
                src={buy4}
                alt="how to buy image 4"
                height={180}
                width={200}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
