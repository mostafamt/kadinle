import React from "react";
import Layout from "../../components/layout/Layout";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";

export const metadata = { title: "KADINLE | Free shipping international" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Free_Shipping_international")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3 mb-1">
              <h2 className="text-black font-semibold text-sm">
                {t("Free_Shipping")}
              </h2>
              <div className="bg-opink h-[2px] w-[27px]"></div>
            </div>
            <p>{t("Free_Shipping_msg2")}</p>
            <p>{t("Free_Shipping_msg3")}</p>
            <h3 className="text-black font-medium mt-4 mb-1">
              {t("Free_Shipping_msg4")}
            </h3>
            <p>{t("Free_Shipping_msg5")}</p>
            <h3 className="text-black font-medium mt-4 mb-1">
              {t("Free_Shipping_msg6")}
            </h3>
            <p className="text-indent">{t("Free_Shipping_msg7")}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
