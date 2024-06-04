"use client";
import React, { useRef, Fragment, useEffect, useMemo, useState } from "react";
import ProductCard from "../products/ProductCard";
import Image from "next/image";
import { ViewAs } from "./ViewAs";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import ChevronIcon from "../chat/ChevronIcon";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getBrands, getSeasons } from "@/app/api/supabase/products";

const SaleTimer = dynamic(() => import("../home/SaleTimer"));
const FlashSale = dynamic(() => import("../home/FlashSale"));
const ReactPaginate = dynamic(() => import("react-paginate"));
const Filter = dynamic(() => import("./Filter"));
const Sort = dynamic(() => import("./Sort"));

const filter = "https://kadinle.com/media/images/filter.svg";
const sort = "https://kadinle.com/media/images/sort.svg";

const SingleCategory = ({ layout, remainingTime, category, searchKey }) => {
  const t = useTranslations();
  const containerRef = useRef();
  const { currency, language } = useGlobalOptions();
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [format, setFormat] = useState(2);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedColors, setSelectedColors] = useState("");
  const [selectedSizes, setSelectedSizes] = useState("");
  const [priceValues, setPriceValues] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [itemParPage, setItemParPage] = useState(24);
  const [itemOffset, setItemOffset] = useState(0);
  const [refreshFilter, setRefreshFilter] = useState(false);
  const [refreshSort, setRefreshSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("NEW");
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [CACHE_PRICES, setCACHE_PRICES] = useState();
  const [CACHE_COLORS, setCACHE_COLORS] = useState([]);
  const [CACHE_SIZES, setCACHE_SIZES] = useState([]);
  const [CACHE_BRANDS, setCACHE_BRANDS] = useState([]);
  const [CACHE_SEASONS, setCACHE_SEASONS] = useState([]);
  const [CACHE_SUBCATEGORIES, setCACHE_SUBCATEGORIES] = useState([]);
  const [isPlusSize, setIsPlusSize] = useState(false);

  const priceFormat = (price) => {
    return price * currency?.currency?.rate;
  };

  const getMinAndMaxPrice = (products) => {
    if (products?.length) {
      let min = priceFormat(products?.[0]?.price);
      let max = priceFormat(products?.[0]?.price);

      for (const product of products) {
        if (priceFormat(product?.price) < min) {
          min = priceFormat(product?.price);
        }
        if (priceFormat(product?.price) > max) {
          max = priceFormat(product?.price);
        }
      }
      min = min?.toFixed(2);
      min = max?.toFixed(2);
      setCACHE_PRICES((prev) => {
        return {
          min: 0,
          max,
        };
      });
    }
  };

  const fetchDate = async () => {
    setLoading(true);
    setCategoryInfo(category?.[searchKey]);
    setProducts(category?.products);
    getMinAndMaxPrice(category?.products);
    setCACHE_COLORS(category?.colors);
    setCACHE_SIZES(category?.sizes);
    setCACHE_SUBCATEGORIES(category?.subcategories);
    setLoading(false);
  };

  const fetchSeasons = async () => {
    const response = await getBrands();
    setCACHE_BRANDS(response?.data);
  };

  const fetchBrands = async () => {
    const response = await getSeasons();
    setCACHE_SEASONS(response?.data);
  };

  useEffect(() => {
    fetchDate();
    fetchSeasons();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!category?.products?.length) return;

    let productsList = [];
    for (const product of category?.products) {
      const category = product?.category_id;
      const price = product?.price;
      const sizes = product?.sizes;
      const colors = product?.colors;
      const brand = product?.brand_id;
      const season = product?.season_id;

      if (selectedCategories && category !== selectedCategories) {
        continue;
      }

      if (selectedBrand && selectedBrand !== brand) {
        continue;
      }

      if (selectedSeason && selectedSeason !== season) {
        continue;
      }

      if (selectedColors?.id) {
        let checkColor = colors?.find((color) => selectedColors?.id === color);
        if (!checkColor) {
          continue;
        }
      }
      if (selectedSizes) {
        let checkSize = sizes?.find((size) => selectedSizes === size);
        if (!checkSize) {
          continue;
        }
      }
      if (
        priceValues?.length &&
        !(
          priceValues[0] < priceFormat(price) &&
          priceFormat(price) <= priceValues[1]
        )
      ) {
        continue;
      }

      if (isPlusSize && !product?.has_plus_size) continue;

      productsList?.push(product);
    }
    if (
      !!selectedCategories ||
      !!selectedColors ||
      !!selectedSizes ||
      !!isPlusSize ||
      !!selectedBrand ||
      !!selectedSeason ||
      priceValues?.length
    ) {
      setProductsFilter(productsList);
      setItemOffset(0);
    } else {
      setProductsFilter(category?.products);
    }
  }, [
    refreshFilter,
    selectedCategories,
    selectedColors,
    selectedSizes,
    priceValues?.[0],
    priceValues?.[1],
    category?.products,
    isPlusSize,
    selectedBrand,
    selectedSeason,
  ]);

  useEffect(() => {
    if (!products?.length) return;
    if (selectedSort === "POPULAR") setProducts(sortByRating(products, "asc"));
    if (selectedSort === "MAX_TO_MIN")
      setProducts(sortByPrice(products, "desc"));
    if (selectedSort === "MIN_TO_MAX")
      setProducts(sortByPrice(products, "asc"));
    if (selectedSort === "OLD") setProducts(sortByDateAdded(products, "asc"));
    if (selectedSort === "NEW") setProducts(sortByDateAdded(products, "desc"));
    setRefreshSort((p) => !p);
  }, [selectedSort, products]);

  useEffect(() => {
    if (!products?.length) {
      setProductsFilter([]);
      return;
    }
    const endOffset = itemOffset + itemParPage;
    const currentItems = products?.slice(itemOffset, endOffset);
    setPageCount(Math.ceil(products?.length / itemParPage));
    setProductsFilter(currentItems);
  }, [itemOffset, itemParPage, products, refreshSort]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemParPage;
    setItemOffset(newOffset);
    if (typeof window === "object") {
      const containerTop =
        containerRef?.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, containerTop);
    }
  };

  function sortByRating(products, sortOrder) {
    if (!products?.length) return;
    let list = products;
    if (sortOrder === "asc") {
      return list?.sort((a, b) => a.rating - b.rating);
    } else if (sortOrder === "desc") {
      return list?.sort((a, b) => b.rating - a.rating);
    } else {
      return list;
    }
  }
  function sortByDateAdded(products, sortOrder) {
    if (!products?.length) return;
    let list = products;
    if (sortOrder === "asc") {
      return list?.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (sortOrder === "desc") {
      return list?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else {
      return list;
    }
  }
  function sortByPrice(products, sortOrder) {
    if (!products?.length) return;
    let list = products;
    if (sortOrder === "asc") {
      return list?.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return list?.sort((a, b) => b.price - a.price);
    } else {
      return list;
    }
  }
  const displayImage = useMemo(() => {
    if (layout === "offer")
      return categoryInfo?.find((c) => c?.language_id === language?.id)?.media;
    if (!layout) {
      return categoryInfo?.find((c) => c?.language_id === language?.id)
        ?.mobile_image;
    } else {
      return categoryInfo?.find((c) => c?.language_id === language?.id)?.image;
    }
  }, [layout, categoryInfo, language?.id]);

  return (
    <div className="flex flex-col poppins mb-[65px] ">
      <>
        {openFilter && (
          <Filter
            filters={{
              CACHE_SIZES,
              CACHE_COLORS,
              CACHE_PRICES,
              CACHE_SUBCATEGORIES,
              CACHE_BRANDS,
              CACHE_SEASONS,
            }}
            currency={currency}
            setRefreshFilter={setRefreshFilter}
            selectedCategories={selectedCategories}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            setSelectedCategories={setSelectedCategories}
            setSelectedColors={setSelectedColors}
            setSelectedSizes={setSelectedSizes}
            setPriceValues={setPriceValues}
            setOpenFilter={setOpenFilter}
            setSelectedBrand={setSelectedBrand}
            setSelectedSeason={setSelectedSeason}
          />
        )}

        {openSort && (
          <Sort
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setOpenSort={setOpenSort}
          />
        )}
        <Fragment>
          <div ref={containerRef} className="flex justify-center">
            <div className="flex flex-col items-center w-[95%] max-w-[500px]">
              <div className="w-full relative">
                {layout === "search" ? (
                  <h3 className="w-full text-center text-gray-600 text-sm mt-4">
                    {t("All_results")}: {products?.length}
                  </h3>
                ) : null}
                {category?.banner_video ? (
                  <video
                    className="rounded-lg w-full max-w-none max-h-[320px] object-cover"
                    src={category?.banner_video}
                    controls
                  />
                ) : (
                  <>
                    {displayImage ? (
                      <Image
                        className="w-full object-cover"
                        src={displayImage}
                        alt="category banner "
                        priority
                        width={500}
                        height={210}
                      />
                    ) : null}
                  </>
                )}
                {categoryInfo?.title ? (
                  <main className="bg-primary-gray flex items-center justify-center flex-col gap-3 p-4 border-b-2 shadow">
                    <h1 className="font-medium text-lg text-primary">
                      {categoryInfo?.title}
                    </h1>
                    {categoryInfo?.description ? (
                      <p className="text-gray-500 font-normal text-center">
                        {categoryInfo?.description}
                      </p>
                    ) : null}
                  </main>
                ) : null}
                {layout === "flash-sale" ? (
                  <FlashSale className="h-[165px]" />
                ) : null}
              </div>
              {!!productsFilter?.length && layout === "flash-sale" && (
                <SaleTimer remainingTime={remainingTime} />
              )}
              <div className="flex justify-between mt-2 w-full my-1 items-center ">
                <div className="flex gap-2 items-center">
                  <ViewAs setFormat={setFormat} format={format} />
                </div>
                <label
                  className={`py-[3px] capitalize mx-auto flex px-2 justify-center gap-2 rounded-sm ${
                    isPlusSize ? "bg-primary text-white" : "text-primary"
                  } border border-primary items-center px-2"`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary ring-primary border-white"
                    checked={isPlusSize}
                    onChange={(e) => setIsPlusSize(e.target.checked)}
                  />

                  {t("PLUS_SIZE")}
                </label>

                <div className="flex gap-4 text-[14px] font-[300]">
                  <button
                    onClick={(e) => setOpenSort(true)}
                    className="py-[3px] capitalize px-2 flex justify-center gap-1 bg-opink rounded-sm text-owhite items-center w-1/2 max-w-[120px]"
                  >
                    <Image
                      className="w-[18px]"
                      src={sort}
                      height={18}
                      width={18}
                    />
                    {t("sort")}
                  </button>

                  <button
                    onClick={(e) => setOpenFilter(true)}
                    className="py-[3px] px-2 capitalize flex justify-center gap-1 bg-opink rounded-sm text-owhite items-center w-1/2 max-w-[120px]"
                  >
                    <Image
                      className="w-[18px]"
                      src={filter}
                      height={18}
                      width={18}
                    />
                    {t("filter")}
                  </button>
                </div>
              </div>
              {productsFilter?.length ? (
                <>
                  <div
                    className={`max-w-full grid mt-4 gap-4 ${
                      format === 2 ? "grid-cols-2 !gap-2" : ""
                    } `}
                  >
                    {productsFilter?.map((product) => {
                      return (
                        <div className="max-w-full" key={product?.id}>
                          <ProductCard
                            isOneView={format === 2}
                            item={product}
                            key={product?.id}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-auto mb-4">
                    <ReactPaginate
                      breakClassName="bg-gray-100 p-1 rounded-md px-2"
                      containerClassName="flex items-center gap-2 mt-4 max-w-fit mx-auto"
                      pageLinkClassName=" p-1 rounded-md px-2 bg-gray-100"
                      activeLinkClassName="text-white bg-opink"
                      breakLabel="..."
                      nextLabel={
                        <ChevronIcon className="h-4 w-4 ltr:rotate-180" />
                      }
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel={
                        <ChevronIcon className="h-4 w-4 rtl:rotate-180" />
                      }
                      disabledClassName="bg-transparent border border-gray-200"
                      nextClassName="text-lg px-2 rounded-md bg-gray-300 h-7 w-7 flex items-center justify-center"
                      previousClassName="text-lg px-2 rounded-md bg-gray-300  h-7 w-7 flex items-center justify-center"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </>
              ) : (
                <p className="text-center w-full mt-8 text-red-400">
                  {t("no_result_in_category")}
                </p>
              )}
            </div>
          </div>
        </Fragment>
      </>
    </div>
  );
};

export default SingleCategory;
