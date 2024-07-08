"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";



export const Timer = ({ remainingTime, translations }) => {
 
  return (
    <div className="flex gap-2 items-center">
      {Object.entries(remainingTime)?.map(([key, value], index) => {
        return (
          <div className="flex items-center gap-2" key={key}>
            <div className="flex flex-col w-[30px] lg:w-[45px]">
              <div className="bg-white text-primary py-[1px] rounded-t-sm lg:rounded-t-md flex items-center justify-center">
                <p className="font-medium text-[13px] lg:text-[22px] lg:text-primary">
                  {!isNaN(value) ? value?.toString()?.padStart(2, "0") : 0}
                </p>
              </div>
              <div className="uppercase bg-black px-2 flex text-owhite items-center justify-center text-[10px] lg:text-[15px] rounded-b-sm lg:rounded-b-md">
                <p className="">{translations[key]}</p>
              </div>
            </div>
            {index > 2 ? null : (
              <div className="flex flex-col space-y-2">
                <div className="w-[3px] h-[3px] rounded-full bg-white"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-white"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
