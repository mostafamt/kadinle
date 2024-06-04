import React from "react";
import { ChevronIcon } from "./ChevronIcon";

export const PrimaryArrowIcon = ({ arrowClassName, containerClassName }) => {
  return (
    <span
      className={`bg-primary text-white rounded-full p-1 h-9 w-9 flex items-center justify-center ${containerClassName}`}
    >
      <ChevronIcon
        className={`w-6 h-6 font-bold ltr:-rotate-90 rtl:rotate-90 ${arrowClassName}`}
      />
    </span>
  );
};
