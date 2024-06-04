"use client";
import React from "react";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import ProductCard from "../products/ProductCard";
import { useTranslations } from "next-intl";

export const TopRated = ({ topRated, loading }) => {
  const t = useTranslations();

  return (
    <div>
      <div className="relative px-4 w-[100%] container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {loading ? (
            <>
              {Array(20)
                .fill()
                .map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
            </>
          ) : (
            <>
              {topRated?.length ? (
                <>
                  {topRated?.map((item, index) => (
                    <ProductCard
                      key={item?.id}
                      item={item}
                      layout="rated"
                      index={index + 1}
                    />
                  ))}
                </>
              ) : (
                <p className="text-red-500 text-sm text-center mt-4">
                  {t("no_results")}
                </p>
              )}
            </>
          )}
        </div>
        {/* <button
        onClick={() => loadMoreData(20)}
        className={`bg-opink p-2 min-w-[160px] rounded-md mx-auto my-2 text-white capitalize block ${
          preventLoadMore ? "hidden" : ""
        }`}
      >
        {fetchWord("more", lang)}
      </button> */}
      </div>
    </div>
  );
};
