"use client";

import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Range from "./Range";
const upArrow = "https://kadinle.com/media/images/upArrow.svg";

const Filters = ({
  filters,
  selectedCategories,
  selectedColors,
  selectedSizes,
  setSelectedCategories,
  setSelectedColors,
  setSelectedSizes,
  setPriceValues,
  setRefreshFilter,
  currency,
  selectedBrand,
  setSelectedBrand,
  selectedSeason,
  setSelectedSeason,
}) => {
  const t = useTranslations();
  const { language } = useGlobalOptions();
  const [refresh, setRefresh] = useState(false);
  const [collapse, setCollapses] = useState([]);

  const insertIntoFilter = (id) => {
    if (!selectedCategories?.includes(id)) {
      setSelectedCategories((prev) => [...prev, id]);
    } else {
      let filter = selectedCategories?.filter((item) => item !== id);
      setSelectedCategories(filter);
    }
    setRefreshFilter((p) => !p);
  };

  const insertIntoBrand = (brand) => {
    setSelectedBrand(brand);
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
  };

  const insertIntoSeason = (season) => {
    setSelectedSeason(season);
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
  };

  const handleCollapse = (type) => {
    if (collapse?.includes(type)) {
      setCollapses((prev) => prev.filter((item) => item !== type));
    } else {
      setCollapses((prev) => {
        return [...prev, type];
      });
    }
  };

  const insertIntoSizes = (size) => {
    if (!selectedSizes[size]) {
      setSelectedSizes((prev) => {
        return {
          ...prev,
          [size]: size,
        };
      });
    } else {
      let sizes = selectedSizes;
      delete sizes[size];
      setSelectedSizes(sizes);
      setRefresh((p) => !p);
      setRefreshFilter((p) => !p);
    }
  };

  const insertIntoColors = (color) => {
    if (!selectedColors[color]) {
      setSelectedColors((prev) => {
        return {
          ...prev,
          [color]: color,
        };
      });
    } else {
      let colors = selectedColors;
      delete colors[color];
      setSelectedColors(colors);
      setRefresh((p) => !p);
      setRefreshFilter((p) => !p);
    }
  };

  return (
    <div className="flex self-start w-[280px] mt-4">
      <div className="flex flex-col w-full ">
        <h3 className="text-[24px] lg:text-[26px] font-[200] h-[51px]">
          {t("Filters")}
        </h3>
        <div className=" flex flex-col space-y-4 mt-[20px] ">
          {filters?.CACHE_SUBCATEGORIES?.length ? (
            <div className="flex flex-col p-6 border">
              <div className="flex justify-between ">
                <label className="text-[15px]">{t("PRODUCT_TYPE")}</label>
                <Image
                  className={`cursor-pointer w-3 h-3 object-contain ${
                    !collapse?.includes("category")
                      ? "rotate-90"
                      : "rotate-[270deg]"
                  } `}
                  src={upArrow}
                  alt="arrow up"
                  onClick={() => handleCollapse("category")}
                  height={8}
                  width={8}
                />
              </div>
              {collapse?.includes("category") ? (
                <div className="flex flex-col mt-4 space-y-4  max-h-[300px] overflow-auto scroll-hide">
                  {filters?.CACHE_SUBCATEGORIES?.map((cate) => (
                    <label className="flex items-center gap-2" key={cate?.id}>
                      <input
                        onChange={() => insertIntoFilter(cate?.id)}
                        type="checkbox"
                        className="w-6 h-6 accent-primary"
                        name=""
                        value={cate}
                      />
                      {
                        cate?.content?.find(
                          (category) => category?.language_id === language?.id
                        )?.title
                      }
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* second */}
          {filters?.CACHE_BRANDS?.length ? (
            <div className="flex flex-col  p-6 border">
              <div className="flex justify-between">
                <label className="text-[17px]">{t("brand")}</label>
                <Image
                  className={`cursor-pointer w-3 h-3 object-contain ${
                    !collapse?.includes("brand")
                      ? "rotate-90"
                      : "rotate-[270deg]"
                  } `}
                  src={upArrow}
                  alt="arrow up"
                  onClick={() => handleCollapse("brand")}
                  height={8}
                  width={8}
                />
              </div>

              {collapse?.includes("brand") ? (
                <div className="flex flex-col mt-4 space-y-4  max-h-[300px] overflow-auto scroll-hide">
                  {filters?.CACHE_BRANDS?.map((brand) => {
                    return (
                      <label
                        className="flex items-center gap-2"
                        key={brand?.id}
                      >
                        <input
                          onChange={() => insertIntoBrand(brand?.id)}
                          type="radio"
                          className="w-5 h-5 accent-primary"
                          name="brand"
                          value={brand?.id}
                          checked={selectedBrand === brand?.id}
                        />
                        {brand?.name}
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
          {filters?.CACHE_SEASONS?.length ? (
            <div className="flex flex-col  p-6 border">
              <div className="flex justify-between">
                <label className="text-[17px]">{t("season")}</label>
                <Image
                  className={`cursor-pointer w-3 h-3 object-contain ${
                    !collapse?.includes("season")
                      ? "rotate-90"
                      : "rotate-[270deg]"
                  } `}
                  src={upArrow}
                  alt="arrow up"
                  onClick={() => handleCollapse("season")}
                  height={8}
                  width={8}
                />
              </div>

              {collapse?.includes("season") ? (
                <div className="flex flex-col mt-4 space-y-4 max-h-[300px] overflow-auto scroll-hide">
                  {filters?.CACHE_SEASONS?.map((season) => {
                    return (
                      <label
                        className="flex items-center gap-2"
                        key={season?.id}
                      >
                        <input
                          onChange={() => insertIntoSeason(season?.id)}
                          type="radio"
                          className="w-5 h-6 accent-primary"
                          name="season"
                          value={season?.id}
                          checked={selectedSeason === season?.id}
                        />
                        {
                          season?.content?.find(
                            (c) => c?.language_id === language?.id
                          )?.name
                        }
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}

          {filters?.CACHE_SIZES?.length ? (
            <div className="flex flex-col  p-6 border">
              <div className="flex justify-between">
                <label className="text-[17px]">{t("SIZE")}</label>
                <Image
                  className={`cursor-pointer w-3 h-3 object-contain ${
                    !collapse?.includes("size")
                      ? "rotate-90"
                      : "rotate-[270deg]"
                  } `}
                  src={upArrow}
                  alt="arrow up"
                  onClick={() => handleCollapse("size")}
                  height={8}
                  width={8}
                />
              </div>

              {collapse?.includes("size") ? (
                <div className="flex mt-6 w-full gap-2 flex-wrap">
                  {filters?.CACHE_SIZES?.map((size) => {
                    return (
                      <button
                        key={size?.name}
                        onClick={() => insertIntoSizes(size?.id)}
                        className={`border h-10 px-2 w-fit ${
                          selectedSizes?.hasOwnProperty(size?.id)
                            ? "bg-opink text-owhite"
                            : ""
                        }`}
                      >
                        {
                          size?.content?.find(
                            (size) => size?.region_id === currency?.region_id
                          )?.name
                        }
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
          {filters?.CACHE_COLORS?.length ? (
            <div className="flex flex-col  p-6 border">
              <div className="flex justify-between">
                <label className="text-[17px]">{t("COLOR")}</label>
                <Image
                  className={`cursor-pointer w-3 h-3 object-contain ${
                    !collapse?.includes("color")
                      ? "rotate-90"
                      : "rotate-[270deg]"
                  } `}
                  src={upArrow}
                  alt="arrow up"
                  onClick={() => handleCollapse("color")}
                  height={8}
                  width={8}
                />
              </div>
              {collapse?.includes("color") ? (
                <div className="flex flex-wrap gap-2 mt-6 w-full">
                  {filters?.CACHE_COLORS?.map((color) => {
                    if (!color?.parent_id) {
                      return (
                        <label
                          key={color?.id}
                          onClick={(e) => insertIntoColors(color?.id)}
                          name="color"
                          className={`gap-1 cursor-pointer flex items-center justify-center overflow-hidden rounded-md border-4 border-transparent ${
                            selectedColors?.[color?.id] ? " !border-black" : ""
                          } `}
                        >
                          {color?.hex === "multi" ? (
                            <div className="h-8 w-8 border relative flex flex-wrap gap-1 p-1 justify-center overflow-hidden">
                              <span className="rounded-full block w-[40%] h-[40%] bg-green-400" />
                              <span className="rounded-full block w-[40%] h-[40%] bg-red-400" />
                              <span className="rounded-full block w-[40%] h-[40%] bg-yellow-400" />
                            </div>
                          ) : (
                            <span
                              className="h-8 w-8 block border"
                              style={{ background: color?.hex }}
                            ></span>
                          )}
                        </label>
                      );
                    }
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
          {filters?.CACHE_PRICES && filters?.CACHE_SIZES?.length ? (
            <div className="flex flex-col  p-6 border">
              <div className="flex justify-between">
                <label className="text-[15px]">{t("PRICE")}</label>
                <Image
                  className={`cursor-pointer w-3 h-3 object-contain ${
                    !collapse?.includes("price")
                      ? "rotate-90"
                      : "rotate-[270deg]"
                  } `}
                  src={upArrow}
                  alt="arrow up"
                  onClick={() => handleCollapse("price")}
                  height={8}
                  width={8}
                />
              </div>
              {collapse?.includes("price") ? (
                <>
                  <Range
                    setValues={setPriceValues}
                    values={[
                      +filters?.CACHE_PRICES?.["min"],
                      +filters?.CACHE_PRICES?.["max"],
                    ]}
                  />
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Filters;
