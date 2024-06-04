"use client";
import { useTranslations } from "next-intl";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { StaticPageTitle } from "../global/StaticPageTitle";
import { OurFranchiseForm } from "../forms/OurFranchiseForm";
import { useState } from "react";

const OurFranchise = ({ locale }) => {
  const t = useTranslations();
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <ScrollUpComponent />
      <StaticPageTitle title={t("OurFranchise")} />
      <div className="px-4 flex flex-col poppins  md:max-w-[575px] md:mx-auto w-full">
        {openForm ? (
          <OurFranchiseForm
            longForm
            locale={locale}
            applicationName="OurFranchiseApplicationName"
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
              <p className="text-gray-500">{t("franchise_msg1")}</p>
              <p className="text-gray-500">{t("franchise_msg2")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg3")}
              </h3>
              <ul className="list-decimal px-4 flex flex-col gap-1">
                <li>{t("franchise_msg4")}</li>
                <li>{t("franchise_msg5")}</li>
                <li>{t("franchise_msg6")}</li>
                <li>{t("franchise_msg7")}</li>
                <li>{t("franchise_msg8")}</li>
                <li>{t("franchise_msg9")}</li>
                <li>{t("franchise_msg10")}</li>
                <li>{t("franchise_msg11")}</li>
                <li>{t("franchise_msg12")}</li>
                <li>{t("franchise_msg13")}</li>
                <li>{t("franchise_msg14")}</li>
                <li>{t("franchise_msg15")}</li>
                <li>{t("franchise_msg16")}</li>
                <li>{t("franchise_msg17")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg18")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg19")}</p>
              <ul className="list-disc px-4 flex flex-col gap-1">
                <li>{t("franchise_msg20")}</li>
                <li>{t("franchise_msg21")}</li>
                <li>{t("franchise_msg22")}</li>
                <li>{t("franchise_msg23")}</li>
                <li>{t("franchise_msg24")}</li>
                <li>{t("franchise_msg25")}</li>
                <li>{t("franchise_msg26")}</li>
                <li>{t("franchise_msg27")}</li>
                <li>{t("franchise_msg28")}</li>
                <li>{t("franchise_msg29")}</li>
                <li>{t("franchise_msg30")}</li>
                <li>{t("franchise_msg31")}</li>
                <li>{t("franchise_msg32")}</li>
                <li>{t("franchise_msg33")}</li>
                <li>{t("franchise_msg34")}</li>
                <li>{t("franchise_msg35")}</li>
                <li>{t("franchise_msg36")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg37")}
              </h3>
              <ul className="list-disc px-4 flex flex-col gap-1">
                <li>{t("franchise_msg38")}</li>
                <li>{t("franchise_msg39")}</li>
                <li>{t("franchise_msg40")}</li>
                <li>{t("franchise_msg41")}</li>
                <li>{t("franchise_msg42")}</li>
                <li>{t("franchise_msg43")}</li>
                <li>{t("franchise_msg44")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg47")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg48")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg49")}
              </h3>
              <ul className="list-decimal px-4 flex flex-col gap-1">
                <li>{t("franchise_msg50")}</li>
                <li>{t("franchise_msg51")}</li>
                <li>{t("franchise_msg52")}</li>
                <li>{t("franchise_msg53")}</li>
                <li>{t("franchise_msg54")}</li>
                <li>{t("franchise_msg55")}</li>
                <li>{t("franchise_msg56")}</li>
                <li>{t("franchise_msg57")}</li>
                <li>{t("franchise_msg58")}</li>
              </ul>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg59")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg60")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg61")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg62")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg63")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg64")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg65")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg66")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg67")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg68")}</p>
              <h3 className="py-2 text-sm text-opink font-medium">
                {t("franchise_msg69")}
              </h3>
              <p className="text-gray-500 mb-2">{t("franchise_msg70")}</p>
              <p className="text-gray-500 mb-2">{t("franchise_msg71")}</p>
              <p className="text-gray-500 mb-2">{t("franchise_msg72")}</p>
              <button
                onClick={() => setOpenForm(true)}
                className="bg-opink block mx-auto text-white p-2 rounded-md mb-2"
              >
                {t("franchise_msg73")}
              </button>
              <p className="text-gray-500 mb-2">{t("franchise_msg74")}</p>
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

export default OurFranchise;
