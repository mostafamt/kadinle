import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("store_benefits");
  return {
    title: `${locale === "ar" ? "كادينلي" : "KADINLE"} | ${t(
      "store_benefits_title"
    )}`,
    description: t("store_benefits_description"),
  };
}

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("store_benefits");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("store_benefits_title")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full text-xs">
        <ul className="flex gap-2 flex-col list-decimal px-4 my-4 text-xs">
          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_blog")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_blog_description")}
            </p>
            <ul className="px-4 list-disc">
              <li>{t("kadinle_blog_list_1")}</li>
              <li>{t("kadinle_blog_list_2")}</li>
              <li>{t("kadinle_blog_list_3")}</li>
              <li>{t("kadinle_blog_list_4")}</li>
              <li>{t("kadinle_blog_list_5")}</li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_pay")}
            </h3>
            <p className="text-black text-xs">{t("kadinle_pay_description")}</p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_news_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_news_description")}
            </p>
            <p className="text-black text-xs">
              {t("kadinle_news_description2")}
            </p>
            <ul className="px-4 list-disc">
              <li>{t("kadinle_news_list_1")}</li>
              <li>{t("kadinle_news_list_2")}</li>
              <li>{t("kadinle_news_list_3")}</li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_points")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_points_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_family_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_family_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_gift_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_gift_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_shipping_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_shipping_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_clients_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_clients_description")}
            </p>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_send_gift_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_send_gift_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_fast_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_fast_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_return_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_return_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_money_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_money_description")}
            </p>
          </li>

          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_measurable_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_measurable_description")}
            </p>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_sizes_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_sizes_description")}
            </p>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_credit_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_credit_description")}
            </p>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium mt-4">
              {t("kadinle_support_title")}
            </h3>
            <p className="text-black text-xs">
              {t("kadinle_support_description")}
            </p>
          </li>
        </ul>
        <p className="text-black text-xs mb-2">{t("kadinle_guide")}</p>
        <ul className="px-4 list-disc flex flex-col gap-2">
          <li>{t("kadinle_guide_list_1")}</li>
          <li>{t("kadinle_guide_list_2")}</li>
          <li>{t("kadinle_guide_list_3")}</li>
          <li>{t("kadinle_guide_list_4")}</li>
          <li>{t("kadinle_guide_list_5")}</li>
          <li>{t("kadinle_guide_list_6")}</li>
        </ul>
      </div>
    </Layout>
  );
};

export default page;
