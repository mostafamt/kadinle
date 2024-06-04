"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { OurFranchiseForm } from "../forms/OurFranchiseForm";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { StaticPageTitle } from "../global/StaticPageTitle";

const ExclusiveAgency = ({ locale }) => {
  const t = useTranslations();
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <ScrollUpComponent />
      <StaticPageTitle title={t("ExclusiveAgency")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        {openForm ? (
          <OurFranchiseForm
            locale={locale}
            applicationName="exclusiveAgencyApplicationName"
          />
        ) : (
          <>
            <div className="flex flex-col space-y-[1px] self-center mt-8">
              <p className=" text-[18px] lg:text-[20px] 2xl:text-[30px]">
                {t("family_msg")}
              </p>
              <div className="bg-opink w-[67px] 2xl:w-[100px] h-[8px] rounded-xl "></div>
            </div>

            <div className="container mt-8 text-xs px-4">
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_1")}
              </h3>
              <p className="text-gray-500">{t("ExclusiveAgency_msg_2")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_3")}
              </h3>
              <p className="text-gray-500">{t("ExclusiveAgency_msg_4")}</p>
              <ul className="list-decimal px-4 flex flex-col gap-1 my-4">
                <li>{t("ExclusiveAgency_msg_5")}</li>
                <li>{t("ExclusiveAgency_msg_6")}</li>
                <li>{t("ExclusiveAgency_msg_7")}</li>
                <li>{t("ExclusiveAgency_msg_8")}</li>
                <li>{t("ExclusiveAgency_msg_9")}</li>
                <li>{t("ExclusiveAgency_msg_10")}</li>
                <li>{t("ExclusiveAgency_msg_11")}</li>
                <li>{t("ExclusiveAgency_msg_12")}</li>
                <li>{t("ExclusiveAgency_msg_13")}</li>
                <li>{t("ExclusiveAgency_msg_14")}</li>
                <li>{t("ExclusiveAgency_msg_15")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_16")}
              </h3>
              <p className="text-gray-500 mb-2">
                {t("ExclusiveAgency_msg_17")}
              </p>
              <ul className="list-decimal px-4 flex flex-col gap-1 my-4">
                <li>{t("ExclusiveAgency_msg_18")}</li>
                <li>{t("ExclusiveAgency_msg_19")}</li>
                <li>{t("ExclusiveAgency_msg_20")}</li>
                <li>{t("ExclusiveAgency_msg_21")}</li>
                <li>{t("ExclusiveAgency_msg_22")}</li>
                <li>{t("ExclusiveAgency_msg_23")}</li>
                <li>{t("ExclusiveAgency_msg_24")}</li>
                <li>{t("ExclusiveAgency_msg_25")}</li>
                <li>{t("ExclusiveAgency_msg_26")}</li>
                <li>{t("ExclusiveAgency_msg_27")}</li>
                <li>{t("ExclusiveAgency_msg_28")}</li>
                <li>{t("ExclusiveAgency_msg_29")}</li>
                <li>{t("ExclusiveAgency_msg_30")}</li>
                <li>{t("ExclusiveAgency_msg_31")}</li>
                <li>{t("ExclusiveAgency_msg_32")}</li>
                <li>{t("ExclusiveAgency_msg_33")}</li>
                <li>{t("ExclusiveAgency_msg_34")}</li>
                <li>{t("ExclusiveAgency_msg_35")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_36")}
              </h3>
              <ul className="list-disc px-4 flex flex-col gap-1">
                <li>{t("ExclusiveAgency_msg_37")}</li>
                <li>{t("ExclusiveAgency_msg_38")}</li>
                <li>{t("ExclusiveAgency_msg_39")}</li>
                <li>{t("ExclusiveAgency_msg_40")}</li>
                <li>{t("ExclusiveAgency_msg_41")}</li>
                <li>{t("ExclusiveAgency_msg_42")}</li>
                <li>{t("ExclusiveAgency_msg_43")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_44")}
              </h3>
              <ul className="list-decimal px-4 flex flex-col gap-1">
                <li>{t("ExclusiveAgency_msg_45")}</li>
                <li>{t("ExclusiveAgency_msg_46")}</li>
                <li>{t("ExclusiveAgency_msg_47")}</li>
                <li>{t("ExclusiveAgency_msg_48")}</li>
                <li>{t("ExclusiveAgency_msg_49")}</li>
                <li>{t("ExclusiveAgency_msg_50")}</li>
                <li>{t("ExclusiveAgency_msg_51")}</li>
                <li>{t("ExclusiveAgency_msg_52")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_53")}
              </h3>
              <p className="text-gray-500 mb-2">
                {t("ExclusiveAgency_msg_54")}
              </p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_55")}
              </h3>
              <p className="text-gray-500 mb-2">
                {t("ExclusiveAgency_msg_56")}
              </p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("ExclusiveAgency_msg_57")}
              </h3>
              <p className="text-gray-500 mb-2">
                {t("ExclusiveAgency_msg_58")}
              </p>
              <button
                onClick={() => setOpenForm(true)}
                className="bg-opink block mx-auto text-white p-2 rounded-md mb-2"
              >
                {t("ExclusiveAgency_msg_59")}
              </button>
              <p className="text-gray-500 mb-2">
                {t("ExclusiveAgency_msg_60")}
              </p>
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExclusiveAgency;
