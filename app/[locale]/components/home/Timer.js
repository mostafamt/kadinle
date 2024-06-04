"use client";
import { useTranslations } from "next-intl";
import React from "react";

const timing = {
  days: "DAY",
  hours: "hour",
  minutes: "minute",
  seconds: "second",
};

export const Timer = ({ remainingTime }) => {
  const t = useTranslations();

  return (
    <div className="flex gap-2 items-center">
      {Object.entries(remainingTime)?.map(([key, value], index) => {
        return (
          <div className="flex items-center gap-2" key={key}>
            <div className="flex flex-col w-[30px]">
              <div className="bg-white text-primary py-[1px] rounded-t-sm flex items-center justify-center">
                <p className="font-medium text-[13px]">
                  {!isNaN(value) ? value?.toString()?.padStart(2, "0") : 0}
                </p>
              </div>
              <p className="uppercase bg-black px-2 flex text-owhite items-center justify-center text-[10px] rounded-b-sm">
                {t(timing?.[key])}
              </p>
            </div>
            {index > 2 ? null : (
              <div className="flex flex-col space-y-2">
                <div className="w-[3px] h-[3px] rounded-full bg-black"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-black"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
