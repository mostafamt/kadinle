"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { useTranslations } from "next-intl";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import {
  addToUser_cart,
  getUserCart,
  likeProduct,
  unlikeProduct,
} from "@/app/api/supabase/user";
import { getWarehouseInformation } from "@/app/api/supabase/products";
import { getFormatPrice } from "@/app/api/lib/functions";
import ShareProductFull from "./ShareProductFull";
import Image from "next/image";
import ProductSliderFull from "./ProductSliderFull";
import { ProductStarReviews } from "./ProductStarReviews";
import { AdsTapeBar } from "./AdsTapeBar";
import { SizeInfoBtn } from "./SizeInfoBtn";

SwiperCore.use([Pagination, Navigation]);

const discountOutline = "https://kadinle.com/media/images/discountOutline.svg";
const ExpressTruck = "https://kadinle.com/media/images/ExpressTruck.svg";
const liked = "https://kadinle.com/media/images/liked.svg";
const play = "https://kadinle.com/media/images/play.png";
const productLike = "https://kadinle.com/media/images/productLike.svg";
const productShare = "https://kadinle.com/media/images/productShare.svg";
const standardShipping =
  "https://kadinle.com/media/images/standardShipping.svg";
let VARIANT_IMAGES = {};
const Product = ({
  product,
  regions,
  selectedRegion,
  setSelectedRegion,
  modelSize,
  setTarget,
  setOpenSizeInfo,
  productChart,
  CACHE_SIZES,
  color,
  setColor
}) => {
  const {
    user,
    setShowAuthPopup,
    setRefresh,
    favoritesList,
    setRefreshFavorite,
    language,
    currency,
    refresh,
  } = useGlobalOptions();
  const t = useTranslations();
  const [isFavoriteProduct, setIsFavoriteProduct] = useState();
  const [target2, setTarget2] = useState();
  const swiperRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [share, setShare] = useState(false);
  const [maxCount, setMaxCount] = useState(0);
  const [latestCount, setLatestCount] = useState(null);
  const [outOfStocks, setOutOfStocks] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState();
  const [filterImages, setFilterImages] = useState([]);
  const [filterVideos, setFilterVideos] = useState([]);
  const [openModalMedia, setOpenModalMedia] = useState("");
  const [hoveredImage, setHoveredImage] = useState("");
  const [warehouseInformation, setWarehouseInformation] = useState();
  const [productImagesPatternSku, setProductImagesPatternSku] = useState({});
  const [selectedPatternSku, setSelectedPatternSku] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [CACHE_CART, setCACHE_CART] = useState({});
  const [stockCount, setStockCount] = useState(0);

  
  const getHashCart = async () => {
    const res = await getUserCart();
    if (res?.error || !res?.data?.length) return;
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
    if (swiper !== null && filterImages) {
      swiper.slideTo(target2);
    }
  }, [target2]);

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
    if (product?.productvariants?.length) {
      let hashSize = {};
      for (const variants of product?.productvariants) {
        if (
          variants?.color_id === product?.productimages?.[0]?.color_id ||
          variants?.size_id === product?.productimages?.[0]?.size_id
        ) {
          hashSize[variants?.size_id] = {
            size_sku: variants?.size_sku,
            content: variants?.sizeContents,
            size_id: variants?.size_id,
          };
        }
      }
      setAvailableSizes(Object.values(hashSize));
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
  }, [
    product?.productinfo?.id,
    product?.productimages,
    product?.productvariants,
  ]);

  useEffect(() => {
    if (favoritesList?.[product?.productinfo?.id]) {
      setIsFavoriteProduct(true);
    } else {
      setIsFavoriteProduct(false);
    }
  }, [favoritesList, product?.productinfo?.id]);

  useEffect(() => {
    if (filterImages) setTarget2(0);
  }, [filterImages]);

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
  const filterColors = (color) => {
    setColor(color);
    let hashSize = {};
    if (product?.productvariants?.length) {
      for (const variants of product?.productvariants) {
        if (
          variants?.color_id === color.color_id ||
          variants?.size_id === color.size_id
        ) {
          hashSize[variants?.size_id] = {
            size_sku: variants?.size_sku,
            content: variants?.sizeContents,
            size_id: variants?.size_id,
          };
        }
      }
      setAvailableSizes(Object.values(hashSize));
    }
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
  };

  const getSubPrice = (price, discount) => {
    const result = discount ? price - (discount / 100) * price : price;

    return getFormatPrice(result, currency);
  };

  const toggleFavorite = () => {
    if (!user?.id) {
      setShowAuthPopup(true);
      return;
    }

    if (isFavoriteProduct) {
      unlikeProduct(product?.productinfo?.id).then(() => {
        setRefreshFavorite((p) => !p);
      });
    } else {
      likeProduct(product?.productinfo?.id).then(() => {
        setRefreshFavorite((p) => !p);
      });
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
            setRefresh((p) => !p);
            toast.success(t("add_cart_msg_success"));
          })
          .catch((err) => {
            toast.error(t("add_cart_msg_failed"));
          });
      } else {
        toast.error(t("add_cart_msg_error"));
      }
    } else setShowAuthPopup(true);
  };
  const content = product?.productcontents?.find(
    (p) => p?.language_id === language?.id
  );

  const filteredImagesWithPatternSku =
    productImagesPatternSku?.[selectedPatternSku] || filterImages || [];

  const sortedImages =
    filteredImagesWithPatternSku?.sort((a, b) => {
      const aDotIndex = a?.image?.lastIndexOf(".");
      const bDotIndex = b?.image?.lastIndexOf(".");

      const aNumber = a?.image?.[aDotIndex - 1];
      const bNumber = b?.image?.[bDotIndex - 1];

      return aNumber - bNumber;
    }) || [];

  return (
    <>
      {!!openModalMedia ? (
        <div
          className="fixed w-screen h-screen left-0 bottom-0 right-0 z-[99999] bg-[#00000091]"
          onClick={() => setOpenModalMedia("")}
        >
          <div
            onClick={(e) => e?.stopPropagation()}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden"
          >
            <video
              className="w-full h-full max-w-[90vh] max-h-[85vh]"
              src={openModalMedia}
              controls
            ></video>
          </div>
        </div>
      ) : null}
      <div>
        <div className={`${share === true ? "block" : "hidden"}`}>
          <ShareProductFull setShare={setShare} />
        </div>

        <div className="flex gap-[65px] mt-5">
          <div className="w-[283px] md:w-[319px] lg:w-[360px] xl:w-[390px] relative">
            {product?.productinfo?.discount ? (
              <div className="absolute w-[70px] top-[10px] left-[10px] z-[5000]">
                <Image
                  className="w-full object-contain"
                  src={discountOutline}
                  alt="discount"
                  height={70}
                  width={60}
                />
                <div className="absolute top-[20px] ltr:left-[22px] rtl: right-[22px] text-owhite text-[12px] font-[600] rotate-[340deg]">
                  <span>{product?.productinfo?.discount}%</span>
                  <p className="text-center self-center -mt-[4px]">
                    {t("off")}
                  </p>
                </div>
              </div>
            ) : null}
            <div className="absolute right-[10px] top-[10px] flex flex-col z-[5000]">
              <Image
                onClick={() => {
                  toggleFavorite();
                  isFavoriteProduct
                    ? setIsFavoriteProduct(false)
                    : setIsFavoriteProduct(true);
                }}
                className="w-[35px] mb-[5px] cursor-pointer"
                src={isFavoriteProduct ? liked : productLike}
                alt="product favorite"
                height={35}
                width={35}
              />
              <button>
                <Image
                  onClick={(e) => setShare(true)}
                  className="w-[35px] cursor-pointer"
                  src={productShare}
                  alt="share product"
                  height={35}
                  width={35}
                />
              </button>
            </div>
            <Swiper
              dir="ltr"
              onSwiper={setSwiper}
              modules={[Pagination, Navigation]}
              direction="horizontal"
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={() => {
                setTarget2(swiperRef?.current?.realIndex);
              }}
              className="mySwiper single-product-slider"
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              showsPagination={true}
              pagination={{
                renderBullet: function (index, className) {
                  return `<span className="${className}"></span>`;
                },
                clickable: true,
                bulletClass: "swiper-bullet",
                bulletActiveClass: "swiper-bullet-active",
              }}
            >
              {sortedImages?.map((img) => (
                <SwiperSlide key={img?.image}>
                  {!!hoveredImage ? (
                    <ProductSliderFull src={hoveredImage} />
                  ) : (
                    <ProductSliderFull src={img?.image} />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex flex-col gap-1 ">
            <ProductStarReviews reviews={product?.productcomments} />
            <div className="flex items-center gap-[55px] mb-[10px] lg:mb-0">
              {content?.name ? (
                <h3 className="text-[19px] md:text-[22px] lg:text-[29px] whitespace-nowrap">
                  {content?.name}
                </h3>
              ) : (
                <span className="w-48 h-10 bg-gray-200 animate-pulse" />
              )}
              <div className="bg-opink rounded-full p-[4px] px-[8px] text-[12px] text-owhite">
                {t("SALE")}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-6 text-[21px] md:text-[28px] mb-0">
                <p className="text-opink">
                  {getSubPrice(
                    product?.productinfo?.price,
                    product?.productinfo?.discount
                  )}
                </p>
                {product?.productinfo?.discount ? (
                  <del className="text-[#CECECE]">
                    {getFormatPrice(product?.productinfo?.price, currency)}
                  </del>
                ) : null}
              </div>
              <p className=" text-[13px] -mt-[3px] text-[#D8D8D8]">
                {t("product_ID")} : {product?.productinfo?.product_sku}
              </p>
            </div>

            <div className="flex items-center gap-6 mt-[10px]">
              <h4 className="font-[600] text-[12px] md:text-[14px]">
                {t("Size")}:
              </h4>
              <a
                href="#sizeChart"
                onClick={() => setTarget("Size Chart")}
                className="flex gap-3 text-[12px] text-opink"
              >
                ( {t("See_size_table")} )
              </a>
            </div>

            <div className="flex gap-9 text-[14px] md:text-[16px] my-4 ltr:ml-4 rtl:mr-4 font-[300]">
              {regions?.map((region) => (
                <button
                  onClick={(e) => setSelectedRegion(region)}
                  key={region?.name}
                  className={`flex flex-col font-normal items-center cursor-pointer px-2 pb-1 ${
                    selectedRegion?.id === region?.id
                      ? "text-opink font-medium border-b-2 border-opink "
                      : ""
                  } `}
                >
                  {region?.name}
                </button>
              ))}
            </div>

            <div className="flex gap-5">
              <div className="flex gap-3">
                {availableSizes
                  ?.sort((a, b) => a?.size_sku - b?.size_sku)
                  ?.map((currentSize) => {
                    let theSizeContent = currentSize?.content.find(
                      (size) => size?.region_id === selectedRegion?.id
                    );
                    return (
                      <div
                        key={theSizeContent?.id}
                        onClick={(e) => setSize(theSizeContent)}
                        className="border border-[#E264AD] rounded-[5px] px-1  h-[43px] md:h-[48px] flex items-center justify-center"
                      >
                        <div
                          className={`${
                            size?.id === theSizeContent?.id
                              ? "bg-opink text-owhite font-[300]"
                              : "bg-owhite text-[#000000] border"
                          } cursor-pointer px-2 h-[34px] min-w-[30px] rounded-[3px] flex items-center justify-center `}
                        >
                          <p className="text-[15px]">{theSizeContent?.name}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-[600] text-[12px] md:text-[14px] flex gap-2 items-center">
                  {t("modelSize")}:
                  <span className="font-medium text-sm">{modelSize}</span>
                </p>
                <SizeInfoBtn selectedRegion={selectedRegion} setOpenSizeInfo={setOpenSizeInfo} productChart={productChart} sizes={CACHE_SIZES} />
              </div>
            </div>

            <div className="flex flex-col w-full my-2">
              <h4 className="font-[600] text-[12px] md:text-[14px] mb-[8px]">
                {t("Color")}:
              </h4>
              <div className="flex gap-2 flex-wrap">
                {Object.values(VARIANT_IMAGES)?.map((currentColor) => (
                  <Image
                    key={currentColor?.id}
                    onMouseOver={(e) => {
                      if (currentColor?.id !== color?.id)
                        setHoveredImage(currentColor?.image);
                    }}
                    onMouseLeave={(e) => setHoveredImage("")}
                    onClick={(e) => filterColors(currentColor)}
                    className={`w-[50px] min-h-[65px] max-h-[80px] cursor-pointer rounded-md object-contain border ${
                      currentColor?.id === color?.id && "border-opink"
                    }`}
                    src={currentColor?.image}
                    alt="product color"
                    height={80}
                    width={50}
                  />
                ))}
                {filterVideos?.length ? (
                  <>
                    {filterVideos?.map((vid) => (
                      <div
                        key={vid?.id}
                        className={`relative cursor-pointer min-w-[50px] h-[80px] w-20 border ${
                          vid?.id === color?.id && "border-opink"
                        }`}
                      >
                        <video
                          key={vid?.id}
                          onClick={(e) => {
                            filterColors(vid);
                            setOpenModalMedia(vid?.image);
                          }}
                          className={`w-full h-full object-cover border `}
                          src={vid?.image}
                          alt="product video"
                        />
                        <span className="absolute top-0 pointer-events-none left-0 w-full h-full flex items-center justify-center">
                          <Image
                            src={play}
                            alt="play video"
                            className="w-7 h-7"
                            height={28}
                            width={28}
                          />
                        </span>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
            {showPattern && (
              <div className="flex flex-col w-full mt-2 mb-2">
                <h4 className="font-[600] text-[12px] md:text-[14px] mb-[8px] capitalize">
                  {t("pattern")}:
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(productImagesPatternSku)?.map(
                    ([patternSku, images]) => {
                      const image = images[0];
                      const imageSrc = image.image;
                      const imagePattern = image.pattern_sku;
                      const selected = +selectedPatternSku === imagePattern;
                      return (
                        <Image
                          key={patternSku}
                          onMouseOver={() => {
                            setHoveredImage(imageSrc);
                          }}
                          onMouseLeave={() => setHoveredImage("")}
                          onClick={() => setSelectedPatternSku(imagePattern)}
                          className={`max-w-[60px] h-[80px] cursor-pointer rounded-md object-contain border ${
                            selected && "border-opink"
                          }`}
                          src={imageSrc}
                          alt="product pattern sku"
                          height={80}
                          width={50}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col ">
              <h4 className="font-[600] text-[12px] md:text-[14px] ">
                {t("Quantity")}:
              </h4>
              {maxCount ? (
                <p className="text-red-500 bg-red-100 p-1 my-2 rounded-md px-4">
                  {t("reach_max_count")}
                </p>
              ) : latestCount ? (
                <p className="text-red-500 bg-red-100 p-1 my-2 rounded-md px-4">
                  {t("reach_latest_five", { count: latestCount })}
                </p>
              ) : null}
              <div className="flex gap-10">
                {outOfStocks ? (
                  <p className="text-red-500 bg-red-100 p-1 my-2 rounded-md px-4 ">
                    {t("out_stock")}
                  </p>
                ) : (
                  <>
                    <div className="border flex justify-around border-opink w-[90px] text-[16px] rounded-[4px] py-1">
                      <button
                        disabled={quantity === 1}
                        onClick={decreaseQuantity}
                        className={`disabled:text-opink disabled:cursor-not-allowed  cursor-pointer ${
                          quantity <= 1 && "text-[#D8D8D8]"
                        }`}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        disabled={maxCount}
                        onClick={increaseQuantity}
                        className="disabled:text-opink disabled:cursor-not-allowed font-[500] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={addToCart}
                      className="bg-opink text-owhite text-[13px] flex items-center justify-center w-[135px] rounded-[4px] hover:bg-owhite hover:text-opink cursor-pointer hover:border hover:border-opink"
                    >
                      {t("ADD_TO_CART")}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 w-full bg-white p-2 rounded-md text-sm">
              <div className="flex gap-1 flex-1 flex-col mb-2">
                <div className="flex gap-2 items-center justify-between">
                  {warehouseInformation?.shipping?.min_normal_duration ? (
                    <p className="text-gray-600 flex gap-2 items-center w-[130px] ">
                      {t("Delivery")}:
                      <span className="text-black flex whitespace-nowrap">
                        {warehouseInformation?.shipping_duration_min} -{" "}
                        {warehouseInformation?.shipping_duration_max}{" "}
                        {t("days")}
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                {/* <div className="flex gap-2 pb-[10px] border-b mb-2">
                  <Image
                    className="w-12 min-w-[48px] h-12"
                    alt="express"
                    src={standardShipping}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-black flex font-medium">
                      {t("Free_Delivery")}
                    </span>
                    <div>
                      {warehouseInformation?.min_price_free_shipping ? (
                        <p className="text-gray-600 flex gap-[3px] items-center pb-1">
                          {t("if_you_spend")}
                          <span className="text-black flex font-medium">
                          {getFormatPrice()}
                          </span>
                          {t("on_items_shipped")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div> */}
                {warehouseInformation?.shipping?.min_normal_duration ? (
                  <div className="flex gap-2">
                    <Image
                      className="w-12 h-12 min-w-[48px]"
                      alt="standard Shipping"
                      src={standardShipping}
                      height={48}
                      width={48}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-black flex font-medium">
                        {t("standard_shipping")}
                      </span>
                      <div className="flex flex-wrap gap-1 items-center justify-between">
                        <p className="text-gray-600 flex gap-2 w-[130px] items-center">
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
                    </div>
                  </div>
                ) : null}
                {warehouseInformation?.shipping?.min_fast_duration ? (
                  <div className="flex gap-2">
                    <Image
                      className="w-12 h-12 min-w-[48px]"
                      alt="express"
                      src={ExpressTruck}
                      height={48}
                      width={48}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-black flex whitespace-nowrap font-medium">
                        {t("Express_Delivery")}
                      </span>

                      <div className="flex flex-wrap gap-1 items-center justify-between">
                        {/* <p className="text-gray-600 flex gap-2 items-center">
                          {t("Fast_shipping_cost")}:{" "}
                          <span className="text-black flex font-medium">
                              {getFormatPrice(warehouseInformation?.shipping?.fast_shipping_price, currency)}
                          </span>
                        </p> */}
                        <p className="text-gray-600 flex gap-2 w-[130px] items-center">
                          {t("Delivery")}:
                          <span className="text-black whitespace-nowrap flex">
                            {warehouseInformation?.shipping?.min_fast_duration}{" "}
                            -{" "}
                            {warehouseInformation?.shipping?.max_fast_duration}{" "}
                            {t("days")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
