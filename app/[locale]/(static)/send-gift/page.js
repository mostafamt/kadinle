import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "KADINLE | Send gift" };

const Gift3 = "https://kadinle.com/media/images/Gift3.svg";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Send_gift")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src={Gift3}
                className="w-[200px] object-contain"
                alt="Send gift"
                height={200}
                width={200}
              />
            </div>

            <div className="flex flex-col mt-3">
              <h2 className="text-black text-sm">{t("send_gift_text1")}</h2>
              <div className="bg-opink h-[2px] w-[30px]"></div>
            </div>

            <p className="mt-2 leading-[24px]">{t("send_gift_text2")}</p>

            <h2 className="mt-5 leading-[24px] text-black font-[500]">
              {t("send_gift_text4")}
            </h2>

            <h3 className=" leading-[24px]">{t("send_gift_text5")}</h3>

            <p className="mt-1 leading-[24px] ltr:ml-8 rtl:mr-8">
              1- {t("send_gift_text6")}
            </p>
            <p className="mt-1 leading-[24px] ltr:ml-8 rtl:mr-8">
              2- {t("send_gift_text7")}
            </p>
            <p className="leading-[24px]">
              {t("send_gift_text8")}{" "}
              <Link href="/cart" className="text-opink">
                {t("click_here")}
              </Link>
            </p>

            <h3 className="mt-5 leading-[24px] text-black font-[500]">
              {t("send_gift_text9")}
            </h3>

            <p className=" leading-[24px] text-indent">
              1- {t("send_gift_text10")}
            </p>
            <p className=" leading-[24px] mt-1 text-indent">
              2- {t("send_gift_text11")}
            </p>
            <p className=" leading-[24px] mt-1 text-indent">
              3- {t("send_gift_text12")}
            </p>

            <p className="mt-5 leading-[24px] text-black font-[500]">
              {t("send_gift_text13")}
            </p>

            <p className="mt-5 leading-[24px] text-black font-[500]">
              1- {t("send_gift_text14")}
            </p>

            <p className="leading-[24px] text-indent">
              2- {t("send_gift_text15")}
            </p>
            <p className="leading-[24px] text-indent">
              {t("send_gift_text16")}
            </p>

            <p className="leading-[24px] text-indent">
              3- {t("send_gift_text17")}
            </p>

            <p className="leading-[24px] text-indent">
              4- {t("send_gift_text18")}
            </p>
            <p className="leading-[24px] text-indent">
              5- {t("send_gift_text19")}
            </p>
            <div className="flex gap-4 items-center justify-center mt-4">
              <Link
                href="/new-arrivals"
                className="bg-opink text-white rounded-md p-2 "
              >
                {t("send_products")}
              </Link>
              <Link
                href="/profile?active=wallet"
                className="bg-opink text-white rounded-md p-2 "
              >
                {t("send_money")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
