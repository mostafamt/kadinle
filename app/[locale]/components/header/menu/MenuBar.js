"use client";

import React from "react";
import BarsIcon from "../../Icons/BarsIcon";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";

export const MenuBar = () => {
  const { showOptions, setShowOptions } = useGlobalOptions();
  return (
    <button
      onClick={() => {
        setShowOptions((p) => !p);
      }}
      className={`px-1 py-[2px] ${
        showOptions ? "bg-primary text-white" : "text-secondary"
      } rounded-md`}
    >
      <BarsIcon className={`w-6 h-6`} />
    </button>
  );
};
