import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";

export const metadata = { title: "KADINLE | Shipping policy turkey" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Shipping_policy_in_turkey")} />
      <div className="flex flex-col poppins  pb-[150px] md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <h2 className="text-[13px] mt-3 text-black font-medium">
              {t("Shipping_Policy")}
            </h2>

            <div className="flex gap-2 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("shipping_turkey_msg1")}</p>
            </div>

            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("shipping_turkey_msg2")}</p>
            </div>

            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <p className="leading-[24px]">{t("shipping_turkey_msg3")}</p>
                <p className="leading-[24px] ltr:ml-6 rtl:mr-6">
                  {t("shipping_turkey_msg4")}
                </p>
                <p className="leading-[24px] ltr:ml-6 rtl:mr-6">
                  {t("shipping_turkey_msg5")}
                </p>
                <p className="leading-[24px] ltr:ml-6 rtl:mr-6">
                  {t("shipping_turkey_msg6")}
                </p>
              </div>
            </div>

            <p className="mt-6 text-black font-medium">
              {t("Delivery_Mechanisms")}:
            </p>

            <div className="flex gap-3 mt-2 ltr:ml-2  rtl:mr-2">
              <p>1-</p>
              <p>{t("shipping_turkey_msg7")}</p>
            </div>
            <div className="flex gap-3 mt-1 ltr:ml-2  rtl:mr-2">
              <p>2-</p>
              <p>{t("shipping_turkey_msg8")}</p>
            </div>
            <div className="flex gap-3 mt-1 ltr:ml-2  rtl:mr-2">
              <p>3-</p>
              <p>{t("shipping_turkey_msg9")}</p>
            </div>
            <div className="flex gap-3 mt-1 ltr:ml-2  rtl:mr-2">
              <p>4-</p>
              <p>{t("shipping_turkey_msg10")}</p>
            </div>
            <div className="flex gap-3 mt-1 ltr:ml-2  rtl:mr-2">
              <p>5-</p>
              <p>{t("shipping_turkey_msg11")}</p>
            </div>
            <div className="flex gap-3 mt-1 ltr:ml-2  rtl:mr-2">
              <p>6-</p>
              <p>{t("shipping_turkey_msg12")}</p>
            </div>
            {/* 
            <p className="mt-6 text-black font-medium">
              {t("Delivery_term")}
            </p>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shipping_turkey_msg13")}
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shipping_turkey_msg14")}
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shipping_turkey_msg15")}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
