"use client";

import { MoreProductsSlider } from "./MoreProductsSlider";
import { useTranslations } from "next-intl";

export const SuggestionsProducts = ({ productCategorySliders, category }) => {
  const t = useTranslations();
  return (
    <div className="mt-10">
      <MoreProductsSlider
        title={t("bestSeller")}
        category={category}
        products={productCategorySliders?.best}
      />
      <MoreProductsSlider
        title={t("moreLike")}
        category={category}
        products={productCategorySliders?.likes}
      />
      <MoreProductsSlider
        title={t("moreInteractive")}
        category={category}
        products={productCategorySliders?.views}
      />
    </div>
  );
};
