import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("services_privileges");
  return {
    title: `${locale === "ar" ? "كادينلي" : "KADINLE"} | ${t(
      "services_privileges_title"
    )}`,
    description: t("services_privileges_msg"),
  };
}

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("services_privileges");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("services_privileges_title")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full text-xs">
        <p className="text-black text-xs mt-4">
          {t("services_privileges_msg")}
        </p>
        <h2 className="text-black font-medium text-sm mt-6">
          {t("whole_management")}
        </h2>
        <p className="text-black text-xs mt-4">
          {t("whole_management_description")}
        </p>

        <ul className="flex gap-2 flex-col list-decimal px-4 my-4 text-xs">
          <li>{t("whole_management_list_1")}</li>
          <li>{t("whole_management_list_2")}</li>
          <li>{t("whole_management_list_3")}</li>
          <li>{t("whole_management_list_4")}</li>
          <li>{t("whole_management_list_5")}</li>
          <li>{t("whole_management_list_6")}</li>
          <li>{t("whole_management_list_7")}</li>
          <li>{t("whole_management_list_8")}</li>
          <li>{t("whole_management_list_9")}</li>
          <li>{t("whole_management_list_10")}</li>
          <li>{t("whole_management_list_11")}</li>
          <li>{t("whole_management_list_12")}</li>
        </ul>

        <h2 className="text-black font-medium text-sm mt-6">
          {t("periodic_responsibilities_title")}
        </h2>
        <ul className="flex gap-2 flex-col list-disc px-4 my-4 text-xs">
          <li>{t("periodic_responsibilities_list_1")}</li>
          <li>{t("periodic_responsibilities_list_2")}</li>
          <li>{t("periodic_responsibilities_list_3")}</li>
          <li>{t("periodic_responsibilities_list_4")}</li>
          <li>{t("periodic_responsibilities_list_5")}</li>
          <li>{t("periodic_responsibilities_list_6")}</li>
          <li>{t("periodic_responsibilities_list_7")}</li>
          <li>{t("periodic_responsibilities_list_8")}</li>
          <li>{t("periodic_responsibilities_list_9")}</li>
          <li>{t("periodic_responsibilities_list_10")}</li>
          <li>{t("periodic_responsibilities_list_11")}</li>
          <li>{t("periodic_responsibilities_list_12")}</li>
        </ul>

        <h2 className="text-black font-medium text-sm mt-6">
          {t("stock_solutions_title")}
        </h2>
        <p className="text-black text-xs mt-4">{t("stock_solutions_msg")}</p>
        <ul className="flex gap-2 flex-col list-decimal px-4 my-4 text-xs">
          <li>{t("stock_solutions_list_1")}</li>
          <li>{t("stock_solutions_list_2")}</li>
          <li>{t("stock_solutions_list_3")}</li>
        </ul>

        <h2 className="text-black font-medium text-sm mt-6">
          {t("ads_solutions_title")}
        </h2>
        <p className="text-black text-xs mt-4">{t("ads_solutions_msg")}</p>
        <ul className="flex gap-2 flex-col list-decimal px-4 my-4 text-xs">
          <li>{t("ads_solutions_list_1")}</li>
          <li>{t("ads_solutions_list_2")}</li>
          <li>{t("ads_solutions_list_3")}</li>
        </ul>

        <h2 className="text-black font-medium text-sm mt-6">
          {t("development_solutions_title")}
        </h2>
        <p className="text-black text-xs mt-4">
          {t("development_solutions_msg")}
        </p>
        <ul className="flex gap-2 flex-col list-decimal px-4 my-4 text-xs">
          <li>
            <h3 className="text-xs text-black mb-2 font-medium">
              {t("development_solutions_list_1")}
            </h3>
            <ul className="px-4 list-disc">
              <li>{t("development_solutions_sub_1")}</li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium">
              {t("development_solutions_list_2")}
            </h3>
            <ul className="px-4 list-disc">
              <li>{t("development_solutions_sub_2")}</li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium">
              {t("development_solutions_list_3")}
            </h3>
            <ul className="px-4 list-disc">
              <li>{t("development_solutions_sub_3")}</li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium">
              {t("development_solutions_list_4")}
            </h3>
            <ul className="px-4 list-disc">
              <li>{t("development_solutions_sub_4")}</li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium">
              {t("development_solutions_list_5")}
            </h3>
            <ul className="px-4 list-disc">
              <li>{t("development_solutions_sub_5")}</li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs text-black mb-2 font-medium">
              {t("development_solutions_list_6")}
            </h3>
            <ul className="px-4 list-disc">
              <li>{t("development_solutions_sub_6")}</li>
            </ul>
          </li>
        </ul>

        {/*  */}
      </div>
    </Layout>
  );
};

export default page;
