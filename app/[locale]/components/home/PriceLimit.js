import React from "react";
import PriceLimitCard from "./PriceLimitCard";
import { SectionTitle } from "../global/SectionTitle";

export const revalidate = 60;

const PriceLimit = ({ t, lessThenGallery, languageId }) => {
  const lessThenGalleryLaguage = lessThenGallery
    .filter((item) => item.language_id === languageId)
    .sort((a, b) => a.sku - b.sku);
  console.log("🚀 ~ PriceLimit ~ lessThenGalleryLaguage:", lessThenGalleryLaguage)
  
  return (
    <div className="w-full px-4 lg:px-4 mb-3 mt-3 lg:container mx-auto flex flex-col space-y-4 items-center">
      <SectionTitle title={t("lessThan")} />
      <div className="w-full grid grid-cols-3 items-center gap-1">
        {lessThenGalleryLaguage?.map((item) => (
          <PriceLimitCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PriceLimit;
