"use client"
import React from "react";
import AboutUsBox from "./AboutUsBox";
import { useTranslations } from "next-intl";


const AboutUs = () => {
const t = useTranslations();
const aboutUsObj = [
  {
    id: 1,
    text: t("who_we_are"),
  },
  {
    id: 2,
    text: t("who_we_are"),
  },
  {
    id: 3,
    text: t("who_we_are"),
  },
  {
    id: 4,
    text: t("who_we_are"),
  },
  {
    id: 5,
    text: t("who_we_are"),
  },
  {
    id: 6,
    text: t("who_we_are"),
  },
];

  return (
    <div className="m-2 p-6 rounded-md grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {aboutUsObj.map((item) => (
        <AboutUsBox key={item.id}>{item.text}</AboutUsBox>
      ))}
    </div>
  );
};

export default AboutUs;
