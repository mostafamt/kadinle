"use client";
import React, { useState } from "react";

import { useTranslations } from "next-intl";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { StaticPageTitle } from "../global/StaticPageTitle";
import { OurFranchiseForm } from "../forms/OurFranchiseForm";

const JoinUs = ({ locale }) => {
  const t = useTranslations();
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <ScrollUpComponent />
      <StaticPageTitle title={t("JoinUs")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        {openForm ? (
          <OurFranchiseForm
            locale={locale}
            applicationName="OurFranchiseApplicationName"
            longForm
          />
        ) : (
          <>
            <div className="flex flex-col space-y-[1px] self-center mt-8">
              <h2 className=" text-[18px] lg:text-[20px] 2xl:text-[30px]">
                {t("family_msg")}
              </h2>
              <div className="bg-opink w-[67px] 2xl:w-[100px] h-[8px] rounded-xl "></div>
            </div>
            <div className="container mt-8 text-xs px-4">
              <p className="text-gray-500">{t("join_us_msg_1")}</p>
              <p className="text-gray-500">{t("join_us_msg_2")}</p>
              <h3 className="py-2 text-sm  font-medium">
                {t("join_us_msg_3")}
              </h3>
              <p className="text-gray-500">{t("join_us_msg_4")}</p>
              <h3 className="py-2 text-sm  font-medium">
                {t("join_us_msg_5")}
              </h3>
              <p className="text-gray-500">{t("join_us_msg_6")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("join_us_msg_7")}
              </h3>
              <h4 className="py-2 text-xs -mt-2 font-medium">
                {t("join_us_msg_8")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                <span className="w-1 h-1 bg-black inline-block" />{" "}
                {t("join_us_msg_9")}
              </p>
              <h4 className="py-2 text-xs  font-medium">
                {t("join_us_msg_10")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                <span className="w-1 h-1 bg-black inline-block" />{" "}
                {t("join_us_msg_11")}
              </p>
              <h4 className="py-2 text-xs  font-medium">
                {t("join_us_msg_12")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                <span className="w-1 h-1 bg-black inline-block" />{" "}
                {t("join_us_msg_13")}
              </p>
              <h4 className="py-2 text-xs  font-medium">
                {t("join_us_msg_14")}
              </h4>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                <span className="w-1 h-1 bg-black inline-block" />{" "}
                {t("join_us_msg_15")}
              </p>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                <span className="w-1 h-1 bg-black inline-block" />{" "}
                {t("join_us_msg_16")}
              </p>
              <p className="text-gray-500 flex items-center gap-2 px-4">
                <span className="w-1 h-1 bg-black inline-block" />{" "}
                {t("join_us_msg_17")}
              </p>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("join_us_msg_18")}
              </h3>
              <p className="text-gray-500">{t("join_us_msg_19")}</p>
              <ul className="list-decimal px-4 flex flex-col gap-2 my-4">
                <li>{t("join_us_msg_20")}</li>
                <li>{t("join_us_msg_21")}</li>
                <li>{t("join_us_msg_22")}</li>
                <li>{t("join_us_msg_23")}</li>
              </ul>

              <h3 className="py-2 text-sm text-opink font-medium mt-4">
                {t("join_us_msg_24")}
              </h3>
              <p className="text-gray-500 mt-1">{t("join_us_msg_25")}</p>
              <p className="text-gray-500 mt-1">{t("join_us_msg_26")}</p>
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
                {t("join_us_msg_47")}
              </h3>
              <p className="text-gray-500 mt-1">{t("join_us_msg_48")}</p>
              <ul className="list-disc px-4 flex flex-col gap-2 my-4">
                <li>{t("join_us_msg_49")}</li>
                <li>{t("join_us_msg_50")}</li>
                <li>{t("join_us_msg_51")}</li>
                <li>{t("join_us_msg_52")}</li>
                <li>{t("join_us_msg_53")}</li>
                <li>{t("join_us_msg_54")}</li>
              </ul>

              <p className="text-gray-500 mb-2">{t("join_us_msg_55")}</p>
              <button
                onClick={() => setOpenForm(true)}
                className="bg-opink block mx-auto text-white p-2 rounded-md my-4"
              >
                {t("join_us_msg_56")}
              </button>
              <p className="text-gray-500 mb-2">{t("join_us_msg_57")}</p>
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

export default JoinUs;
