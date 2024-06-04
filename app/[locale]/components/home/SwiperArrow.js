"use client";
import React from "react";
import { PrimaryArrowIcon } from "../Icons/PrimaryArrowIcon";

export const SwiperArrow = ({
  start,
  sliderNextHandler,
  sliderPrevHandler,
  className,
  style,
  onClick,
}) => {
  return (
    <>
      {start ? (
        <button onClick={onClick}>
          <PrimaryArrowIcon arrowClassName="ltr:!-rotate-90" />
        </button>
      ) : (
        <button onClick={onClick}>
          <PrimaryArrowIcon />
        </button>
      )}
    </>
  );
};
