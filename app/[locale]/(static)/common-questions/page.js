import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import React from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = {
  title: "KADINLE | Common questions",
};

const Page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("common_questions")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        <div className="flex flex-col space-y-[1px] self-center mt-8">
          <p className="text-[18px] lg:text-[20px] 2xl:text-[30px]">
            {t("weCareAboutYou")}
          </p>
          <div className="bg-opink w-[67px] 2xl:w-[100px] h-[8px] rounded-xl "></div>
        </div>
        <div className="container mt-8">
          <ul className="list-decimal px-6 text-xs flex flex-col gap-4">
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold mb-1">{t("q1")}</h4>
              <p>
                {t("answer1")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("answer1_1")}
                </Link>
                {t("answer1_2")}
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold mb-1">{t("q2")}</h4>
              <p>{t("q2_subtitle")}</p>
              <ul className="list-disc text-xs px-4 my-1">
                <li>
                  {t("answer2")}
                  <Link className="text-opink px-1 font-medium" href="/profile">
                    {t("answer2_link")}
                  </Link>
                  {/* {t("answer2_turkey")} */}
                </li>
                <li>
                  {t("answer2_1")}
                  <span className="mx-1 font-semibold">
                    {t("answer2_link")}
                  </span>
                  {/* {t("answer2_1_turkey")} */}
                </li>
                <li>{t("answer2_2")}</li>
                <li>{t("answer2_3")}</li>
              </ul>
              <p>{t("q2_note")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q3")}</h4>
              <p>{t("answer3_1")}</p>
              <p>{t("answer3_2")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q4")}</h4>
              <p>
                {t("answer4")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("myOrders")}{" "}
                </Link>
              </p>
              <p>{t("answer4_1")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q5")}</h4>
              <p>
                {t("answer5")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("myOrders")}{" "}
                </Link>
                {t("answer5_0")}
              </p>
              <ul className="flex flex-col gap-1 list-decimal py-2 px-8">
                <li>{t("answer5_1")}</li>
                <li>{t("answer5_2")}</li>
                <li>{t("answer5_3")}</li>
                <li>{t("answer5_4")}</li>
              </ul>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q6")}</h4>
              <p>
                {t("answer6")}
                {t("answer6_1")}
                {t("answer6_2")}
              </p>
              <ul className="py-2 px-8 gap-1 flex flex-col list-decimal">
                <li>{t("answer6_3")}</li>
                <li>{t("answer6_4")}</li>
                <li>{t("answer6_5")}</li>
                <li>{t("answer6_6")}</li>
                <li>{t("answer6_7")}</li>
                <li>{t("answer6_8")}</li>
                <li>{t("answer6_9")}</li>
              </ul>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q7")}</h4>
              <p>{t("answer7")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q8")}</h4>
              <p>{t("answer8")}</p>
              <ul className="flex flex-col gap-1 list-decimal my-2 px-8">
                <li>
                  <p>{t("answer8_1")}</p>
                </li>
                <li>
                  <p>{t("answer8_2")}</p>
                </li>
              </ul>
              <p>{t("answer8_3")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q9")}</h4>
              <p>{t("answer9")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q10")}</h4>
              <p>{t("answer10")}</p>
              <ul className="flex flex-col gap-1 list-decimal my-2 px-8">
                <li>{t("answer10_1")}</li>
                <li>{t("answer10_2")}</li>
                <li>{t("answer10_3")}</li>
                <li>{t("answer10_4")}</li>
                <li>{t("answer10_5")}</li>
                <li>{t("answer10_6")}</li>
              </ul>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q11")}</h4>
              <p>
                {t("answer11")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("answer11_1")}
                </Link>

                {t("answer11_2")}
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q12")}</h4>
              <p>
                {t("answer12")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("answer11_1")}
                </Link>

                {t("answer12_0")}
              </p>
              <ul className="flex flex-col gap-1 list-decimal my-2 px-8">
                <li>{t("answer12_1")}</li>
                <li>{t("answer12_2")}</li>
                <li>{t("answer12_3")}</li>
              </ul>
              <p>{t("answer12_4")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q13")}</h4>
              <p>
                {t("answer13")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("answer11_1")}
                </Link>

                {t("answer13_0")}
              </p>
              <ul className="flex flex-col gap-1 list-decimal my-2 px-8">
                <li>{t("answer13_1")}</li>
                <li>{t("answer13_2")}</li>
                <li>{t("answer13_3")}</li>
                <li>{t("answer13_4")}</li>
              </ul>
              <p>{t("answer13_5")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q14")}</h4>
              <p>
                {t("answer14")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("myOrders")}{" "}
                </Link>
                {t("answer14_1")}
                <Link
                  className="text-opink px-1 font-medium"
                  href="/shipping-policy-turkey"
                >
                  {t("shipping_policy")}
                </Link>
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q15")}</h4>
              <p>
                {t("answer15")}
                <Link className="text-opink px-1 font-medium" href="/profile">
                  {t("myOrders")}{" "}
                </Link>
                {t("answer15_1")}
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q16")}</h4>
              <ul className="px-8 list-disc flex flex-col gap-1">
                <li>{t("answer16")}</li>
                <li>
                  {t("answer16_1")}
                  <Link className="text-opink px-1 font-medium" href="/return">
                    {t("desc19msg2")}
                  </Link>
                  {t("answer16_2")}
                </li>
              </ul>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q17")}</h4>
              <p>{t("answer17")}</p>
            </li>
            <li className="flex flex-col gap-1">
              <h4 className="text-black font-semibold  mb-1">{t("q18")}</h4>
              <p>
                {t("answer18")}
                {t("answer18_1")}
                {t("answer18_2")}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
