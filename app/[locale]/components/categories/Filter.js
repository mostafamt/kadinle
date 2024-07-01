"use client";
import React, { useEffect, useState } from "react";

import { FilterRow } from "./FilterRow";
import Range from "./Range";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

const apply = "https://kadinle.com/media/images/apply.svg";
const choose = "https://kadinle.com/media/images/choose.svg";

const Filter = ({
  setOpenFilter,
  filters,
  selectedColors,
  selectedSizes,
  setSelectedBrand,
  setSelectedSeason,
  setSelectedCategories,
  setSelectedColors,
  setSelectedSizes,
  setPriceValues,
  setRefreshFilter,
  currency,
}) => {
  const t = useTranslations();
  const { language } = useGlobalOptions();
  const [refresh, setRefresh] = useState(false);
  const [openColors, setOpenColors] = useState(false);

  const insertIntoFilter = (id) => {
    setSelectedCategories(id);
  };

  const insertIntoBrands = (brand) => {
    setSelectedBrand(brand);
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
  };

  const insertIntoSeasons = (season) => {
    setSelectedSeason(season);
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
  };

  const insertIntoSizes = (size) => {
    setSelectedSizes(size);
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
  };

  const insertIntoColors = (color) => {
    setOpenColors(false);
    setSelectedColors(color);
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
  };

  const handleClear = () => {
    setSelectedCategories("");
    setSelectedColors("");
    setSelectedSizes("");
    setOpenFilter(false);
    setPriceValues([]);
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
  };

  const applyFilter = () => {
    setRefresh((p) => !p);
    setRefreshFilter((p) => !p);
    setOpenFilter(false);
  };

  return (
    <div
      onClick={(e) => setOpenFilter(false)}
      className="fixed w-full h-full top-0 ltr:left-0 rtl:right-0 bg-[#0005] z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[77%] h-full max-w-[230px] capitalize bg-owhite fixed top-0 ltr:right-0 rtl:left-0 tall flex flex-col px-4"
      >
        <div className="w-full flex justify-between mt-4">
          <p className="text-[#25252D] font-medium text-sm capitalize">
            {t("refineResults")}
          </p>
          <button onClick={handleClear} className="text-sm text-opink">
            {t("clear")}
          </button>
        </div>

        <div className="flex flex-col  mt-4">
          {/* category */}
          <FilterRow
            onChange={insertIntoFilter}
            title={t("category")}
            list={filters?.CACHE_SUBCATEGORIES}
            keySearch={"language_id"}
            keyValue={language?.id}
            name="title"
          />

          {/* color */}
          <div className="py-1 border-t  justify-between flex gap-2 text-[12px]">
            <div className="py-2">
              <label htmlFor="color" className="capitalize bg-[#EFEFEF] h-fit">
                {t("color")}
              </label>
            </div>
            <div className="flex-1 flex flex-wrap gap-1">
              {filters?.CACHE_COLORS?.map((color) => {
                if (!color?.parent_id) {
                  return (
                    <label
                      key={color?.id}
                      onClick={(e) => insertIntoColors(color?.id)}
                      name="color"
                      className={`gap-1 cursor-pointer flex items-center justify-center overflow-hidden border-4 border-transparent ${
                        selectedColors?.[color?.id] ? " !border-black" : ""
                      } `}
                    >
                      {color?.hex === "multi" ? (
                        <div className="h-5 w-5 border relative flex flex-wrap gap-1 p-1 justify-center overflow-hidden">
                          <span className="rounded-full block w-[40%] h-[40%] bg-green-400" />
                          <span className="rounded-full block w-[40%] h-[40%] bg-red-400" />
                          <span className="rounded-full block w-[40%] h-[40%] bg-yellow-400" />
                        </div>
                      ) : (
                        <span
                          className="h-5 w-5 block rounded-full border !border-gray-500"
                          style={{ background: color?.hex }}
                        ></span>
                      )}
                    </label>
                  );
                }
              })}
            </div>
            {/* <div className="flex gap-2 relative"> */}
            {/* <button
                style={{
                  background:
                    selectedColors?.hex === "multi"
                      ? "linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
                      : selectedColors?.hex,
                }}
                className="h-6 w-10 border-2"
              ></button>
              {openColors ? (
                <ul className="absolute flex flex-col gap-1 top-5 ltr:right-5 rtl:left-5 bg-white z-50 rounded-md p-2 shadow ">
                  {filters?.CACHE_COLORS?.map((color) => {
                    if (!color?.parent_id) {
                      return (
                        <li
                          key={color?.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            insertIntoColors(color);
                          }}
                          style={{
                            background:
                              color?.hex === "multi"
                                ? "linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
                                : color?.hex,
                          }}
                          className={`cursor-pointer h-6 w-24 border-2`}
                        ></li>
                      );
                    }
                  })}
                </ul>
              ) : null} */}

            {/* <Image
                className={`w-[14px] ${openColors ? "rotate-90" : ""}`}
                src={choose}
                height={14}
                width={14}
              /> */}
            {/* </div> */}
          </div>

          {/* size */}
          <div className="py-1 border-t  justify-between flex gap-2 text-[12px]">
            <div className="py-2">
              <label htmlFor="color" className="capitalize bg-[#EFEFEF] h-fit">
                {t("size")}
              </label>
            </div>
            <div className="flex-1 flex flex-wrap gap-1">
              {filters?.CACHE_SIZES?.map((size) => {
                return (
                  <button
                    key={size?.name}
                    onClick={() => insertIntoSizes(size?.id)}
                    className={`border h-7 px-2 w-fit ${
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
          </div>
          {/* <FilterRow
            onChange={insertIntoSizes}
            title={t("size")}
            list={filters?.CACHE_SIZES}
            keySearch={"region_id"}
            keyValue={currency?.region_id}
          /> */}

          {/* season */}
          <FilterRow
            onChange={insertIntoSeasons}
            title={t("season")}
            list={filters?.CACHE_SEASONS}
            keySearch={"language_id"}
            keyValue={language?.id}
          />

          {/* brand */}
          <FilterRow
            onChange={insertIntoBrands}
            title={t("brand")}
            list={filters?.CACHE_BRANDS}
            keySearch={"id"}
          />

          {/* price */}
          <div className="flex flex-col">
            <div className="py-4 border-t  justify-between flex text-[12px] ">
              <p className="capitalize">{t("priceRange")}</p>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-[80%]">
                <Range
                  setPriceValues={setPriceValues}
                  values={[
                    +filters?.CACHE_PRICES?.["min"],
                    +filters?.CACHE_PRICES?.["max"],
                  ]}
                />
              </div>
            </div>
          </div>

          <button
            onClick={applyFilter}
            className="flex py-1 self-center mt-[20px] gap-4 justify-center items-center w-[135px] text-[12px] bg-opink text-owhite rounded-full"
          >
            <span className="ltr:ml-3 cursor-pointer rtl:mr-3 capitalize">
              {t("applyFilters")}
            </span>
            <Image
              src={apply}
              alt="apply filter"
              height={30}
              width={30}
              className="rtl:rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
