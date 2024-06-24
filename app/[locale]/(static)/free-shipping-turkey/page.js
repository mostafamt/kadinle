import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";

export const metadata = { title: "KADINLE | Free shipping turkey" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Free_Shipping_in_turkey")} />
      <div className="flex flex-col poppins   md:max-w-full md:mx-auto w-full static md:pb-2">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px] md:max-w-full">
            <h2 className="font-semibold text-sm text-black mb-2 mt-4">
              {t("shipping_turkey_ms1")}
            </h2>
            <p>{t("shipping_turkey_ms2")}</p>
            <p>{t("shipping_turkey_ms3")}</p>
            <h3 className="font-semibold text-sm text-black mb-2 mt-4">
              {t("shipping_turkey_ms4")}
            </h3>
            <p>{t("shipping_turkey_ms5")}</p>
            <h3 className="font-semibold text-sm text-black mb-2 mt-4">
              {t("shipping_turkey_ms6")}
            </h3>
            <p className="text-indent">{t("shipping_turkey_ms7")}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
