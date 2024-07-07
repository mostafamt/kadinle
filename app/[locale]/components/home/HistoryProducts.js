"use client";

import { getHistoryProducts } from "@/app/api/supabase/home";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import ProductCard from "../cards/ProductCard";

const HistoryProducts = ({ sectionSettings }) => {
  const t = useTranslations();
  const { language, historyCategoryIds } = useGlobalOptions();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(20);
  const [preventLoadMore, setPreventLoadMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadMoreData().then((res) => {
      setLoading(false);
    });
  }, [historyCategoryIds]);

  // useEffect(() => {
  //   if (products?.length + 1 < end) setPreventLoadMore(true)
  //   else setPreventLoadMore(false)
  // }, [products, end])

  const loadMoreData = async (moreCount = 0) => {
    if (preventLoadMore) return;
    setEnd((prev) => prev + moreCount);
    setStart((prev) => prev + moreCount);
    getHistoryProducts(
      Object.values(historyCategoryIds),
      start + moreCount,
      end + moreCount
    ).then((res) => {
      let allProducts = [];
      if (!res?.data) return;

      for (const row of res?.data) {
        if (row?.products?.length) {
          allProducts.push(...row?.products);
        }
      }
      if (allProducts?.length) {
        setProducts((prev) => {
          return [...allProducts, ...prev];
        });
      } else {
        setPreventLoadMore(true);
      }
    });
  };

  if (!loading && !products?.length) return; // ignore component

  return (
    <div
      className="relative w-full my-[64px] container"
      style={{
        order: sectionSettings?.section_order,
        display: !sectionSettings?.display_home && "none !important",
      }}
    >
      <div className="flex flex-col space-y-3 mb-4">
        <div className="container w-full flex justify-center items-center">
          <div className="flex flex-col space-y-1 justify-center items-center">
            <h3 className="text-2xl font-medium capitalize">
              {t("suggestion_products")}
            </h3>
            <div className="bg-opink w-[75px] h-[8px] rounded-xl "></div>
          </div>
        </div>
      </div>
      <div className="relative px-4 w-[100%] container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
              {products
                ?.slice(0, parseInt(products?.length / 5) * 5)
                ?.map((item) => (
                  <ProductCard item={item} key={item?.id} />
                ))}
            </>
          )}
        </div>
        <button
          onClick={() => loadMoreData(20)}
          className={`bg-opink p-2 min-w-[160px] rounded-md mx-auto my-2 text-white capitalize block ${
            preventLoadMore ? "hidden" : ""
          }`}
        >
          {t("more")}
        </button>
      </div>
    </div>
  );
};

export default HistoryProducts;
