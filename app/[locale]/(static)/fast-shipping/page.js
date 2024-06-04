import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = {
  title: "KADINLE | Fast shipping",
};

const Fast1 = "https://kadinle.com/media/images/Fast1.svg";
const Fast2 = "https://kadinle.com/media/images/Fast2.svg";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("fastShipping")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3 self-center">
              <h2 className="text-black font-semibold text-center">
                {t("fast_shipping_msg0")}
              </h2>
              <div className="bg-opink h-[2px] w-[25px]"></div>
            </div>

            <div className="self-center mt-6">
              <Image
                src={Fast1}
                alt="fast shipping photo"
                height={250}
                width={400}
              />
            </div>

            <p className="text-black font-semibold text-center mt-4">
              {t("fast_shipping_msg1")}
            </p>

            <p className="mt-2 leading-[24px]">{t("fast_shipping_msg2")}</p>

            <p className="text-black mt-3 leading-[24px]">
              <span className="text-opink font-[500]">
                {t("Inside_Turkey")}
              </span>
              :{t("fast_shipping_msg2")}
            </p>

            <p className="text-black mt-1 leading-[24px]">
              <span className="text-opink font-[500]">
                {t("Outside_Turkey")}
              </span>
              :{t("fast_shipping_msg3")}
            </p>
          </div>
        </div>

        <div className="flex justify-center text-[12px] text-[#707070] bg-[#F8F8F8] mt-3 py-2">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src={Fast2}
                alt="fast shipping photo"
                height={250}
                width={400}
              />
            </div>

            <p className="text-black font-semibold text-center mt-4">
              {t("Accurate_Tracking_System")}
            </p>

            <p className="mt-2 leading-[24px] text-black">
              {t("fast_shipping_msg7")}
            </p>
            <p className="leading-[24px] text-black">
              {t("fast_shipping_msg8")}
            </p>

            <p className="mt-3 leading-[24px] text-black">
              {t("fast_shipping_msg9")}
              <Link
                href="/shipping-policy-turkey"
                className="text-opink font-[500]"
              >
                {t("Shipping_policy")}
              </Link>
            </p>

            <Link
              href="/"
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
