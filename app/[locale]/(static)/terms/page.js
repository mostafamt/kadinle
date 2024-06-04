import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = { title: "KADINLE | Terms and Conditions" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Terms_of_use")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <p className="mt-2">{t("terms_msg")}</p>
            <p className="mt-6">{t("terms_msg_2")}</p>
            <p>{t("terms_msg_3_3")}</p>
            <h3 className="text-black mt-5 font-medium">{t("terms_msg_3")}</h3>
            <p className="ltr:ml-1 rtl:mr-1 mt-1">{t("terms_msg_4")}</p>
            <p className="ltr:ml-1 rtl:mr-1 mt-1">{t("terms_msg_5")}</p>
            <p className="ltr:ml-1 rtl:mr-1 mt-1">{t("terms_msg_6")}</p>
            <p className="ltr:ml-1 rtl:mr-1 mt-1">{t("terms_msg_note")}</p>

            <p className="mt-1 text-black">{t("terms_msg_17")}</p>

            <p className="text-black mt-5 font-medium">{t("terms_msg_7")}</p>
            <p className="mt-1">{t("terms_msg_8")}</p>
            <p className="ltr:ml-1 rtl:mr-1 mt-1 text-black">
              - {t("terms_msg_9")}
            </p>

            <p className="text-opink mt-5 font-medium">{t("terms_msg_10")}</p>
            <p className="text-black mt-1">{t("terms_msg_11")}</p>
            <p className="text-black mt-1">{t("terms_msg_11_11")}</p>

            <p className="text-opink mt-5 font-medium">{t("terms_msg_14")}</p>
            <p className="text-black mt-1">{t("terms_msg_12")}</p>

            <p className="text-opink mt-5 font-medium">{t("terms_msg_16")}</p>
            <p className="text-black mt-1">{t("terms_msg_13")}</p>
            <p className="mt-1">{t("terms_msg_15")}</p>

            <Link
              href="mailto:support@kadinle.com"
              className="text-opink mt-1 text-[11px]"
            >
              support@kadinle.com
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
