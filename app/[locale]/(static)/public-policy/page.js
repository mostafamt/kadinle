import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("public_policy_page");
  return {
    title: `${locale === "ar" ? "كادينلي" : "KADINLE"} | ${t("public_policy")}`,
    description: t("introductions_msg_1"),
  };
}

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("public_policy_page");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("public_policy")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full text-xs">
        <h2 className="text-primary font-medium text-sm mt-6">
          {t("introductions")}
        </h2>
        <ul className="flex gap-2 flex-col list-disc px-4 my-4 text-xs">
          <li>{t("introductions_msg_1")}</li>
          <li>{t("introductions_msg_2")}</li>
          <li>{t("introductions_msg_3")}</li>
          <li>{t("introductions_msg_4")}</li>
        </ul>

        <h2 className="text-primary font-medium text-sm mt-6">
          {t("visions_title")}
        </h2>
        <ul className="flex gap-2 flex-col list-disc px-4 my-4 text-xs">
          <li>
            <h3 className="text-xs font-medium text-black mb-1">
              {t("visions")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("visions_mark_1")}
                </span>
                {t("visions_description_1")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("visions_mark_2")}
                </span>
                {t("visions_description_2")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("visions_mark_3")}
                </span>
                {t("visions_description_3")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("visions_mark_4")}
                </span>
                {t("visions_description_4")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("visions_mark_5")}
                </span>
                {t("visions_description_5")}
              </li>
            </ul>
          </li>
        </ul>

        <ul className="flex gap-2 flex-col list-disc px-4 my-4 text-xs">
          <li>
            <h3 className="text-xs font-medium text-black mb-1">
              {t("philosophy")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("philosophy_mark_1")}
                </span>
                {t("philosophy_description_1")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("philosophy_mark_2")}
                </span>
                {t("philosophy_description_2")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("philosophy_mark_3")}
                </span>
                {t("philosophy_description_3")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("philosophy_mark_4")}
                </span>
                {t("philosophy_description_4")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("philosophy_mark_5")}
                </span>
                {t("philosophy_description_5")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("philosophy_mark_6")}
                </span>
                {t("philosophy_description_6")}
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-primary font-medium text-sm mt-6">{t("goals")}</h2>
        <p className="text-black text-xs mt-4">{t("goals_description")}</p>
        <ul className="flex gap-2 flex-col list-decimal px-4 my-4 text-xs">
          <li>{t("goals_list_1")}</li>
          <li>{t("goals_list_2")}</li>
          <li>{t("goals_list_3")}</li>
          <li>{t("goals_list_4")}</li>
          <li>{t("goals_list_5")}</li>
          <li>{t("goals_list_6")}</li>
          <li>{t("goals_list_7")}</li>
          <li>{t("goals_list_8")}</li>
          <li>{t("goals_list_9")}</li>
          <li>{t("goals_list_10")}</li>
        </ul>
        {/*  */}
      </div>
    </Layout>
  );
};

export default page;
