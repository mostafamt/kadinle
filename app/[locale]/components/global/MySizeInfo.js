"use client";
import { useTranslations } from "next-intl";
import { UserChartForm } from "./UserChartForm";

export const MySizeInfo = ({ containerClassName, bodyClassName }) => {
  const t = useTranslations();

  return (
    <div className={`${containerClassName} text-sm`}>
      <div className={`${bodyClassName}`}>
        <h2 className="text-lg text-primary font-semibold mb-4 text-center mt-2">
          {t("kadinle_tailor")}
        </h2>
        <p className="text-gray-500 text-sm mb-2">{t("kadinle_tailor_msg1")}</p>
        <p className="text-gray-500 text-sm mb-2">{t("kadinle_tailor_msg2")}</p>

        <UserChartForm />
        <h3 className="mt-4 text-black font-medium mb-2">
          {t("taken_size_steps")}
        </h3>
        <ul className="flex flex-col text-gray-700 text-xs pb-4 gap-2 list-decimal px-8">
          <li>{t("taken_size_step1")}</li>
          <li>{t("taken_size_step2")}</li>
          <li>{t("taken_size_step3")}</li>
          <li>{t("taken_size_step4")}</li>
        </ul>
      </div>
    </div>
  );
};
