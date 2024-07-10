"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import SingleCategorySkeleton from "../skeletons/SingleCategorySkeleton";
import Image from "next/image";
import { Loading } from "../global/Loading";
import { ChevronIcon } from "../Icons/ChevronIcon";
import ProductCard from "../products/ProductCard";
import Link from "next/link";
import { getBrands, getSeasons } from "@/app/api/supabase/products";
import { SubCategoriesBar } from "./SubCategoriesBar";
import { useParams } from "next/navigation";
import { getSingleCategory } from "@/app/api/supabase/home";

const SaleTimer = dynamic(() => import("../home/SaleTimer"));
const FlashSale = dynamic(() => import("../home/FlashSale"));
const ReactPaginate = dynamic(() => import("react-paginate"));
const Filters = dynamic(() => import("./Filters"));

const SingleCategoryDT = ({
  layout,
  remainingTime,
  category,
  searchKey = "category_content",
}) => {
  const containerRef = useRef();
  const t = useTranslations();
  const { language, currency } = useGlobalOptions();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [CACHE_SIZES, setCACHE_SIZES] = useState([]);
  const [CACHE_COLORS, setCACHE_COLORS] = useState([]);
  const [priceValues, setPriceValues] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [itemParPage, setItemParPage] = useState(24);
  const [itemOffset, setItemOffset] = useState(0);
  const [CACHE_SUBCATEGORIES, setCACHE_SUBCATEGORIES] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshFilter, setRefreshFilter] = useState(false);
  const [refreshSort, setRefreshSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("NEW");
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [categoryDate, setCategoryDate] = useState({});
  const [CACHE_BRANDS, setCACHE_BRANDS] = useState("");
  const [CACHE_SEASONS, setCACHE_SEASONS] = useState("");
  const [CACHE_PRICES, setCACHE_PRICES] = useState("");
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

      setCACHE_PRICES((prev) => {
        return {
          min: min?.toFixed(2),
          max: max?.toFixed(2),
        };
      });
    }
  };

  console.log(searchKey, "callded", category);
  const fetchDate = async () => {
    setLoading(true);
    const res = await getSingleCategory(params?.id);
    setCategoryDate(res?.data?.at(0));
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

  console.log(category, "ca");
  useEffect(() => {
    fetchDate();
    fetchSeasons();
    fetchBrands();
  }, [params?.id]);

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

      if (selectedCategories.length && !selectedCategories.includes(category)) {
        continue;
      }

      if (selectedBrand && selectedBrand !== brand) {
        continue;
      }

      if (selectedSeason && selectedSeason !== season) {
        continue;
      }

      if (Object.keys(selectedColors).length) {
        const checkColor = colors.filter((color) => selectedColors?.[color]);
        if (!checkColor.length) {
          continue;
        }
      }

      if (Object.keys(selectedSizes).length) {
        const checkSize = sizes.filter((size) =>
          Object.values(selectedSizes).includes(size)
        );
        if (!checkSize.length) {
          continue;
        }
      }

      if (
        priceValues?.length &&
        !(
          priceValues?.[0] < priceFormat(price) &&
          priceFormat(price) <= priceValues?.[1]
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
      // setItemOffset(0);
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
        ?.web_image;
    } else {
      return categoryInfo?.find((c) => c?.language_id === language?.id)?.image;
    }
  }, [layout, categoryInfo, language?.id]);

  const content = useMemo(() => {
    return categoryInfo?.find((c) => c?.language_id === language?.id);
  }, [categoryInfo, language?.id]);

  if (loading) {
    return <SingleCategorySkeleton layout={layout} />;
  }

  return (
    <div className="flex flex-col poppins pb-10 overflow-hidden">
      <div className="flex justify-center mt-1 ">
        <div className="w-full flex flex-col items-center">
          <div className="container mb-2">
            {layout === "search" ? (
              <h3 className="w-full text-gray-600 text-sm mt-4">
                {t("All_results")}: {productsFilter?.length}
              </h3>
            ) : null}
            {categoryDate?.banner_video ? (
              <video
                className="mainImage rounded-lg w-full max-w-none max-h-[500px] object-cover"
                src={categoryDate?.banner_video}
                controls
              />
            ) : (
              <>
                {!!displayImage ? (
                  <Image
                    className="mainImage rounded-lg w-full max-w-none max-h-[500px] object-cover"
                    src={displayImage}
                    alt="banner"
                    height={450}
                    priority
                    width={1550}
                  />
                ) : null}
              </>
            )}
            {/* {content?.title ? (
              <main className="bg-gray-100 flex items-center justify-center flex-col gap-3 p-4">
                <h1 className="font-medium text-lg text-primary">
                  {content?.title}
                </h1>
                {content?.description ? (
                  <p className="text-gray-500 font-normal text-center">
                    {content?.description}
                  </p>
                ) : null}
              </main>
            ) : null} */}

            {layout === "flash-sale" ? (
              <FlashSale className="h-[250px] lg:h-[300] xl:h-[370px]" />
            ) : null}
          </div>
          {!!productsFilter?.length && layout === "flash-sale" && (
            <SaleTimer remainingTime={remainingTime} />
          )}
          <SubCategoriesBar
            category={categoryDate}
            subCategories={CACHE_SUBCATEGORIES}
          />
          <div
            ref={containerRef}
            className="container flex w-full justify-between"
          >
            <Filters
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
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
            />
            {loading ? (
              <Loading />
            ) : (
              <div className="flex flex-col  mt-4 xl:w-[calc(100%-320px)] lg:w-[calc(100%-300px)] md:w-[calc(100%-320px)] sm:w-[calc(100%-320px)]">
                <div className="flex gap-2 flex-wrap md:gap-4 lg:gap-8 items-end">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <label className="text-[16px] lg:text-[18px]">
                      {t("Show_products")}:
                    </label>
                    <select
                      onClick={(e) => setItemParPage(e.target.value)}
                      className="border border-[#E264AD] rounded-md p-1 px-3"
                    >
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 sort">
                    <label className="text-[16px] lg:text-[18px] capitalize">
                      {t("sort")}:
                    </label>
                    <select
                      className="capitalize border border-[#E264AD] rounded-md p-1 px-3"
                      onClick={(e) => setSelectedSort(e.target.value)}
                    >
                      <option value="NEW">{t("newToOld")}</option>
                      <option value="OLD">{t("oldToNew")}</option>
                      <option value="MAX_TO_MIN">{t("highestPrice")}</option>
                      <option value="MIN_TO_MAX">{t("lowestPrice")}</option>
                      <option value="POPULAR">{t("highestRated")}</option>
                    </select>
                  </div>
                  <label
                    className={`py-[3px] whitespace-nowrap capitalize ltr:lg:ml-auto rtl:lg:mr-auto px-2 flex justify-center gap-2 rounded-sm ${
                      isPlusSize ? "bg-primary text-white" : "text-primary"
                    } border border-primary items-center px-2"`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-primary"
                      checked={isPlusSize}
                      onChange={(e) => setIsPlusSize(e.target.checked)}
                    />

                    {t("PLUS_SIZE")}
                  </label>
                </div>
                {!!productsFilter?.length ? (
                  <>
                    <div className="gap-4 mt-[40px] grid md:grid-cols-2 lg:grid-cols-4">
                      {productsFilter?.map((product, index) => (
                        <div key={index}>
                          <ProductCard item={product} layout={"category"} />
                        </div>
                      ))}
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
                  <p className="bg-red-100 h-fit text-red-500 p-2 rounded-md text-center px-8 my-[40px]">
                    {t("no_results")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryDT;
