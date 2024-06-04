import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("work_mechanism");
  return {
    title: `${locale === "ar" ? "كادينلي" : "KADINLE"} | ${t(
      "work_mechanism_title"
    )}`,
    description: t("work_mechanism_description"),
  };
}

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("work_mechanism");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("work_mechanism_title")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full text-xs">
        <p className="text-black text-xs mt-4 text-center">
          {t("work_mechanism_description")}
        </p>

        <ul className="flex gap-2 flex-col list-decimal px-4 my-4 text-xs">
          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("work_mechanism_list_title_1")}
            </h3>
            <ul className="flex flex-col gap-2 list-disc px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_1")}
                </span>
                {t("work_mechanism_list_description_1")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_2")}
                </span>
                {t("work_mechanism_list_description_2")}
              </li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("work_mechanism_list_title_2")}
            </h3>
            <ul className="flex flex-col gap-2 list-disc px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_3")}
                </span>
                {t("work_mechanism_list_description_3")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_4")}
                </span>
                {t("work_mechanism_list_description_4")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_5")}
                </span>
                {t("work_mechanism_list_description_5")}
              </li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("work_mechanism_list_title_3")}
            </h3>
            <ul className="flex flex-col gap-2 list-disc px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_6")}
                </span>
                {t("work_mechanism_list_description_6")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_7")}
                </span>
                {t("work_mechanism_list_description_7")}
              </li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("work_mechanism_list_title_4")}
            </h3>
            <ul className="flex flex-col gap-2 list-disc px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_8")}
                </span>
                {t("work_mechanism_list_description_8")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_9")}
                </span>
                {t("work_mechanism_list_description_9")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_10")}
                </span>
                {t("work_mechanism_list_description_10")}
              </li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("work_mechanism_list_title_5")}
            </h3>
            <ul className="flex flex-col gap-2 list-disc px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_11")}
                </span>
                {t("work_mechanism_list_description_11")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_12")}
                </span>
                {t("work_mechanism_list_description_12")}
              </li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("work_mechanism_list_title_6")}
            </h3>
            <ul className="flex flex-col gap-2 list-disc px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_13")}
                </span>
                {t("work_mechanism_list_description_13")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_14")}
                </span>
                {t("work_mechanism_list_description_14")}
              </li>
            </ul>
          </li>

          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("work_mechanism_list_title_7")}
            </h3>
            <ul className="flex flex-col gap-2 list-disc px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("work_mechanism_list_marker_15")}
                </span>
                {t("work_mechanism_list_description_15")}
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-black text-xs mt-4">
          {t("work_mechanism_description_2")}
        </p>
      </div>
    </Layout>
  );
};

export default page;
