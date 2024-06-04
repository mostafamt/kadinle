"use client";

import { getUserChart } from "@/app/api/supabase/user";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export const SizeInfoBtn = ({
  setOpenSizeInfo,
  productChart,
  sizes,
  selectedRegion,
}) => {
  const t = useTranslations();
  const [yourSize, setYourSize] = useState(null);

  const fetchChart = async () => {
    const userSize = await getUserChart();
    let hashUserChart = {};

    for (const chart of userSize?.data) {
      hashUserChart[chart?.chart_id] = chart;
    }

    for (let index = 0; index < productChart.length; index++) {
      let chartId = productChart?.[index]?.chart_id;
      let userChart = hashUserChart?.[chartId];

      if (!userChart) continue;

      for (const chartRow of productChart?.[index]?.chart_data) {
        let userTotal = 0;
        let total = 0;
        let size_id = chartRow?.size?.at(0)?.size_id;

        for (const [key, val] of Object.entries(chartRow?.data)) {
          if (key?.indexOf("column") !== -1) {
            total += val;
            if (val) {
              userTotal += userChart?.[key];
            }
            console.log(key, val, userChart?.[key]);
          }
        }

        if (userTotal - 5 < total && total < userTotal + 5) {
          setYourSize(sizes?.[size_id]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    fetchChart();
  }, []);

  return (
    <button
      onClick={() => setOpenSizeInfo(true)}
      className="flex gap-1 items-center mb-4 text-gray-600"
    >
      <span className="text-primary">{t("kadinle_tailor")}</span>..{" "}
      {t("your_size")}
      <span className="text-primary font-medium uppercase">
        {yourSize?.sizesContent?.find(
          (c) => c?.region_id === selectedRegion?.id
        )?.name || "---"}
      </span>
    </button>
  );
};
