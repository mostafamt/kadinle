import { getTranslations } from "next-intl/server";
import Image from "next/image";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";
import { MainTitle } from "../../components/global/MainTitle";
import {unstable_setRequestLocale} from 'next-intl/server';

const about1 = "https://kadinle.com/media/images/about1.png";
const about2 = "https://kadinle.com/media/images/about2.png";
const about3 = "https://kadinle.com/media/images/about3.png";

export const metadata = {
  title: "KADINLE | About us",
};

const AboutPage = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <div className="flex flex-col poppins mb-10 about-parent">
        <MainTitle title={t("About_Kadinle")} />

        <div className="flex justify-center mt-7 ">
          <div className="flex flex-col container mx-auto">
            <div className="flex items-center justify-center gap-8 lg:gap-[100px] flex-wrap">
              <div className="min-w-[45%] par-img">
                <Image
                  className="w-full object-contain h-auto"
                  alt="about image 1"
                  src={about1}
                  height={450}
                  width={500}
                />
              </div>

              <div className="flex flex-col mt-14">
                <div className="flex ml-8   ">
                  <div className="flex justify-center items-center h-[22px]">
                    <div className="min-w-[18px] h-[18px] 2xl:min-w-[18px] 2xl:h-[18px] rounded-full bg-opink ltr:mr-[6px] rtl:ml-[6px]"></div>
                  </div>
                  <h3 className="leading-[22px] text-[14px] md:text-[20px] font-medium">
                    {t("about_msg1")}
                  </h3>
                </div>
                <div className="flex ml-[65px]  mt-3">
                  <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                  <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                    {t("about_msg2")}
                  </p>
                </div>
                <div className="flex ml-[65px]  mt-1 ">
                  <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                  <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                    {t("about_msg3")}
                  </p>
                </div>
                <div className="flex ml-[65px]  mt-1 ">
                  <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                  <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                    {t("about_msg4")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* second */}
        <div className="w-full bg-[#F8F9FA] flex justify-center mt-5 py-10 pt-6 ">
          <div className="flex items-center justify-between gap-8 lg:gap-[100px] flex-wrap container mx-auto mob-dir-sec2">
            <div className="flex flex-col ">
              <div className="flex ml-8">
                <div className="flex justify-center items-center h-[22px]">
                  <div className="min-w-[18px] h-[18px] 2xl:min-w-[18px] 2xl:h-[18px] rounded-full bg-opink ltr:mr-[6px] rtl:ml-[6px]"></div>
                </div>
                <h3 className="leading-[22px] text-[14px] md:text-[20px] font-medium">
                  {t("Our_team")}
                </h3>
              </div>
              <div className="flex ml-[65px]  mt-3">
                <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                  {t("about_msg5")}
                </p>
              </div>
              <div className="flex ml-[65px]  mt-1 ">
                <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                  {t("about_msg6")}
                </p>
              </div>
              <div className="flex ml-[65px]  mt-1 ">
                <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                  {t("about_msg7")}
                </p>
              </div>
            </div>

            <div className="min-w-[45%] par-img">
              <Image
                className="w-full object-contain h-auto"
                alt="about image 2"
                src={about2}
                height={450}
                width={500}
              />
            </div>
          </div>
        </div>

        {/* third */}
        <div className="w-full flex justify-center container mx-auto">
          <div className="flex items-center justify-between gap-8 lg:gap-[100px] flex-wrap mt-10 container max-w-[1500px]">
            <div className="min-w-[45%] par-img">
              <Image
                className="w-full object-contain h-auto"
                alt="about image 3"
                src={about3}
                height={450}
                width={500}
              />
            </div>

            <div className="flex flex-col mt-14">
              <div className="flex ml-8   ">
                <div className="flex justify-center items-center h-[22px]">
                  <div className="min-w-[18px] h-[18px] 2xl:min-w-[18px] 2xl:h-[18px] rounded-full bg-opink ltr:mr-[6px] rtl:ml-[6px]"></div>
                </div>
                <h3 className="leading-[22px] text-[14px] md:text-[20px] font-medium">
                  {t("about_msg8")}
                </h3>
              </div>
              <div className="flex ml-[65px]  mt-3">
                <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                  {t("about_msg9")}
                </p>
              </div>
              <div className="flex ml-[65px]  mt-1 ">
                <p className="text-opink ltr:mr-[6px] rtl:ml-[6px]">-{ }</p>
                <p className="text-[12px] md:text-[14px] 2xl:text-[15px]">
                  {t("about_msg10")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
