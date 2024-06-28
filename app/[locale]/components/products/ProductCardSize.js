"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { SizeInfoBtn } from "./SizeInfoBtn";

const ProductCardSize = ({
  regions,
  selectedRegion,
  setSelectedRegion,
  availableSizes,
  setSize,
  size,
  modelSize,
  setOpenSizeInfo,
  productChart,
  CACHE_SIZES,
}) => {
  const t = useTranslations();
  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap justify-between my-3 text-[5px] lg:text-sm">
        {regions?.map((region) => (
          <button
            onClick={(e) => setSelectedRegion(region)}
            key={region?.name}
            className={` flex  flex-col text-[10px] items-center cursor-pointer lg:px-2 lg:pb-1 ${
              selectedRegion?.id === region?.id
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
            <div className="flex flex-col gap-5  text-[10px] font-[300] mt-2">
              <p className="text-[#727C8E] ">{t("SELECT_SIZE")}:</p>
            </div>

            <div className="flex flex-wrap w-full mt-2 ">
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
                        className={`${
                          size?.id === theSizeContent?.id
                            ? "bg-opink text-owhite font-[300]"
                            : "bg-owhite text-black border"
                        } cursor-pointer px-1 h-[34px] rounded-[3px] min-w-[30px] flex items-center justify-center `}
                      >
                        <p className="text-[12px]">{theSizeContent?.name}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        ) : null}

        <div className="flex flex-col gap-1 mt-4">
          <p className="text-[#727C8E] text-[10px] font-[300] uppercase flex gap-2 items-center">
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
    </div>
  );
};

export default ProductCardSize;
