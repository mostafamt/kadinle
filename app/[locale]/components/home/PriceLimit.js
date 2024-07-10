import React from "react";
import PriceLimitCard from "./PriceLimitCard";
import { SectionTitle } from "../global/SectionTitle";

const PriceLimit = ({ t, lessThenGallery }) => {
  console.log("lessThenGallery", lessThenGallery);
  const DATA = [
    {
      img: "/lessthan15.jpg",
      imgMob: "/lessthan15_Mob.jpg",
      link: "/categories/price-less-15",
      text: t("lessThanFifteen"),
    },
    {
      img: "/lessthan25.jpg",
      imgMob: "/lessthan25_Mob.jpg",
      link: "/categories/price-less-25",
      text: t("lessThanTwentyFive"),
    },
    {
      img: "/lessthan35.jpg",
      imgMob: "/lessthan35_Mob.jpg",
      link: "/categories/price-less-35",
      text: t("lessThanThirtyFive"),
    },
  ];

  return (
    <div className="w-full px-2 lg:px-4 mb-3 mt-3 lg:container mx-auto flex flex-col space-y-4 items-center">
      <SectionTitle title={t("lessThan")} />
      <div className="w-full grid grid-cols-3 items-center gap-1">
        {DATA.map((item) => (
          <PriceLimitCard key={item.text} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PriceLimit;
