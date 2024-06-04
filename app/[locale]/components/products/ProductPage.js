"use client";
import { getChartNumbers } from "@/app/api/supabase/products";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { SaleTimer } from "../home/SaleTimer";
import Product from "./Product";
import ProductDescription from "./ProductDescription";
import ProductReviewsFull from "./ProductReviewsFull";
import ProductDetails from "./ProductDetails";
import SizeChart from "./SizeChart";
import SimilarProductsFull from "./SimilarProductsFull";
import Image from "next/image";
import { AdsTapeBar } from "./AdsTapeBar";
import { SuggestionsProductsFull } from "./SuggestionsProductsFull";
import { MySizeInfo } from "../global/MySizeInfo";
import { CustomModal } from "../modal/CustomModal";
import FlashIcon from "../Icons/FlashIcon";
import { OFFER_BACKGROUND_COLORS } from "@/app/api/static/constants";
import { StarsIcon } from "../Icons/StarsIcon";

const HomeProducts = "https://kadinle.com/media/images/HomeProducts.svg";
const slash = "https://kadinle.com/media/images/slash.svg";

export const ProductPage = ({
  remainingTime,
  locale,
  sku,
  offers,
  product,
  regions,
  chart: productChart,
  sizes: CACHE_SIZES,
  productCategorySliders,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const { language, currency, setHistoryCategoryIds } = useGlobalOptions();
  const [target, setTarget] = useState("Details");
  const [refresh, setRefresh] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [categoryInfo, setCategoryInfo] = useState("");
  const [modelSize, setModelSize] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState();
  const [chartNumbers, setChartNumbers] = useState(null);
  const [openSizeInfo, setOpenSizeInfo] = useState(false);

  useEffect(() => {
    if (!product?.productinfo?.id) router.push("/404");
  }, [product, router]);

  useEffect(() => {
    setSelectedRegion(
      regions?.find((region) => region?.id === currency?.region_id)
    );
  }, [currency, regions]);

  // model size
  useEffect(() => {
    if (CACHE_SIZES) {
      const { productimages } = product || {};
      const imageModelSize = productimages?.[0]?.size_id;
      const filterSizesBasedOnSizeId = CACHE_SIZES[imageModelSize] || {};
      const selectedRegionId = selectedRegion?.id;
      const sizeBasedOnRegion = filterSizesBasedOnSizeId.sizesContent?.find(
        (size) => size.region_id === selectedRegionId
      );
      setModelSize(sizeBasedOnRegion?.name);
    }
  }, [product, selectedRegion?.id, CACHE_SIZES]);

  const fetchChartNumber = useCallback(async () => {
    try {
      let ids = [];
      for (const chart of productChart) {
        ids?.push(chart?.chart_id);
      }
      const response = await getChartNumbers(ids);
      let numbers = [];
      for (const chart of response?.data) {
        numbers.push(chart?.number);
      }
      setChartNumbers(numbers);
    } catch (error) {}
  }, [productChart]);

  useEffect(() => {
    if (!productChart?.length) return;
    fetchChartNumber();
  }, [fetchChartNumber, productChart]);

  return (
    <>
      <CustomModal
        containerClassName="z-[6010]"
        open={openSizeInfo}
        onClose={() => setOpenSizeInfo(false)}
      >
        <MySizeInfo />
      </CustomModal>

      <div className="flex flex-col poppins overflow-hidden ">
        <div className="flex flex-col items-center justify-center w-full mt-5">
          <div className="flex flex-col items-cente container max-w-[1500px]">
            <div className="flex gap-4 text-[12px]">
              <Link href="/">
                <Image
                  src={HomeProducts}
                  alt="home"
                  className="object-contain"
                  height={20}
                  width={20}
                />
              </Link>
              <div>
                <Image
                  src={slash}
                  alt="slash"
                  className="object-contain"
                  height={7}
                  width={7}
                />
              </div>
              <Link
                href={`/categories/${categoryInfo?.category_id}?parent_id=${
                  categoryInfo?.parent_id || categoryInfo?.category_id
                }`}
                className="text-[#B2B2B2] cursor-pointer hover:text-opink"
              >
                {categoryInfo?.title}
              </Link>
              <div>
                <Image src={slash} alt="slash" height={7} width={7} />
              </div>

              <span>
                {
                  product?.productcontents?.find(
                    (product) => product?.language_id === language?.id
                  )?.name
                }{" "}
              </span>
            </div>

            <div className="ltr:ml-0 ltr:xl:ml-[5rem] rtl:mr-0 rtl:xl:mr-[5rem] w-full">
              <Product
                regions={regions}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                product={product}
                modelSize={modelSize}
                setTarget={setTarget}
                setOpenSizeInfo={setOpenSizeInfo}
                productChart={productChart}
                CACHE_SIZES={CACHE_SIZES}
                color={color}
                setColor={setColor}
              />
            </div>
            {/* Taps offer */}
            <div className="my-4 flex items-center gap-4 justify-between">
              <AdsTapeBar
                containerClassName="bg-[#008170] text-white max-w-fit"
                title={t("free_shipping_if_you_spent", {
                  COST: `${currency?.["alph-2"] !== "TR" ? "300$" : "500TL"} `,
                })}
                icon={
                  <Image
                    src="https://kadinle.com/media/images/return.gif"
                    alt="fast shipping"
                    height={30}
                    width={30}
                    className="object-contain"
                  />
                }
              />
              {product?.productinfo?.discount ? (
                <AdsTapeBar
                  containerClassName="bg-[#F875AA] text-white max-w-fit"
                  title={`${t(`discount`)} ${product?.productinfo?.discount}`}
                  icon={<FlashIcon className="h-6 w-6 animate-pulse " />}
                />
              ) : null}
              {product?.offers?.map((offer, index) => {
                const content = offer?.offer_content?.find(
                  (c) => c?.language_id === language?.id
                );

                return (
                  <AdsTapeBar
                    key={offer?.id}
                    containerClassName={`bg-[${OFFER_BACKGROUND_COLORS?.[index]}] text-black max-w-fit`}
                    title={content?.title}
                    icon={<StarsIcon className="animate-pulse h-6 w-6" />}
                  />
                );
              })}
            </div>
            {/* Taps offer */}

            {true && <SaleTimer remainingTime={remainingTime} />}

            <div className="bg-[#F5F6F8] rounded-[10px] py-4 px-5 mt-8 text-[#707070]">
              <p className="w-4/5 inline-block">
                {t("productInsurance")}
                <Link href="/return" className="text-opink">
                  {t("exchangeAndReturnPolicy")}
                </Link>
                {locale === "tr" ||
                  (locale === "tur" && t("productInsuranceComplete"))}
                .
              </p>
            </div>

            <div className="bg-[#F5F6F8] rounded-[10px] pt-8 mt-5">
              <div className="relative flex  items-center  border-b pb-6 border-[#AEAEAE] mb-10 ltr:pl-8 rtl:pr-8">
                <button
                  onClick={(e) => setTarget("Details")}
                  className={`cursor-pointer transition duration-[300ms] ${
                    target === "Details"
                      ? "font-[700] text-[26px] "
                      : "text-[16px] text-[#AFAFAF]"
                  } `}
                >
                  {t("Details")}
                </button>
                <div
                  className={`transition duration-[300ms] ${
                    target === "Details"
                      ? `${
                          locale === "tr"
                            ? " w-[130px]"
                            : locale === "ar"
                            ? "w-[90px]"
                            : "w-[110px]"
                        } ltr:left-[25px] rtl:right-[25px] translate-x-0`
                      : target === "Information"
                      ? `${
                          locale === "tr"
                            ? " w-[100px]"
                            : locale === "ar"
                            ? "w-[110px]"
                            : "w-[140px]"
                        } ltr:translate-x-[140px] rtl:translate-x-[-105px]`
                      : `${
                          locale === "tr"
                            ? " w-[130px] !translate-x-[280px]"
                            : "w-[147px]"
                        } ltr:translate-x-[299px] rtl:translate-x-[-235px]`
                  } absolute bg-opink h-[8px] -bottom-[4px] rounded-full `}
                ></div>
                <button
                  onClick={(e) => setTarget("Information")}
                  className={`cursor-pointer transition duration-[300ms] ${
                    target === "Information"
                      ? "font-[700] text-[26px] "
                      : "text-[16px] text-[#AFAFAF]"
                  } ltr:ml-20 rtl:mr-20`}
                >
                  {t("Information")}
                </button>
                <button
                  onClick={(e) => setTarget("Size Chart")}
                  className={`cursor-pointer transition duration-[300ms] ${
                    target === "Size Chart"
                      ? "font-[700] text-[26px] "
                      : "text-[16px] text-[#AFAFAF]"
                  } ltr:ml-20 rtl:mr-20`}
                >
                  {" "}
                  {t("Size_Chart")}
                </button>
              </div>

              {target === "Details" && (
                <div className="px-4 lg:px-8">
                  <Suspense
                    fallback={
                      <div className="bg-gray-100 w-full h-96 animate-pulse" />
                    }
                  >
                    <ProductDescription
                      selectedRegion={selectedRegion}
                      setCategoryInfo={setCategoryInfo}
                      product={product}
                      categoryInfo={categoryInfo}
                      color={color}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="bg-gray-100 w-full h-96 animate-pulse" />
                    }
                  >
                    <ProductReviewsFull
                      variants={product?.productvariants}
                      product_id={product?.productinfo?.id}
                      setRefresh={setRefresh}
                      reviews={product?.productcomments}
                    />
                  </Suspense>
                </div>
              )}

              {target === "Information" && (
                <div className="ltr:pl-8 rtl:pr-8">
                  <Suspense
                    fallback={
                      <div className="bg-gray-100 w-full h-96 animate-pulse" />
                    }
                  >
                    <ProductDetails product={product} />
                  </Suspense>
                </div>
              )}

              {target === "Size Chart" && (
                <div className="ltr:pl-8 rtl:pr-8">
                  <Suspense
                    fallback={
                      <div className="bg-gray-100 w-full h-96 animate-pulse" />
                    }
                  >
                    <SizeChart
                      chartNumbers={chartNumbers}
                      productChart={productChart}
                      languageId={language?.id}
                      productId={product?.productinfo?.id}
                      regions={regions}
                      selectedRegion={selectedRegion}
                      setSelectedRegion={setSelectedRegion}
                      CACHE_SIZES={CACHE_SIZES}
                      setOpenSizeInfo={setOpenSizeInfo}
                    />
                  </Suspense>
                </div>
              )}

              <Suspense
                fallback={
                  <div className="h-96 w-full animate-pulse bg-gray-100" />
                }
              >
                <SimilarProductsFull
                  categoryId={
                    product?.productinfo?.category_content?.[0]?.category_id
                  }
                  sku={sku}
                  locale={locale}
                />
              </Suspense>
              <SuggestionsProductsFull
                category={categoryInfo}
                productCategorySliders={productCategorySliders}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
