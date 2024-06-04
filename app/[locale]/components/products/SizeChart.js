"use client";
import { useTranslations } from "next-intl";
import React, { useContext, useMemo } from "react";
import { Fragment } from "react";
import { SizeInfoBtn } from "./SizeInfoBtn";

const MEASUREMENTS_LIST_1 = [
  "shoulderMeasurements",
  "chestMeasurements",
  "waistMeasurements",
  "armLengthMeasurements",
  "lengthMeasurements",
];
const MEASUREMENTS_LIST_2 = [
  "shoulderMeasurements",
  "chestMeasurements",
  "waistMeasurements",
  "armLengthMeasurements",
  "lengthMeasurements",
  "hipMeasurements",
  "thighMeasurements",
  "legMeasurements",
];

const MEASUREMENTS_LIST_3 = [
  "waistMeasurements",
  "hipMeasurements",
  "thighMeasurements",
  "legMeasurements",
];
const MEASUREMENTS_LIST_4 = [
  "waistMeasurements",
  "hipMeasurements",
  "thighMeasurements",
  "legMeasurements",
];
const MEASUREMENTS_LIST_5 = ["chestMeasurements", "underChestMeasurements"];

const MEASUREMENTS = {
  1: MEASUREMENTS_LIST_1,
  2: MEASUREMENTS_LIST_2,
  3: MEASUREMENTS_LIST_3,
  4: MEASUREMENTS_LIST_4,
  5: MEASUREMENTS_LIST_5,
};

const MeasurementsDescription = ({ text, t, index }) => (
  <p className="text-[11px] text-[#707070] mb-[6px] text-indent-three leading-[19px]">
    {index}- {t(text)}
  </p>
);

const SizeChart = ({
  chartNumbers,
  productChart,
  languageId,
  regions,
  selectedRegion,
  setSelectedRegion,
  setOpenSizeInfo,
  CACHE_SIZES,
}) => {
  const t = useTranslations();
  let measurementsList = useMemo(() => {
    let hashNumbers = {};
    if (chartNumbers?.length) {
      for (const number of chartNumbers) {
        let roles = MEASUREMENTS?.[number];
        if (roles?.length)
          hashNumbers = {
            ...hashNumbers,
            ...roles,
          };
      }
      return Object.values(hashNumbers);
    }
  }, [chartNumbers]);

  return (
    <Fragment>
      <div className="flex mt-2 flex-col mb-6">
        <SizeInfoBtn
          selectedRegion={selectedRegion}
          setOpenSizeInfo={setOpenSizeInfo}
          productChart={productChart}
          sizes={CACHE_SIZES}
        />

        {!!productChart?.length && (
          <div className="flex gap-10 my-3">
            <p className="text-[#25252D] font-[200] text-[17px]">{t("size")}</p>
            <div className="flex gap-[18px]  text-[16px] font-[300]">
              {regions?.map((region) => (
                <button
                  onClick={(e) => setSelectedRegion(region)}
                  key={region?.name}
                  className={`flex flex-col items-center cursor-pointer px-2 pb-1 ${
                    selectedRegion?.id === region?.id
                      ? "text-opink border-b-2 border-opink "
                      : ""
                  } `}
                >
                  {region?.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {!!productChart?.length ? (
          <>
            {productChart?.map((chart) => {
              // chart headers
              const chartHeaders = chart?.chart_content;
              const selectedChartHeader = chartHeaders?.find(
                (header) => header?.language_id === languageId
              );

              const chartData = chart?.chart_data;

              const sortedChartData = chartData?.sort(
                (a, b) => a.size_sku - b.size_sku
              );

              // sizes
              const allSizes = sortedChartData?.map((data) => data?.size);
              const regionSizes = allSizes?.map((sizeForAllRegions) => {
                return sizeForAllRegions.find(
                  (size) => size?.region_id === selectedRegion?.id
                );
              });

              const chartDataColumns = sortedChartData?.map(
                (chartData) => chartData?.data
              );

              const showHeaderHandler = (header) => {
                return chartDataColumns?.reduce((acc, cur) => {
                  return acc || !!cur[header];
                }, false);
              };
              return (
                <div
                  key={chart?.chart_id}
                  className="overflow-auto scroll-hide mx-4 capitalize"
                >
                  <table className="border w-fit mt-4 text-xs">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 bg-gray-200 py-1 min-w-[50px] !px-4 text-center">
                          {t("size")}
                        </th>
                        {Array(8)
                          .fill(0)
                          ?.map((_, index) => {
                            const shouldShowHeader = showHeaderHandler(
                              `column${index + 1}`,
                              chartDataColumns
                            );
                            const chartHeader =
                              selectedChartHeader?.[`column${index + 1}`];

                            if (chartHeader && shouldShowHeader)
                              return (
                                <th className="border border-gray-300 bg-gray-200 py-1 min-w-[50px] !px-4" key={index}>
                                  {chartHeader}
                                </th>
                              );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      {regionSizes.map((size, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="min-w-[50px] !px-4 border bg-gray-200 border-gray-300 text-center">
                              {size?.name}
                            </td>
                            {Array(8)
                              .fill(0)
                              ?.map((r, index) => {
                                const shouldShowHeader = showHeaderHandler(
                                  `column${index + 1}`,
                                  chartDataColumns
                                );
                                const chartHeader =
                                  selectedChartHeader?.[`column${index + 1}`];
                                if (chartHeader && shouldShowHeader)
                                  return (
                                    <td
                                      key={index}
                                      className="border border-gray-300 py-1 min-w-[50px] !px-4 text-center"
                                    >
                                      {
                                        chartDataColumns?.[idx]?.[
                                          `column${index + 1}`
                                        ]
                                      }
                                    </td>
                                  );
                              })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
      {measurementsList?.length && (
        <>
          <div className="mb-6">
            <p className="text-[#707070] font-medium text-[13px]">
              {t("howToTakeBodyMeasurements")}
            </p>
            {measurementsList?.map((item, idx) => (
              <div className="mb-2 mt-2" key={item}>
                <MeasurementsDescription
                  key={item}
                  text={item}
                  t={t}
                  index={idx + 1}
                />
              </div>
            ))}
            <p className="text-[#707070] font-medium text-xs">
              {t("apologizeMeasurementsMessage")}
            </p>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default SizeChart;
