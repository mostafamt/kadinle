import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = { title: "KADINLE | Shipping policy international" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("shippingPolicyTitle")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <h2 className="text-[13px] mt-3 text-black font-medium">
              {t("shippingPolicySubtitle1")}
            </h2>

            <div className="flex gap-2 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("shippingPolicySection1")}</p>
            </div>

            <p className="mt-10 text-black font-medium">
              {t("shippingPolicySection2")}
            </p>

            <div className="flex gap-3 mt-3 ltr:ml-3 rtl:mr-3">
              <p>1-</p>
              <p>{t("shippingPolicySection2Item1")}</p>
            </div>
            <div className="flex gap-3 mt-1 ltr:ml-3 rtl:mr-3">
              <p>2-</p>
              <p>{t("shippingPolicySection2Item2")}</p>
            </div>

            {/* <p className="mt-4">
              <span className="text-opink font-[700]">
                {t("Note")}:
              </span>{" "}
              {t("review_msg")}
            </p> */}

            <p className="mt-4 text-black font-medium">{t("Delivery")}:</p>
            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shippingPolicyDeliverySection1")}
              </p>
            </div>
            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shippingPolicyDeliverySection2")}
              </p>
            </div>
            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shippingPolicyDeliverySection3")}
              </p>
            </div>
            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shippingPolicyDeliverySection4")}
              </p>
            </div>
            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shippingPolicyDeliverySection5")}
              </p>
            </div>
            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("shippingPolicyDeliverySection6")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
