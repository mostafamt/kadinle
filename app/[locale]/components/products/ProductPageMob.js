"use client";
import { useCallback, useEffect, useState } from "react";
import { Fragment } from "react";
// import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

import ChatModal from "../chat/ChatModal";
import { SaleTimer } from "../home/SaleTimer";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import ProductSlider from "./ProductSlider";
import { ProductStarReviews } from "./ProductStarReviews";
import SizeChart from "./SizeChart";
import ScrollUpComponent from "../global/ScrollUpComponent";
import SimilarProducts from "./SimilarProducts";
import ProductPageSliderSkeleton from "../skeletons/ProductPageSliderSkeleton";
import { getUserCart } from "@/app/api/supabase/user";
import {
  getChartNumbers,
  getWarehouseInformation,
} from "../../../api/supabase/products";

import AddComment from "./AddComment";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { getFormatPrice } from "@/app/api/lib/functions";
import { addToUser_cart } from "../../../api/supabase/user";
import { LANGUAGES, OFFER_BACKGROUND_COLORS } from "@/app/api/static/constants";
import ChatDotIcon from "../Icons/ChatDotIcon";
import { MySizeInfo } from "../global/MySizeInfo";
import { CustomModal } from "../modal/CustomModal";
import { SizeInfoBtn } from "./SizeInfoBtn";
import { AdsTapeBar } from "./AdsTapeBar";
import { SuggestionsProducts } from "./SuggestionsProducts";
import FlashIcon from "../Icons/FlashIcon";
import { ProductInfo } from "./ProductInfo";

const ExpressTruck = "https://kadinle.com/media/images/ExpressTruck.svg";
const frontPink = "https://kadinle.com/media/images/backArrow.svg";
const mobileBack = "https://kadinle.com/media/images/mobileBack.svg";
const mobileCart = "https://kadinle.com/media/images/mobileCart.svg";
const play = "https://kadinle.com/media/images/play.svg";
const share = "https://kadinle.com/media/images/share.png";
const standardShipping =
  "https://kadinle.com/media/images/standardShipping.svg";
const Next2 = "https://kadinle.com/media/images/Next2.svg";

let VARIANT_IMAGES = {};

