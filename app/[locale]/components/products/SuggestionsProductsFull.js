"use client";

import { MoreProductsSliderFull } from "./MoreProductsSliderFull";
import { useTranslations } from "next-intl";

export const SuggestionsProductsFull = ({ category, productCategorySliders }) => {
  const t = useTranslations();
  return (
    <div className="mt-10 px-5">
      <MoreProductsSliderFull
        title={t("bestSeller")}
        category={category}
        products={productCategorySliders?.best}
      />
      <MoreProductsSliderFull
        title={t("moreLike")}
        category={category}
        products={productCategorySliders?.likes}
      />
      <MoreProductsSliderFull
        title={t("moreInteractive")}
        category={category}
        products={productCategorySliders?.views}
      />
    </div>
  );
};
