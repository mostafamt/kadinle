import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
// import Image from "next/image";
// import { SuppliersForm } from "../../components/forms/SuppliersForm";
import Link from "next/link";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";
import { SupportBox } from "../../components/my-profile/SupportBox";

export const metadata = { title: "KADINLE | Suppliers" };

const Profile3 = "https://kadinle.com/media/images/Profile3.svg";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full pb-6">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Suppliers")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        <div className="flex flex-col space-y-[1px] self-center mt-8">
          <h2 className=" text-[18px]">{t("family_msg")}</h2>
          <div className="bg-opink w-[67px] 2xl:w-[100px] h-[8px] rounded-xl"></div>
        </div>
        <div className="flex flex-col gap-4 text-xs mt-4">
          <p className="font-medium text-gray-500">{t("suppliers_msg1")}</p>
          <p className="font-medium text-gray-500">{t("suppliers_msg2")}</p>
          <p className="font-medium text-gray-500">{t("suppliers_msg3")}</p>
          {/* <span className="text-primary font-medium">
            {t("suppliers_msg4")}
          </span> */}
          <SupportBox locale={locale} />
          <Link
            href="mailto:store@kadinle.com"
            className="text-primary italic underline flex items-center gap-2"
          >
            <Image
              src={Profile3}
              alt="user"
              className="w-[18px] object-contain"
              height={20}
              width={20}
            />
            {t("suppliers_msg5")}
          </Link>
          <p className="mb-4 font-medium text-gray-500">
            {t("suppliers_msg6")}
          </p>

          <Link
            href="/supplier-registration"
            className=" flex-1 flex-col gap-1 whitespace-nowrap max-w-md w-full bg-primary text-white hover:text-primary hover:bg-transparent duration-200 border border-primary flex items-center justify-center py-1 px-4 rounded-[50px] mx-auto"
          >
            {t("supplier_registration")}
            <span className="text-primary bg-white rounded-md px-2 py-[2px] text-center block text-[10px]">
              {t("join")}
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 mt-6 gap-4">
          <Link
            href="/store-benefits"
            // className=" flex-1 whitespace-nowrap hover:shadow hover:bg-gray-200 overflow-hidden flex items-center p-4 rounded-md"
            className="relative before:w-1 before:h-full before:absolute ltr:before:left-0 rtl:before:right-0 before:bg-primary hover:before:w-full before:duration-200 text-sm hover:scale-105 duration-200 hover:!text-white text-primary whitespace-nowrap overflow-hidden flex items-center px-4 py-2 rounded-md bg-white hover:shadow"
          >
            <span className="relative z-10"> {t("store_benefits.store_benefits_title")} </span>
          </Link>
          <Link
            href="/work-mechanism"
            // className=" flex-1 whitespace-nowrap hover:shadow hover:bg-gray-200 overflow-hidden flex items-center p-4 rounded-md"
            className="relative before:w-1 before:h-full before:absolute ltr:before:left-0 rtl:before:right-0 before:bg-primary hover:before:w-full before:duration-200 text-sm hover:scale-105 duration-200 hover:!text-white text-primary whitespace-nowrap overflow-hidden flex items-center px-4 py-2 rounded-md bg-white hover:shadow"
          >
            <span className="relative z-10"> {t("work_mechanism.work_mechanism_title")} </span>
          </Link>
          <Link
            href="/terms-and-conditions"
            // className=" flex-1 whitespace-nowrap hover:shadow hover:bg-gray-200 overflow-hidden flex items-center p-4 rounded-md"
            className="relative before:w-1 before:h-full before:absolute ltr:before:left-0 rtl:before:right-0 before:bg-primary hover:before:w-full before:duration-200 text-sm hover:scale-105 duration-200 hover:!text-white text-primary whitespace-nowrap overflow-hidden flex items-center px-4 py-2 rounded-md bg-white hover:shadow"
          >
            <span className="relative z-10"> {t("terms_and_conditions.terms_conditions")} </span>
          </Link>
          <Link
            href="/public-policy"
            // className=" flex-1 whitespace-nowrap hover:shadow hover:bg-gray-200 overflow-hidden flex items-center p-4 rounded-md"
            className="relative before:w-1 before:h-full before:absolute ltr:before:left-0 rtl:before:right-0 before:bg-primary hover:before:w-full before:duration-200 text-sm hover:scale-105 duration-200 hover:!text-white text-primary whitespace-nowrap overflow-hidden flex items-center px-4 py-2 rounded-md bg-white hover:shadow"
          >
            <span className="relative z-10"> {t("public_policy_page.public_policy")} </span>
          </Link>
          <Link
            href="/services-privileges"
            // className=" flex-1 whitespace-nowrap hover:shadow hover:bg-gray-200 overflow-hidden flex items-center p-4 rounded-md"
            className="relative before:w-1 before:h-full before:absolute ltr:before:left-0 rtl:before:right-0 before:bg-primary hover:before:w-full before:duration-200 text-sm hover:scale-105 duration-200 hover:!text-white text-primary whitespace-nowrap overflow-hidden flex items-center px-4 py-2 rounded-md bg-white hover:shadow"
          >
            <span className="relative z-10"> {t("services_privileges.services_privileges_title")} </span>
          </Link>
          <Link
            href="/rights-and-duties"
            // className=" flex-1 whitespace-nowrap hover:shadow hover:bg-gray-200 overflow-hidden flex items-center p-4 rounded-md"
            className="relative before:w-1 before:h-full before:absolute ltr:before:left-0 rtl:before:right-0 before:bg-primary hover:before:w-full before:duration-200 text-sm hover:scale-105 duration-200 hover:!text-white text-primary whitespace-nowrap overflow-hidden flex items-center px-4 py-2 rounded-md bg-white hover:shadow"
          >
            <span className="relative z-10"> {t("kadinle_rights_duties.rights_duties")} </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default page;
