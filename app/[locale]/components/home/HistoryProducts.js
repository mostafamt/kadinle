"use client";

import React, { useContext, useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import { getHistoryProducts } from "@/app/api/supabase/home";
import ProductCard from "../products/ProductCard";
import { SectionTitle } from "../global/SectionTitle";

const HistoryProducts = ({ sectionSettings }) => {
  const t = useTranslations();
  const { historyCategoryIds } = useGlobalOptions();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(20);
  const [preventLoadMore, setPreventLoadMore] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadMoreData();
  }, [historyCategoryIds]);

  // useEffect(() => {
  //   if (products?.length + 1 < end) setPreventLoadMore(true)
  //   else setPreventLoadMore(false)
  // }, [products, end])

  const loadMoreData = async (moreCount = 0) => {
    if (preventLoadMore) return;
    setStart((prev) => prev + moreCount);
    setEnd((prev) => prev + moreCount);
    getHistoryProducts(
      Object.values(historyCategoryIds),
      start + moreCount,
      end + moreCount
    ).then((res) => {
      let allProducts = [];
      if (res?.data) {
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
      }
    });
  };

  if (!loading && !products?.length) return; // ignore component

  return (
    <div
      style={{
        order: sectionSettings?.section_order,
        display: !sectionSettings?.display_home && "none !important",
      }}
    >
      <SectionTitle title={t("suggestion_products")} />

      <div className="relative px-2 w-[100%]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {loading ? (
            <>
              {Array(20)
                .fill()
                .map((_, idx) => (
                  <div className="max-w-full" key={idx}>
                    <ProductCardSkeleton bigCard key={idx} />
                  </div>
                ))}
            </>
          ) : (
            <>
              {products
                ?.slice(0, parseInt(products?.length / 2) * 2)
                ?.map((item) => (
                  <ProductCard
                    isTwo
                    item={item}
                    key={item?.id}
                    likedImage={true}
                    showDiscount={true}
                  />
                ))}
            </>
          )}
        </div>
        <button
          onClick={() => loadMoreData(20)}
          className={`bg-primary p-2 rounded-md min-w-[120px] mx-auto text-xs my-2 text-white capitalize block ${
            preventLoadMore ? "hidden" : ""
          }`}
        >
          {t("seeMore")}
        </button>
      </div>
    </div>
  );
};

export default HistoryProducts;
