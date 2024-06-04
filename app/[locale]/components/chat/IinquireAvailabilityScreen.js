"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const IinquireAvailabilityScreen = ({ onMoveScreen, handleBack }) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-center text-opink font-medium mb-2">
        {t("inquire_availability_msg1")}
      </h3>
      <p>{t("inquire_availability_msg2")}</p>
      <p>{t("inquire_availability_msg3")}</p>
      <p>{t("inquire_availability_msg4")}</p>
      <p>{t("inquire_availability_msg5")}</p>
      <p>{t("inquire_availability_msg6")}</p>
      <p>{t("inquire_availability_msg7")}</p>
      <p>{t("inquire_availability_msg8")}</p>
      <p>{t("inquire_availability_msg9")}</p>
      <p>{t("inquire_availability_msg10")}</p>
      <Link
        href="/size-guide"
        className="block mx-auto text-white p-1 rounded text-xs bg-opink"
      >
        {t("inquire_availability_msg13")}
      </Link>
      <p className="mx-auto text-center">{t("inquire_availability_msg14")}</p>
      <button className="text-gray-400 font-medium  mt-2" onClick={handleBack}>
        {t("back")}{" "}
      </button>
      <button
        className="text-opink font-medium"
        onClick={() => onMoveScreen("help_screen")}
      >
        {t("center_help")}{" "}
      </button>
    </div>
  );
};
