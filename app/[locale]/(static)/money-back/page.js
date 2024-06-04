import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Image from "next/image";
import Link from "next/link";

const About3 = "https://kadinle.com/media/images/About3.svg";
const Money1 = "https://kadinle.com/media/images/Money1.svg";
const Money2 = "https://kadinle.com/media/images/Money2.svg";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Money_Back_Guarantee")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3 self-center">
              <h2 className="text-black font-semibold text-center">
                {t("money_back_msg1")}
              </h2>
              <div className="bg-opink h-[2px] w-[25px]"></div>
            </div>

            <div className="self-center mt-6">
              <Image
                src={Money1}
                alt="money back image 1"
                height={240}
                width={340}
                className="object-contain w-full"
              />
            </div>

            <h2 className="text-black font-semibold text-center mt-4">
              {t("money_back_msg2")}
            </h2>

            <p className="mt-2 leading-[24px] text-center">
              {t("money_back_msg3")}
            </p>
          </div>
        </div>

        <div className="flex justify-center text-[12px] text-[#707070] bg-[#F8F8F8] mt-3 py-2">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src={Money2}
                alt="money back image 1"
                height={240}
                width={340}
                className="object-contain w-full"
              />
            </div>

            <h2 className="text-black font-semibold text-center mt-4">
              {t("money_back_msg4")}
            </h2>

            <p className="mt-2 leading-[24px] text-opink self-center text-center">
              {t("money_back_msg5")}
            </p>
            {/* <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">
                {t("money_back_msg6")}
              </p>
            </div> */}
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg7")}</p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg8")}</p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg9")}</p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg10")}</p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg11")}</p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg12")}</p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg13")}</p>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("money_back_msg14")}</p>
            </div>
            <p>
              {t("money_note_msg")}{" "}
              <Link href="/return" className="text-opink underline">
                {t("Exchange and Return Policy")}
              </Link>{" "}
            </p>
            <Link
              href="/new-arrivals"
              className="self-center mt-4 flex justify-center items-center bg-opink rounded-full text-owhite w-[45%] py-2"
            >
              {t("SHOP_NOW")}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
