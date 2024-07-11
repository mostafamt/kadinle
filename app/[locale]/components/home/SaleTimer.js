"use client";
import { useEffect, useState } from "react";
import { Timer } from "./Timer";
import SaleTimerSkeleton from "../skeletons/SaleTimerSkeleton";
import { useTranslations } from "next-intl";

export const SaleTimer = ({ remainingTime: timer, translations }) => {

  const t = useTranslations()
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    setRemainingTime(timer);
  }, [timer]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        remainingTime.days === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
        clearInterval(timer);
      } else {
        setRemainingTime((prevState) => {
          const { days, hours, minutes, seconds } = prevState;
          if (seconds > 0) {
            return { days, hours, minutes, seconds: seconds - 1 };
          } else if (minutes > 0) {
            return { days, hours, minutes: minutes - 1, seconds: 59 };
          } else if (hours > 0) {
            return { days, hours: hours - 1, minutes: 59, seconds: 59 };
          } else {
            return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
          }
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingTime]);

  if (!timer?.days && !timer?.hours && !timer?.minutes && !timer?.seconds)
    return;

  if (!remainingTime) return <SaleTimerSkeleton />;

  return (
    <div className="w-full bg-primary text-white lg:mb-4">
      <div className="lg:container max-md:w-[90%]">
        <div className="flex justify-center gap-8 md:gap-22 lg:gap-40 items-center p-2 max-w-[90%] mx-auto">
          <div className="flex flex-col capitalize">
            <h3 className="text-xs xs:text-[16px] lg:text-[22px] mb:mb-4 lg:mb-2 lg:font-medium capitalize  whitespace-nowrap">
              {t("flashSale")}
            </h3>
            <h4 className="text-xs xs:text-[16px] lg:text-[22px] lg:font-medium  whitespace-nowrap">
              {t("endAt")}:
            </h4>
          </div>
          <Timer remainingTime={remainingTime} translations={translations} />
        </div>
      </div>
    </div>
  );
};
