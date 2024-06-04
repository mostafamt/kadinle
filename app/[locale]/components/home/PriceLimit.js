import React from "react";
import PriceLimitCard from "./PriceLimitCard";
import { SectionTitle } from "../global/SectionTitle";

const PriceLimit = ({ t }) => {
  const DATA = [
    {
      img: "https://kadinle.com/media/images/girl6.png",
      link: "/categories/price-less-15",
      text: t("lessThanFifteen"),
    },
    {
      img: "https://kadinle.com/media/images/girl7.png",
      link: "/categories/price-less-25",
      text: t("lessThanTwentyFive"),
    },
    {
      img: "https://kadinle.com/media/images/mainImage.png",
      link: "/categories/price-less-35",
      text: t("lessThanThirtyFive"),
    },
  ];

  return (
    <div className="w-full px-2 mb-3 container mx-auto">
      <SectionTitle title={t("lessThan")} />
      <div className="w-full grid grid-cols-3 h-[110px] items-center gap-1 limit-parent">
        {DATA.map((item) => (
          <PriceLimitCard key={item.text} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PriceLimit;
