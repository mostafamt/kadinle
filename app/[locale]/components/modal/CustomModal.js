"use client";

import React from "react";

export const CustomModal = ({
  open,
  onClose,
  containerClassName,
  bodyClassName,
  children,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 bg-[#00000030] ${
        open
          ? "opacity-1 pointer-events-auto"
          : " opacity-0 pointer-events-none"
      } ${containerClassName}`}
      onClick={onClose}
    >
      <div
        className={`min-w-[250px] min-h-[130px] bg-white rounded-xl p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${bodyClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
