"use client";
import React, { useEffect } from "react";

const ScrollUpComponent = () => {
  useEffect(() => {
    typeof window === "object" && window.scrollTo(0, 0);
  }, []);

  return <></>;
};

export default ScrollUpComponent;
