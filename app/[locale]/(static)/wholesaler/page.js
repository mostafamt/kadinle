import { getTranslations } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Link from "next/link";
import {unstable_setRequestLocale} from 'next-intl/server';
import { useTranslations } from 'next-intl';

export const metadata = { title: "KADINLE | Wholesaler" };

const page = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations();

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Wholesaler")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        <div className="flex flex-col space-y-[1px] self-center mt-8">
          <h2 className=" text-[18px] lg:text-[20px] 2xl:text-[30px]">
            {t("family_msg")}
          </h2>
          <div className="bg-opink w-[67px] 2xl:w-[100px] h-[8px] rounded-xl "></div>
        </div>

        <div className="container mt-8 text-xs px-4">
          <p className="text-gray-500">{t("customs_clearance_msg_1")}</p>
          <h3 className="py-2 text-sm text-opink font-medium">
            {t("customs_clearance_msg_2")}
          </h3>
          <ul className="list-decimal px-4 flex flex-col gap-2 my-4">
            <li>{t("customs_clearance_msg_3")}</li>
            <li>{t("customs_clearance_msg_4")}</li>
            <li>{t("customs_clearance_msg_5")}</li>
            <li>{t("customs_clearance_msg_6")}</li>
            <li>{t("customs_clearance_msg_7")}</li>
          </ul>
          <h3 className="py-2 text-sm text-opink font-medium">
            {t("customs_clearance_msg_8")}
          </h3>
          <p className="text-gray-500 mb-2">{t("customs_clearance_msg_9")}</p>
          <p className="text-gray-500 mb-2">{t("customs_clearance_msg_10")}</p>
          <h3 className="py-2 text-sm text-opink font-medium">
            {t("customs_clearance_msg_11")}
          </h3>
          <p className="text-gray-500 mb-2">{t("customs_clearance_msg_12")}</p>
          <ul className="list-disc px-4 flex flex-col gap-2 my-4">
            <li>
              <h4 className="py-2 text-sm font-medium">
                {t("customs_clearance_msg_13")}
              </h4>
              <p className="text-gray-500 mb-2">
                {t("customs_clearance_msg_14")}
              </p>
              <ul className="list-disc px-4 flex flex-col gap-2 my-4">
                <li>{t("customs_clearance_msg_15")}</li>
                <li>{t("customs_clearance_msg_16")}</li>
                <li>{t("customs_clearance_msg_17")}</li>
                <li>{t("customs_clearance_msg_18")}</li>
                <li>{t("customs_clearance_msg_19")}</li>
                <li>{t("customs_clearance_msg_20")}</li>
              </ul>
            </li>
            <li>
              <h4 className="py-2 text-sm font-medium">
                {t("customs_clearance_msg_21")}
              </h4>
              <p className="text-gray-500 mb-2">
                {t("customs_clearance_msg_22")}
              </p>
            </li>
            <li>
              <h4 className="py-2 text-sm font-medium">
                {t("customs_clearance_msg_23")}
              </h4>
              <p className="text-gray-500 mb-2">
                {t("customs_clearance_msg_24")}
              </p>
            </li>
            <li>
              <h4 className="py-2 text-sm font-medium">
                {t("customs_clearance_msg_25")}
              </h4>
              <p className="text-gray-500 mb-2">
                {t("customs_clearance_msg_26")}
              </p>
            </li>
          </ul>
          <h3 className="py-2 text-sm text-opink font-medium">
            {t("customs_clearance_msg_27")}
          </h3>
          <p className="text-gray-500 mb-2">{t("customs_clearance_msg_28")}</p>
          <ul className="list-decimal px-4 flex flex-col gap-2 my-4">
            <li>{t("customs_clearance_msg_29")}</li>
            <li>{t("customs_clearance_msg_30")}</li>
            <li>{t("customs_clearance_msg_31")}</li>
            <li>{t("customs_clearance_msg_32")}</li>
          </ul>
          <p className="text-gray-500 mb-2">{t("customs_clearance_msg_33")}</p>
          <h3 className="py-2 text-sm text-opink font-medium">
            {t("customs_clearance_msg_34")}
          </h3>
          <ul className="list-decimal px-4 flex flex-col gap-2">
            <li>
              {t("customs_clearance_msg_35")}{" "}
              <Link href="/signup" className="text-opink">
                {t("here")}
              </Link>{" "}
            </li>
            <li>
              {t("customs_clearance_msg_36")}{" "}
              <Link href="/cart" className="text-opink">
                {t("ADD_TO_CART")}
              </Link>
            </li>
            <p className="text-gray-500 my-2">
              {t("customs_clearance_msg_37")}
            </p>
            <li>{t("customs_clearance_msg_38")}</li>
            <li>
              <h4>{t("customs_clearance_msg_39")}</h4>
              <ul className="list-disc px-4 flex flex-col gap-2 mt-2">
                <li>{t("customs_clearance_msg_40")}</li>
                <li>{t("customs_clearance_msg_41")}</li>
                <li>{t("customs_clearance_msg_42")}</li>
                <li>
                  {t("customs_clearance_msg_43")}{" "}
                  <span className="text-opink">
                    {t("customs_clearance_msg_44")}
                  </span>{" "}
                </li>
              </ul>
            </li>
          </ul>
          <p className="text-gray-500 my-4">{t("customs_clearance_msg_45")}</p>
          <p className="mb-1">
            {t("email_service")}:{" "}
            <a href="mailto:service@kadinle.com">service@kadinle.com</a>
          </p>
          <p className="mb-1">
            {t("WhatsApp")}:{" "}
            <a href="whatsapp://send?abid=00905527869824">
              0090 552 786 98 24‬‏{" "}
            </a>
          </p>
          <Link
            href="/categories"
            className="bg-opink block max-w-[200px] text-center mx-auto text-white p-2 rounded-md mb-2"
          >
            {t("customs_clearance_msg_46")}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default page;
