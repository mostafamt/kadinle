import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Link from "next/link";

export const metadata = { title: "KADINLE | Return" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("return_page_text")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <h2 className="leading-[22px] mt-3 text-black">
              {t("return_page_text2")}
            </h2>

            {/* <div className="flex gap-1 mt-3 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">1-</p>
              <p className="leading-[24px]">
                {t("return_page_text3")}
              </p>
            </div> */}
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">1-</p>
              <p className="leading-[24px]">{t("return_page_text4")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">2-</p>
              <p className="leading-[24px]">{t("return_page_text5")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">3-</p>
              <p className="leading-[24px]">{t("return_page_text6")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">4-</p>
              <p className="leading-[24px]">{t("return_page_text7")}</p>
            </div>

            <p className="leading-[22px] mt-10 text-black font-medium">
              {t("return_page_text8")}
            </p>

            <div className="flex gap-1 mt-3 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">1-</p>
              <p className="leading-[24px]">{t("return_page_text9")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">2-</p>
              <p className="leading-[24px]">{t("return_page_text10")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">3-</p>
              <p className="leading-[24px]">{t("return_page_text11")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">4-</p>
              <p className="leading-[24px]">{t("return_page_text12")}</p>
            </div>

            <p className="leading-[22px] mt-10 text-black font-medium">
              {t("return_page_text13")}
            </p>

            <div className="flex gap-2 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("return_page_text14")}</p>
            </div>

            <div className="flex gap-2 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("return_page_text15")}</p>
            </div>

            {/* <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("return_page_text16")}
              </p>
            </div> */}

            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("return_page_text17")}</p>
            </div>

            <div className="flex gap-2 mt-1 ltr:ml-3 rtl:mr-3">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("return_page_text17")}</p>
            </div>

            <p className="leading-[22px] mt-10 text-black font-medium">
              {t("return_page_text20")}
            </p>

            {/* <div className="flex gap-1 mt-3 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">1-</p>
              <p className="leading-[24px]">
                {t("return_page_text21")}
              </p>
            </div> */}
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">1-</p>
              <p className="leading-[24px]">{t("return_page_text22")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">2-</p>
              <p className="leading-[24px]">{t("return_page_text222")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">3-</p>
              <p className="leading-[24px]">{t("return_page_text23")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">4-</p>
              <p className="leading-[24px]">{t("return_page_text24")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">5-</p>
              <p className="leading-[24px]">{t("return_page_text25")}</p>
            </div>
            <div className="flex gap-1 mt-1 ltr:ml-3 rtl:mr-3">
              <p className="leading-[24px]">6-</p>
              <p className="leading-[24px]">{t("return_page_text26")}</p>
            </div>

            <div className="self-center m-10 w-full flex justify-center">
              <Link
                href="/profile?active=returnOrder"
                className="w-[50%] py-2 bg-opink text-owhite flex justify-center items-center rounded-[5px]"
              >
                {t("return_page_text27")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
