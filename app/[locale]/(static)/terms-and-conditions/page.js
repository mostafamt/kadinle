import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("terms_and_conditions");
  return {
    title: `${locale === "ar" ? "كادينلي" : "KADINLE"} | ${t(
      "terms_conditions"
    )}`,
    description: t("terms_description_1"),
  };
}

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("terms_and_conditions");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("terms_conditions")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full text-xs">
        <ul className="flex gap-2 flex-col list-disc px-4 my-4 text-xs">
          <li>
            <h3 className="text-xs font-medium text-black mb-2">
              {t("terms_list_title_1")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_1")}
                </span>
                {t("terms_description_1")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_2")}
                </span>
                {t("terms_description_2")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_2")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_3")}
                </span>
                {t("terms_description_3")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_4")}
                </span>
                {t("terms_description_4")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_3")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_5")}
                </span>
                {t("terms_description_5")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_6")}
                </span>
                {t("terms_description_6")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_7")}
                </span>
                {t("terms_description_7")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_4")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_8")}
                </span>
                {t("terms_description_8")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_9")}
                </span>
                {t("terms_description_9")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_5")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_10")}
                </span>
                {t("terms_description_10")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_11")}
                </span>
                {t("terms_description_11")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_6")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_12")}
                </span>
                {t("terms_description_12")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_13")}
                </span>
                {t("terms_description_13")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_7")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_14")}
                </span>
                {t("terms_description_14")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_8")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_15")}
                </span>
                {t("terms_description_15")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_16")}
                </span>
                {t("terms_description_16")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_9")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_17")}
                </span>
                {t("terms_description_17")}
              </li>
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_18")}
                </span>
                {t("terms_description_18")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_10")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_19")}
                </span>
                {t("terms_description_19")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_11")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_21")}
                </span>
                {t("terms_description_21")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_12")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_22")}
                </span>
                {t("terms_description_22")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_13")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_23")}
                </span>
                {t("terms_description_23")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_14")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_24")}
                </span>
                {t("terms_description_24")}
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-xs font-medium text-black mb-2 mt-4">
              {t("terms_list_title_15")}
            </h3>
            <ul className="flex flex-col gap-2 list-decimal px-4">
              <li>
                <span className="underline text-black font-medium">
                  {t("terms_mark_25")}
                </span>
                {t("terms_description_25")}
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-black text-xs mt-4">
          {" "}
          {t("terms_conditions_description")}
        </p>
      </div>
    </Layout>
  );
};

export default page;
