import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";

export const metadata = { title: "KADINLE | Privacy" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("policy_msg1")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <h2 className="mt-2 text-black leading-5">{t("policy_msg3")}</h2>

            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-6">
              - {t("policy_msg4")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg5")}
            </p>
            <p className="mt-1 leading-[25px] font-medium">
              {t("policy_msg7")}
            </p>

            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg8")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg9")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg10")}
            </p>
            <p className="mt-1 leading-[25px]">- {t("policy_msg11")}</p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg12")}
            </p>

            <p className="mt-6 text-black font-medium">{t("policy_msg13")}</p>

            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg14")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg15")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg2")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg16")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg17")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg18")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg19")}
            </p>

            <p className="mt-6 text-black font-medium">{t("policy_msg20")}</p>

            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg21")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg22")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg23")}
            </p>

            <p className="mt-6 text-black font-medium">{t("policy_msg24")}</p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg25")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg26")}
            </p>

            <p className="mt-6 text-black font-medium">- {t("policy_msg27")}</p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg28")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg29")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg30")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg31")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg32")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg321")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg33")}
            </p>
            <p className="ltr:ml-1 rtl:mr-1 leading-[25px] mt-1">
              - {t("policy_msg34")}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
