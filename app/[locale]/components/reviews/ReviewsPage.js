"use client";

import { getStoreReviews } from "@/app/api/supabase/reviews";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ScrollUpComponent from "../global/ScrollUpComponent";
import { StaticPageTitle } from "../global/StaticPageTitle";
import { TopRated } from "./TopRated";
import { StoreReviews } from "./StoreReviews";
import { ProductsReviews } from "./ProductsReviews";

export const ReviewsPage = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("most_reviews");
  const [allData, setAllData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (min = 1, max = 20) => {
    setIsLoading(true);

    const response = await getStoreReviews(min, max);
    setAllData(response?.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col poppins ">
        <ScrollUpComponent />
        <StaticPageTitle title={t("Reviews")} />
        <div className=" mt-8">
          <div className="flex gap-4 px-4 items-center justify-between md:max-w-[700px] mx-auto">
            <button
              onClick={() => setActiveTab("most_reviews")}
              className={`bg-white text-xs rounded-2xl py-3 px-6 ${
                activeTab === "most_reviews"
                  ? "!bg-opink !text-white"
                  : "shadow text-black"
              }`}
            >
              {t("most_reviews")}
            </button>
            <button
              onClick={() => setActiveTab("store_reviews")}
              className={`bg-white text-xs rounded-2xl py-3 px-6 ${
                activeTab === "store_reviews"
                  ? "!bg-opink !text-white"
                  : "shadow text-black"
              }`}
            >
              {t("store_reviews")}
            </button>
            <button
              onClick={() => setActiveTab("products_reviews")}
              className={`bg-white text-xs rounded-2xl py-3 px-6 ${
                activeTab === "products_reviews"
                  ? "!bg-opink !text-white"
                  : "shadow text-black"
              }`}
            >
              {t("products_reviews")}
            </button>
          </div>
          <div className="mt-8 px-4">
            {activeTab === "most_reviews" ? (
              <TopRated topRated={allData?.top_rated} loading={isLoading} />
            ) : null}
            {activeTab === "store_reviews" ? (
              <StoreReviews
                storeReviews={allData?.kadinle_reviews}
                loading={isLoading}
              />
            ) : null}
            {activeTab === "products_reviews" ? (
              <ProductsReviews
                productsReviews={allData?.latest_comments}
                loading={isLoading}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
