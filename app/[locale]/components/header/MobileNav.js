"use client";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import ArrowBackIcon from "../Icons/ArrowBackIcon";
import { MobileNavIcons } from "./MobileNavIcons";

export const MobileNav = ({
  hideBack,
  handleBack,
  title,
  customTitle,
  showIcons,
  containerClassName,
}) => {
  const router = useRouter();
  const { cartLength } = useGlobalOptions();

  return (
    <nav
      className={`flex gap-2 items-center justify-between mx-auto pt-2 mb-6 px-4 w-full max-w-[500px] ${containerClassName}`}
    >
      {hideBack ? null : (
        <button
          className="h-7 w-7 flex items-center  rtl:rotate-180 justify-center rounded-full hover:bg-[#ffffff21]"
          onClick={() => {
            if (!!handleBack) {
              handleBack();
              return;
            }
            router?.back();
          }}
        >
          <ArrowBackIcon className="text-gray-500 h-5 w-5" />
        </button>
      )}
      <div className="mx-auto">
        {title ? (
          <h2 className="font-medium text-lg capitalize">{title}</h2>
        ) : (
          customTitle
        )}
      </div>
      <div>
        {showIcons ? (
          <MobileNavIcons />
        ) : (
          <button className="relative">
            <Image
              src="https://kadinle.com/media/images/mobileCart.svg"
              alt="cart"
              height={24}
              width={24}
              className="w-[24px] h-[24px] object-contain"
            />
            <span className="text-[7px] bg-primary p-[2px] px-[4px] rounded-md text-[#FFFFFF] absolute -bottom-1 left-0">
              {cartLength || "0"}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};
