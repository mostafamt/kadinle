import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";
import { MainTitle } from "../../components/global/MainTitle";
import { ShopNowBtn } from "../../components/global/ShopNowBtn";


const Best1 = "https://kadinle.com/media/images/Best1.svg";
const Best2 = "https://kadinle.com/media/images/Best2.svg";
const Best3 = "https://kadinle.com/media/images/Best3.svg";

export const metadata = {
  title: "KADINLE | Best Quality",
};

const BestQualityPage = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
     <ScrollUpComponent />
      <div className="flex flex-col poppins mb-10">
        <MainTitle title={t("Best_Quality")} />

        <div className="flex flex-col space-y-[1px] self-center mt-8">
          <h2 className="text-[18px] lg:text-[20px] 2xl:text-[30px]">
            {t("Kadinle_Quality")}
          </h2>
          <div className="bg-opink w-[67px] 2xl:w-[100px] h-[8px] rounded-xl "></div>
        </div>

        <div className="flex justify-center mt-7 container mx-auto">
          <div className="flex flex-col container max-w-[1500px]">
            <div className="flex items-center justify-between gap-8 lg:gap-[100px]">
              <div className="flex flex-col text-[12px] md:text-[14px] 2xl:text-[15px] max-w-[600px]">
                <div className="flex  ">
                  <div className="flex justify-center items-center h-[22px]">
                    <div className="min-w-[18px] h-[18px] 2xl:min-w-[18px] 2xl:h-[18px] rounded-full bg-opink ltr:mr-[6px] rtl:ml-[6px]"></div>
                  </div>
                  <p className="leading-[22px] text-[14px] md:text-[20px]">
                    {t("Fabricated_to_last")}
                  </p>
                </div>
                <p className="mt-3">{t("Best_quality_msg1")}</p>
              </div>

              <div className="min-w-[35%]">
                <Image
                  src={Best1}
                  alt="best quality image 1"
                  className="w-full h-auto object-contain"
                  height={180}
                  width={240}
                />
              </div>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="w-full bg-[#F8F9FA] flex justify-center mt-5 py-10 pt-6">
          <div className="flex items-center justify-between gap-8 lg:gap-[100px]  container mx-auto">
            <div className="min-w-[30%]">
              <Image
                src={Best2}
                alt="best quality image 1"
                className="w-full h-auto object-contain"
                height={180}
                width={240}
              />
            </div>

            <div className="flex flex-col  text-[12px] md:text-[14px] 2xl:text-[15px] max-w-[600px]">
              <div className="flex  ">
                <div className="flex justify-center items-center h-[22px]">
                  <div className="min-w-[18px] h-[18px] 2xl:min-w-[18px] 2xl:h-[18px] rounded-full bg-opink ltr:mr-[6px] rtl:ml-[6px]"></div>
                </div>
                <p className="leading-[22px] text-[14px] md:text-[20px]">
                  {t("We_give_you_the_best")}
                </p>
              </div>
              <p className="mt-4">{t("Best_quality_msg2")}</p>
            </div>
          </div>
        </div>

        {/* Third */}

        <div className="flex justify-center mt-7">
          <div className="flex flex-col container mx-auto">
            <div className="flex items-center justify-between gap-8 lg:gap-[100px]">
              <div className="flex flex-col text-[12px] md:text-[14px] 2xl:text-[15px] max-w-[600px]">
                <div className="flex  ">
                  <div className="flex justify-center items-center h-[22px]">
                    <div className="min-w-[18px] h-[18px] 2xl:min-w-[18px] 2xl:h-[18px] rounded-full bg-opink ltr:mr-[6px] rtl:ml-[6px]"></div>
                  </div>
                  <h3 className="leading-[22px] text-[14px] md:text-[20px]">
                    {t("Best_quality_msg3")}
                  </h3>
                </div>
                <p className="mt-3">
                  {t("Best_quality_msg4")}{" "}
                  <Link href="/size-guide" className="text-opink">
                    {t("Best_quality_msg5")}
                  </Link>
                  {locale === "tr" ? <> {t("Best_quality_msg6")} </> : null}
                </p>

                <di v className="flex mt-10">
                  <ShopNowBtn />
                </di>
              </div>

              <div className="min-w-[35%]">
                <Image
                  src={Best3}
                  alt="best quality image 1"
                  className="w-full h-auto object-contain"
                  height={180}
                  width={240}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BestQualityPage;
