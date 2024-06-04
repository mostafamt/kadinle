"use client";
import React, { useState } from "react";
import { OurFranchiseForm } from "../../components/forms/OurFranchiseForm";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import { useTranslations } from "next-intl";

export const Distributor = ({ locale }) => {
  const t = useTranslations();
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <StaticPageTitle title={t("Distributor")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        <ScrollUpComponent />

        {openForm ? (
          <OurFranchiseForm
            locale={locale}
            applicationName="distributorApplicationName"
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
              <p className="text-gray-500">{t("distributor_msg_1")}</p>
              <h3 className="py-2 text-sm  font-medium">
                {t("distributor_msg_2")}
              </h3>
              <p className="text-gray-500">{t("distributor_msg_3")}</p>
              <ul className="list-decimal px-4 flex flex-col gap-2 my-4">
                <li>{t("distributor_msg_4")}</li>
                <li>{t("distributor_msg_5")}</li>
                <li>{t("distributor_msg_6")}</li>
                <li>{t("distributor_msg_7")}</li>
                <li>{t("distributor_msg_8")}</li>
                <li>{t("distributor_msg_9")}</li>
                <li>{t("distributor_msg_10")}</li>
                <li>{t("distributor_msg_11")}</li>
                <li>{t("distributor_msg_12")}</li>
                <li>{t("distributor_msg_13")}</li>
              </ul>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_14")}
              </h3>
              <p className="text-gray-500 mt-1">{t("distributor_msg_15")}</p>
              <p className="text-gray-500 mt-1">{t("distributor_msg_16")}</p>
              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("join_us_msg_27")}
              </h3>
              <p className="text-gray-500 mt-1">{t("join_us_msg_28")}</p>

              <h4 className="py-2 text-xs  font-medium mt-2">
                {t("join_us_msg_29")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                {t("join_us_msg_30")}
              </p>
              <ul className="list-disc px-4 flex flex-col gap-2 my-4">
                <li>{t("join_us_msg_31")}</li>
                <li>{t("join_us_msg_32")}</li>
                <li>{t("join_us_msg_33")}</li>
                <li>{t("join_us_msg_34")}</li>
                <li>{t("join_us_msg_35")}</li>
                <li>{t("join_us_msg_36")}</li>
              </ul>

              <h4 className="py-2 text-xs  font-medium mt-2">
                {t("join_us_msg_37")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                {t("join_us_msg_38")}
              </p>
              <h4 className="py-2 text-xs  font-medium mt-2">
                {t("join_us_msg_39")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                {t("join_us_msg_40")}
              </p>
              <h4 className="py-2 text-xs  font-medium mt-2">
                {t("join_us_msg_41")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                {t("join_us_msg_42")}
              </p>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("join_us_msg_43")}
              </h3>
              <p className="text-gray-500 mt-1">{t("join_us_msg_44")}</p>
              <ul className="list-disc px-4 flex flex-col gap-2 my-4">
                <li>{t("join_us_msg_45")}</li>
                <li>{t("join_us_msg_46")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_33")}
              </h3>
              <p className="text-gray-500 mt-1">{t("distributor_msg_34")}</p>
              <ul className="list-disc px-4 flex flex-col gap-2 my-4">
                <li>{t("distributor_msg_35")}</li>
                <li>{t("distributor_msg_36")}</li>
                <li>{t("distributor_msg_37")}</li>
                <li>{t("distributor_msg_38")}</li>
                <li>{t("distributor_msg_39")}</li>
                <li>{t("distributor_msg_40")}</li>
                <li>{t("distributor_msg_41")}</li>
                <li>{t("distributor_msg_42")}</li>
                <li>{t("distributor_msg_43")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_44")}
              </h3>
              <ul className="list-disc px-4 flex flex-col gap-2 my-4">
                <li>{t("distributor_msg_45")}</li>
                <li>{t("distributor_msg_46")}</li>
                <li>{t("distributor_msg_47")}</li>
                <li>{t("distributor_msg_48")}</li>
                <li>{t("distributor_msg_49")}</li>
                <li>{t("distributor_msg_50")}</li>
                <li>{t("distributor_msg_51")}</li>
              </ul>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_52")}
              </h3>
              <p className="text-gray-500 mb-2">{t("distributor_msg_53")}</p>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_54")}
              </h3>
              <ul className="list-decimal px-4 flex flex-col gap-2 my-4">
                <li>{t("distributor_msg_55")}</li>
                <li>{t("distributor_msg_56")}</li>
                <li>{t("distributor_msg_57")}</li>
                <li>{t("distributor_msg_58")}</li>
                <li>{t("distributor_msg_59")}</li>
                <li>{t("distributor_msg_60")}</li>
                <li>{t("distributor_msg_61")}</li>
                <li>{t("distributor_msg_62")}</li>
              </ul>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_63")}
              </h3>
              <p className="text-gray-500 mb-2">{t("distributor_msg_64")}</p>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_65")}
              </h3>
              <p className="text-gray-500 mb-2">{t("distributor_msg_66")}</p>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("distributor_msg_67")}
              </h3>
              <p className="text-gray-500 mb-2">{t("distributor_msg_68")}</p>

              <button
                onClick={() => setOpenForm(true)}
                className="bg-opink block mx-auto text-white p-2 rounded-md my-4"
              >
                {t("distributor_msg_69")}
              </button>
              <p className="text-gray-500 mb-2">{t("distributor_msg_70")}</p>
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