const ProductPageMob = ({
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
  const router = useRouter();
  const t = useTranslations();
  const {
    language,
    currency,
    setRefresh: setRefreshCart,
    refresh: refreshCart,
    user,
    setHistoryCategoryIds,
    cartLength,
  } = useGlobalOptions();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("1");
  const [section, setSection] = useState("Description");
  const [refresh, setRefresh] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [maxCount, setMaxCount] = useState(false);
  const [latestCount, setLatestCount] = useState(null);
  const [outOfStocks, setOutOfStocks] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [categoryInfo, setCategoryInfo] = useState();
  const [availableSizes, setAvailableSizes] = useState();
  const [availableColors, setAvailableColors] = useState();
  const [openModalMedia, setOpenModalMedia] = useState("");
  const [filterImages, setFilterImages] = useState([]);
  const [filterVideos, setFilterVideos] = useState([]);
  const [modelSize, setModelSize] = useState(null);
  const [warehouseInformation, setWarehouseInformation] = useState();
  const [showChatModal, setShowChatModal] = useState(false);
  const [productImagesPatternSku, setProductImagesPatternSku] = useState({});
  const [selectedPatternSku, setSelectedPatternSku] = useState(null);
  const [chartNumbers, setChartNumbers] = useState(null);
  const [maxCommentsView, setMaxCommentsView] = useState(5);
  const [CACHE_CART, setCACHE_CART] = useState({});
  const [stockCount, setStockCount] = useState(0);
  const [openSizeInfo, setOpenSizeInfo] = useState(false);

  useEffect(() => {
    if (!product?.productinfo?.id) router.push("/404");
  }, [product]);

  const getHashCart = async () => {
    const res = await getUserCart();
    if (res?.error) return;
    let hash = {};
    for (const item of res?.data) {
      hash[item?.id] = item?.quantity;
    }
    setCACHE_CART(hash);
    if (selectedVariant) checkStock(selectedVariant);
  };

  useEffect(() => {
    getHashCart();
  }, [refresh]);

  useEffect(() => {
    if (selectedVariant && Object.keys(CACHE_CART)?.length)
      checkStock(selectedVariant);
  }, [CACHE_CART, selectedVariant]);

  const getSelectedVariant = useCallback(
    (color, size, patternSku) => {
      if (!product?.productvariants?.length) return;

      const productVariants = product?.productvariants;

      const productsWithPatternSku = productVariants?.filter(
        (variant) => +variant?.pattern_sku === +patternSku
      );

      let selectedVariant;

      if (productsWithPatternSku.length) {
        selectedVariant = productsWithPatternSku.find(
          (variant) =>
            variant?.color_id === color?.color_id &&
            variant?.size_id === size?.size_id
        );
      }

      if (!selectedVariant) {
        selectedVariant = productVariants?.find(
          (variant) =>
            variant?.color_id === color?.color_id &&
            variant?.size_id === size?.size_id
        );
      }

      setSelectedVariant(selectedVariant);
      setMaxCount(selectedVariant?.stocks?.[0]?.stock > 1 ? false : true);
      checkStock(selectedVariant);
    },
    [product?.productvariants]
  );

  useEffect(() => {
    if (!filterImages?.length) return;
    const productImagesSku = filterImages?.reduce((acc, cur) => {
      const imageSku = cur?.pattern_sku;
      return acc[imageSku]
        ? {
          ...acc,
          [imageSku]: [...acc[imageSku], cur],
        }
        : {
          ...acc,
          [imageSku]: [cur],
        };
    }, {});
    setProductImagesPatternSku(productImagesSku);
  }, [filterImages]);

  useEffect(() => {
    if (
      productImagesPatternSku &&
      Object.keys(productImagesPatternSku).length
    ) {
      const imagesSku = Object.keys(productImagesPatternSku);
      setSelectedPatternSku(imagesSku[0]);
    }
  }, [productImagesPatternSku]);

  useEffect(() => {
    getSelectedVariant(color, size, selectedPatternSku);
  }, [selectedPatternSku, color, size, getSelectedVariant]);

  const showPattern =
    selectedPatternSku &&
    productImagesPatternSku &&
    Object.keys(productImagesPatternSku).length > 1;

  useEffect(() => {
    if (selectedVariant) {
      getWarehouseInformation({
        countryId: currency?.id,
        warehouseId: selectedVariant?.stocks?.[0].warehouse_id,
      }).then((res) => {
        if (res?.data?.length) {
          setWarehouseInformation(res?.data?.[0]);
        }
      });
    }
  }, [currency?.id, selectedVariant]);

  useEffect(() => {
    if (!product?.productinfo?.category_id || !language?.id) return;

    if (product?.productinfo?.category_id)
      setHistoryCategoryIds((prev) => {
        return {
          ...prev,
          [product?.productinfo?.category_id]:
            product?.productinfo?.category_id,
        };
      });

    let selectedCategoryByLanguage =
      product?.productinfo?.category_content?.find(
        (category) => category?.language_id === language?.id
      );
    setCategoryInfo(selectedCategoryByLanguage);
  }, [
    product?.productinfo?.id,
    language?.id,
    product?.productinfo?.category_content,
    product?.productinfo?.category_id,
  ]);

  useEffect(() => {
    if (!product?.productimages?.length) return;

    let hashSizes = {};
    let hashColors = {};
    VARIANT_IMAGES = {};

    if (product?.productimages?.length) {
      for (const img of product?.productimages) {
        if (!VARIANT_IMAGES[img?.color_id]) VARIANT_IMAGES[img?.color_id] = img;
        else {
          if (
            VARIANT_IMAGES[img?.color_id] &&
            !img?.image?.endsWith(".mp4") &&
            img?.pattern_sku === 10 &&
            img?.image?.endsWith("1.jpg")
          ) {
            VARIANT_IMAGES[img?.color_id] = img;
          }
        }
      }
    }

    setColor(Object.values(VARIANT_IMAGES)?.[0]);
    setFilterImages(
      product?.productimages?.filter(
        (img) =>
          img?.color_id === Object.values(VARIANT_IMAGES)?.[0]?.color_id &&
          !img?.image?.endsWith(".mp4")
      )
    );
    setFilterVideos(
      product?.productimages?.filter(
        (img) =>
          img?.color_id === Object.values(VARIANT_IMAGES)?.[0]?.color_id &&
          img?.image?.endsWith(".mp4")
      )
    );

    if (product?.productvariants?.length) {
      for (const variants of product?.productvariants) {
        for (const subVariant of variants?.colorContents) {
          if (!hashColors[subVariant?.id]) {
            hashColors[subVariant?.id] = subVariant;
          }
        }
        if (
          variants?.color_id === product?.productimages?.[0]?.color_id ||
          variants?.size_id === product?.productimages?.[0]?.size_id
        ) {
          hashSizes[variants?.size_id] = {
            size_sku: variants?.size_sku,
            content: variants?.sizeContents,
            size_id: variants?.size_id,
          };
        }
      }
      let sizes = Object.values(hashSizes);
      let colors = Object.values(hashColors);
      setAvailableColors(colors);
      setAvailableSizes(sizes);
    }
  }, [
    product?.productinfo?.id,
    product?.productimages,
    product?.productvariants,
  ]);

  useEffect(() => {
    if (availableSizes?.length) {
      if (size?.id) {
        let currentSelectedSize = availableSizes?.find(
          (currentSize) => currentSize?.id === size?.id
        );
        let currentSizeRegion = currentSelectedSize?.find(
          (currentRegion) => currentRegion?.region_id === selectedRegion?.id
        );
        setSize(currentSizeRegion);
      }
      for (const currentSize of availableSizes?.[0]?.content) {
        if (currentSize?.region_id === selectedRegion?.id) {
          setSize(currentSize);
          break;
        }
      }
    }
  }, [selectedRegion?.id, availableSizes]);

  useEffect(() => {
    setSelectedRegion(
      regions?.find((region) => region?.id === currency?.region_id)
    );
  }, [currency, regions]);

  const filterColors = (color) => {
    setColor(color);
    let hashSizes = {};
    setFilterImages(
      product?.productimages?.filter(
        (img) =>
          img?.color_id === color?.color_id && !img?.image?.endsWith(".mp4")
      )
    );
    setFilterVideos(
      product?.productimages?.filter(
        (img) =>
          img?.color_id === color?.color_id && img?.image?.endsWith(".mp4")
      )
    );
    for (const variants of product?.productvariants) {
      if (
        variants?.color_id === color.color_id ||
        variants?.size_id === size?.size_id
      ) {
        hashSizes[variants?.size_id] = {
          size_sku: variants?.size_sku,
          content: variants?.sizeContents,
          size_id: variants?.size_id,
        };
      }
    }
    let sizes = Object.values(hashSizes);
    setAvailableSizes(sizes);
    if (sizes?.content) {
      for (const size of sizes?.content) {
        if (size?.region_id === selectedRegion?.id) {
          setSize(size);
          break;
        }
      }
    }
  };

  const checkStock = (variant) => {
    let stockCount = variant?.stocks?.reduce(
      (result, cur) => (result += cur?.stock),
      0
    );
    setStockCount(stockCount);
    if (stockCount < 1) {
      setOutOfStocks(true);
      setQuantity(0);
    } else if (stockCount <= CACHE_CART?.[variant?.id]) {
      setQuantity(CACHE_CART?.[variant?.id]);
      setMaxCount(true);
    } else {
      setQuantity(1);
      if (stockCount < 5) {
        setLatestCount(stockCount);
      }
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setMaxCount(false);
    }
  };

  const increaseQuantity = () => {
    let newQuantity = quantity + 1;
    if (selectedVariant && stockCount >= newQuantity) {
      setQuantity((prev) => prev + 1);
      if (newQuantity + 1 > stockCount) setMaxCount(true);
    } else {
      setMaxCount(true);
    }
  };

  const addToCart = () => {
    if (user?.id) {
      if (selectedVariant?.id) {
        addToUser_cart(selectedVariant?.id, quantity)
          .then(() => {
            setRefreshCart((p) => !p);
            toast.success(t("add_cart_msg_success"));
          })
          .catch((err) => {
            toast.error(t("add_cart_msg_failed"));
          });
      } else {
        toast.error(t("add_cart_msg_error"));
      }
    } else router?.push("/login");
  };

  const getSubPrice = (price, discount) => {
    const result = discount ? price - (discount / 100) * price : price;
    return getFormatPrice(result, currency);
  };

  const info = product?.productinfo;
  const content = product?.productcontents?.find(
    (p) => p?.language_id === language?.id
  );

  const handleShare = () => {
    if (navigator?.share) {
      navigator.share({
        url: typeof window === "object" && window.location.href,
      });
    }
  };

  // model size
  useEffect(() => {
    if (CACHE_SIZES) {
      const { productimages } = product || {};
      const imageModelSize =
        filterImages?.at(0)?.size_id || productimages?.[0]?.size_id;
      const filterSizesBasedOnSizeId = CACHE_SIZES[imageModelSize] || {};
      const selectedRegionId = selectedRegion?.id;
      const sizeBasedOnRegion = filterSizesBasedOnSizeId.sizesContent?.find(
        (size) => size.region_id === selectedRegionId
      );
      setModelSize(sizeBasedOnRegion?.name);
    }
  }, [product, selectedRegion?.id, CACHE_SIZES, filterImages]);

  useEffect(() => {
    if (Object.keys(VARIANT_IMAGES).length) {
      const firstColor = Object.values(VARIANT_IMAGES)?.[0];
      setColor(firstColor);
      setFilterImages(
        product?.productimages?.filter(
          (img) =>
            img?.color_id === color?.color_id && !img?.image?.endsWith(".mp4")
        )
      );
      setFilterVideos(
        product?.productimages?.filter(
          (img) =>
            img?.color_id === color?.color_id && img?.image?.endsWith(".mp4")
        )
      );
    }
  }, [VARIANT_IMAGES, product]);

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
    } catch (error) { }
  }, [productChart]);

  useEffect(() => {
    if (!productChart?.length) return;
    fetchChartNumber();
  }, [fetchChartNumber, productChart]);

  console.log(filterVideos);

  return (
    <>
      <CustomModal
        containerClassName="z-[6010]"
        open={openSizeInfo}
        onClose={() => setOpenSizeInfo(false)}
      >
        <MySizeInfo bodyClassName="overflow-auto max-h-[85vh]" />
      </CustomModal>
      {!!openModalMedia ? (
        <div
          className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 z-[99999] bg-[#00000091]"
          onClick={() => setOpenModalMedia("")}
        >
          <div
            onClick={(e) => e?.stopPropagation()}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          >
            <video
              src={openModalMedia}
              controls
              className="max-w-[90vh] max-h-[70vh]"
            ></video>
          </div>
        </div>
      ) : null}

      {showChatModal && <ChatModal setOpenChat={setShowChatModal} />}

      {/* <button
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-24 z-10 right-6 w-12 h-12 bg-white rounded-[50%]"
      >
        <ChatDotIcon className="text-opink scale-75" />
      </button> */}
      <div className="flex flex-col items-center justify-center w-full pb-[110px] overflow-x-hidden bg-[#F5F6F8]">
        <ScrollUpComponent scrollUp={product} />
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2  flex z-[2000] w-full justify-center ">
          <div className="absolute top-0 ltr:left-0 rtl:right-0 w-full h-full bg-[#F6F6F6] py-6 opacity-70"></div>
          <button
            onClick={handleShare}
            className="flex justify-center gap-[10px] items-center bg-owhite border w-1/2 border-opink rounded-full py-2 max-w-[130px] z-[1000] my-[10px]"
          >
            <span className="ltr:ml-4 rtl:mr-4 text-[#727C8E] text-[12px] whitespace-nowrap">
              {t("SHARE_THIS")}
            </span>
            <Image
              className=" ltr:mr-2 rtl:ml-2 ltr:ml-[5px] rtl:mr-[5px] h-[25px] w-[25px]"
              src={share}
              height={25}
              width={25}
            />
          </button>

          <button
            onClick={addToCart}
            className="ltr:ml-6 rtl:mr-6 flex justify-center gap-[10px] bg-opink items-center border w-1/2 border-opink rounded-full py-2 max-w-[170px] z-[1000] my-[10px]"
          >
            <span className="ltr:ml-4 rtl:mr-4 text-owhite text-[12px]">
              {t("add_to_cart")}
            </span>
            <span className="bg-white rounded-full h-6 w-6 rtl:rotate-180 flex justify-center items-center">
              <Image src={Next2} alt="add to cart" height={30} width={30} />
            </span>
          </button>
        </div>
        {/* <Breadcrumb
          category_id={categoryInfo?.category_id}
          categoryName={categoryInfo?.title}
          productName={content?.name}
        /> */}
        {!filterImages?.length ? (
          <ProductPageSliderSkeleton />
        ) : (
          <div className="w-full flex justify-center productColor bg-[#f6f4f3]">
            <div className="flex flex-col items-center xs:max-w-[400px] w-full">
              <div className="relative w-full flex justify-center">
                <ProductSlider
                  productId={product?.productinfo?.id}
                  color={color}
                  section={section}
                  filterImages={filterImages}
                  product={product}
                  productImagesPatternSku={productImagesPatternSku}
                  selectedPatternSku={selectedPatternSku}
                />
              </div>
            </div>
          </div>
        )}
        <div className="w-full mb-2">
          {true && <SaleTimer remainingTime={remainingTime} />}
        </div>

        <div className="flex mb-2 items-center justify-center">
          <h3 className="text-lg font-normal text-[#25252D] relative">
            {content?.name}
          </h3>
        </div>

        {/* Taps offer */}
        <div className="flex flex-col mb-6 gap-2 w-full">
          <AdsTapeBar
            containerClassName="bg-[#FFDFDF] text-black"
            title={t("free_shipping_if_you_spent", {
              COST: `${currency?.["alph-2"] !== "TR" ? "300$" : "500TL"} `,
            })}
            icon={
              <Image
                src="https://kadinle.com/media/images/fast-truck.gif"
                alt="free shipping"
                height={25}
                width={25}
                className="object-contain"
              />
            }
          />
          {product?.productinfo?.discount ? (
            <AdsTapeBar
              containerClassName="bg-[#F875AA] text-white"
              title={`${t(`discount`)} ${product?.productinfo?.discount}`}
              icon={<FlashIcon className="h-5 w-5 animate-pulse " />}
            />
          ) : null}
          {product?.offers?.map((offer, index) => {
            const content = offer?.offer_content?.find(
              (c) => c?.language_id === language?.id
            );
            return (
              <AdsTapeBar
                key={offer?.id}
                containerClassName={`bg-[${OFFER_BACKGROUND_COLORS?.[index]}] text-black`}
                title={content?.title}
                icon={
                  <Image
                    src="https://kadinle.com/media/images/return.gif"
                    alt="fast shipping"
                    height={25}
                    width={25}
                    className="object-contain"
                  />
                }
              />
            );
          })}
        </div>
        {/* Taps offer */}

        <div className="flex flex-col items-centers w-[90%] xs:max-w-[390px]">
          <Fragment>
            <div className="flex w-full justify-center mt-1">
              <div className="flex w-[80%] justify-between text-[15px]">
                <button
                  onClick={(e) => setSection("Description")}
                  className={`${section === "Description" && "bg-owhite text-opink"
                    } rounded-full text-[#727C8E] w-[70px] h-[25px] flex items-center justify-center`}
                >
                  <p>{t("Product")}</p>
                </button>
                <button
                  onClick={(e) => setSection("Details")}
                  className={`${section === "Details" && "bg-owhite text-opink"
                    } rounded-full text-[#727C8E] w-[70px] h-[25px] flex items-center justify-center`}
                >
                  <p>{t("Details")}</p>
                </button>
                <button
                  onClick={(e) => setSection("Size Chart")}
                  className={`${section === "Size Chart" && "bg-owhite text-opink"
                    } rounded-full text-[#727C8E] w-[80px] h-[30px] flex items-center justify-center`}
                >
                  <p className="whitespace-nowrap">{t("Size_Chart")}</p>
                </button>
              </div>
            </div>
          </Fragment>
          <Fragment>
            {section === "Description" && (
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <p className="font-semibold text-[19px]">
                      {getSubPrice(
                        product?.productinfo?.price,
                        product?.productinfo?.discount
                      )}
                    </p>
                    {product?.productinfo?.discount ? (
                      <del className="text-[#939393] diagonalCross2 text-[15px] font-semibold">
                        {getFormatPrice(product?.productinfo?.price, currency)}
                      </del>
                    ) : null}
                  </div>
                  <div className="flex gap-[2px] justify-center gap-[2px] items-center">
                    <ProductStarReviews reviews={product?.productcomments} />
                  </div>
                </div>
                <div className="flex gap-3 items-center my-3 justify-center">
                  {regions?.map((region) => (
                    <button
                      onClick={(e) => setSelectedRegion(region)}
                      key={region?.name}
                      className={`flex  flex-col items-center cursor-pointer px-2 pb-1 ${selectedRegion?.id === region?.id
                          ? "text-opink border-b-2 border-opink "
                          : ""
                        } `}
                    >
                      {region?.name}
                    </button>
                  ))}
                </div>
                <div>
                  {availableSizes?.length ? (
                    <>
                      <div className="flex flex-col gap-5  text-[16px] font-[300] mt-2">
                        <p className="text-[#727C8E] font-[300]">
                          {t("SELECT_SIZE")}:
                        </p>
                      </div>

                      <div className="flex w-full gap-2 mt-2 ">
                        {availableSizes
                          ?.sort((a, b) => a?.size_sku - b?.size_sku)
                          ?.map((currentSize) => {
                            let theSizeContent = currentSize?.content?.find(
                              (size) => size?.region_id === selectedRegion?.id
                            );
                            return (
                              <div
                                key={theSizeContent?.id}
                                onClick={(e) => setSize(theSizeContent)}
                                className="border border-[#E264AD] rounded-[5px] px-1  h-[43px] md:h-[48px] flex items-center justify-center"
                              >
                                <div
                                  className={`${size?.id === theSizeContent?.id
                                      ? "bg-opink text-owhite font-[300]"
                                      : "bg-owhite text-black border"
                                    } cursor-pointer px-2 h-[34px] rounded-[3px] min-w-[30px] flex items-center justify-center `}
                                >
                                  <p className="text-[15px]">
                                    {theSizeContent?.name}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </>
                  ) : null}

                  <div className="flex flex-col gap-1 mt-4">
                    <p className="text-[#727C8E] font-[300] uppercase flex gap-2 items-center">
                      {t("modelSize")}:
                      <span className="font-medium text-sm">{modelSize}</span>
                    </p>
                    <SizeInfoBtn
                      selectedRegion={selectedRegion}
                      setOpenSizeInfo={setOpenSizeInfo}
                      productChart={productChart}
                      sizes={CACHE_SIZES}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 mt-2">
                  <p className="text-[#727C8E] font-[300]">
                    {t("SELECT_COLOR")}:
                  </p>
                  <div className="flex gap-[6px]">
                    {Object.values(VARIANT_IMAGES)?.map((currentColor) => (
                      <Image
                        key={currentColor?.id}
                        onClick={() => filterColors(currentColor)}
                        className={`w-[45px]  h-16 object-contain border ${currentColor?.id === color?.id && "border-opink"
                          }`}
                        src={currentColor?.image}
                        alt="product color"
                        height={45}
                        width={64}
                      />
                    ))}
                    {filterVideos?.length ? (
                      <>
                        {filterVideos?.map((vid) => (
                          <div
                            key={vid?.id}
                            className={`relative cursor-pointer border h-16 w-20 ${vid?.id === color?.id && "border-opink"
                              }`}
                          >
                            <video
                              key={vid?.id}
                              onClick={(e) => {
                                setOpenModalMedia(vid?.image);
                                filterColors(vid);
                              }}
                              className={`w-full h-full object-cover object-center border `}
                              src={vid?.image}
                              alt="product video"
                            />
                            <span className="absolute top-0 pointer-events-none left-0 w-full h-full flex items-center justify-center">
                              <Image
                                src={play}
                                alt="play video"
                                height={15}
                                width={15}
                              />
                            </span>
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
                {showPattern && (
                  <div className="flex flex-col space-y-2 mt-2">
                    <p className="text-[#727C8E] font-[300]">{t("pattern")}:</p>
                    <div className="flex gap-[6px]">
                      {Object.entries(productImagesPatternSku)?.map(
                        ([patternSku, images]) => {
                          const image = images[0];
                          const imageSrc = image.image;
                          const imagePattern = image.pattern_sku;
                          const selected = +selectedPatternSku === imagePattern;
                          return (
                            <Image
                              key={patternSku}
                              onClick={() =>
                                setSelectedPatternSku(imagePattern)
                              }
                              className={`max-w-[60px] h-16 object-contain border ${selected && "border-opink"
                                }`}
                              src={imageSrc}
                              alt="product pattern sku"
                              height={64}
                              width={50}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col mt-2">
                  <p className="font-semibold text-[12px] md:text-[14px]">
                    {t("Quantity")}
                  </p>
                  {maxCount ? (
                    <p className="text-red-500 text-xs bg-red-100 p-1 rounded-md px-4 mb-[8px]">
                      {t("reach_max_count")}
                    </p>
                  ) : latestCount ? (
                    <p className="text-red-500 bg-red-100 p-1 my-2 rounded-md px-4">
                      {t("reach_latest_five", { count: latestCount })}
                    </p>
                  ) : null}
                  <div className="flex gap-10">
                    {outOfStocks ? (
                      <p className="text-red-500 text-xs bg-red-100 p-1 rounded-md px-4 mb-[8px]">
                        {t("out_stock")}
                      </p>
                    ) : (
                      <div className="border flex justify-around border-opink w-[90px] text-[16px] rounded-[4px] py-1">
                        <button
                          disabled={quantity === 1}
                          onClick={decreaseQuantity}
                          className={`disabled:text-opink disabled:cursor-not-allowed  cursor-pointer ${quantity <= 1 && "text-[#D8D8D8]"
                            }`}
                        >
                          -
                        </button>
                        <p>{quantity}</p>
                        <button
                          disabled={maxCount}
                          onClick={increaseQuantity}
                          className="disabled:text-opink disabled:cursor-not-allowed font-[500] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 w-full bg-white p-2 rounded-md text-[10px]">
                  <div className="flex flex-col">
                    {warehouseInformation?.shipping?.min_normal_duration ? (
                      <div className="flex gap-2">
                        <Image
                          className="w-[40px] min-w-[40px]"
                          alt="express"
                          src={standardShipping}
                          height={40}
                          width={40}
                        />
                        <div className="flex flex-col gap-1">
                          <span className="text-black flex font-medium">
                            {t("Delivery")}
                          </span>
                          {warehouseInformation?.shipping
                            ?.min_normal_duration ? (
                            <div className="flex flex-wrap gap-1 items-center justify-between">
                              <p className="text-gray-600 text-[10px] flex gap-2 w-[130px] items-center">
                                {t("Delivery")}:
                                <span className="text-black flex">
                                  {
                                    warehouseInformation?.shipping
                                      ?.min_normal_duration
                                  }{" "}
                                  -{" "}
                                  {
                                    warehouseInformation?.shipping
                                      ?.max_normal_duration
                                  }{" "}
                                  {t("days")}
                                </span>
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    {warehouseInformation?.shipping?.min_fast_duration ? (
                      <div className="flex gap-2">
                        <Image
                          className="w-[40px] min-w-[40px]"
                          alt="express"
                          src={ExpressTruck}
                          height={40}
                          width={40}
                        />
                        <div className="flex flex-col gap-1">
                          <span className="text-black flex font-medium">
                            {t("expressDelivery")}
                          </span>
                          <div className="flex flex-wrap gap-1 items-center justify-between">
                            <p className="text-gray-600 text-[10px] flex gap-2 w-[130px] items-center">
                              {t("Delivery")}:
                              <span className="text-black flex">
                                {
                                  warehouseInformation?.shipping
                                    ?.min_fast_duration
                                }{" "}
                                -{" "}
                                {
                                  warehouseInformation?.shipping
                                    ?.max_fast_duration
                                }{" "}
                                {t("days")}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="bg-white rounded-[10px] py-3 px-2 mt-3 text-[#707070] text-xs">
                  <p className="inline-block">
                    {t("productInsurance")}
                    <Link href="/return" className="text-opink">
                      {t("exchangeAndReturnPolicy")}
                    </Link>
                    {locale === "tr" ||
                      (locale === "tur" && t("productInsuranceComplete"))}
                    .
                  </p>
                </div>
                <ProductInfo
                  content={content}
                  info={info}
                  categoryInfo={categoryInfo}
                  language={language}
                  availableColors={availableColors}
                />
              </div>
            )}

            {section === "Details" && (
              <ProductDetails
                sku={product?.productinfo?.product_sku}
                barcode={product?.productinfo?.barcode}
                brand={info?.brand}
                origin={product?.productinfo?.origin?.[0]?.name}
              />
            )}

            {section === "Size Chart" && (
              <SizeChart
                chartNumbers={chartNumbers}
                productChart={productChart}
                languageId={LANGUAGES?.[locale]}
                regions={regions}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                CACHE_SIZES={CACHE_SIZES}
                setOpenSizeInfo={setOpenSizeInfo}
              />
            )}
            <div className="mt-4 flex flex-col w-full">
              <h4 className="text-sm font-medium text-[#707070] mb-2">
                {t("Customer_comment")}
              </h4>
              {product?.productcomments?.length ? (
                <>
                  {product?.productcomments
                    ?.slice(0, maxCommentsView)
                    ?.map((review) => (
                      <ProductReviews
                        review={review}
                        key={review?.id}
                        color={"blue"}
                        images={true}
                      />
                    ))}
                  {product?.productcomments?.length > maxCommentsView ? (
                    <button
                      onClick={() => setMaxCommentsView((prev) => prev + 15)}
                    >
                      {t("more")}
                    </button>
                  ) : null}
                </>
              ) : (
                <p className="text-xs text-center py-3 text-gray-400 -mt-2 mb-4">
                  {t("empty_comments")}
                </p>
              )}

              <AddComment
                setRefresh={setRefresh}
                productId={product?.productinfo?.id}
                variants={product?.productVariants}
              />
            </div>
          </Fragment>

          <div className="flex flex-col pt-2 border-t">
            <h3 className="text-[#707070] mb-1 text-sm font-medium">
              {t("Similar_Products")}
            </h3>
            <SimilarProducts sku={sku} />
            <SuggestionsProducts
              category={categoryInfo}
              productCategorySliders={productCategorySliders}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPageMob;
