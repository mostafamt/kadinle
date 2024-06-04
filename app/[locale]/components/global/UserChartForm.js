"use client";

import { getChartContent } from "@/app/api/supabase/products";
import { addUserChart } from "@/app/api/supabase/user";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CACHE_CHART_CONTENT = {};

export const UserChartForm = () => {
  const t = useTranslations();
  const { language, user } = useGlobalOptions();
  const [selectedChartId, setSelectedChartId] = useState(null);
  const [selectedChartContent, setSelectedChartContent] = useState({});
  const [sizeInfo, setSizeInfo] = useState({});

  useEffect(() => {
    if (!language?.id) return;

    const getCharts = async () => {
      const res = await getChartContent(language?.id);
      for (const chart of res?.data) {
        CACHE_CHART_CONTENT[chart?.id] = chart;
      }
    };
    getCharts();
  }, [language]);

  useEffect(() => {
    if (!selectedChartId || !CACHE_CHART_CONTENT) return;
    setSelectedChartContent(CACHE_CHART_CONTENT?.[selectedChartId]);
    console.log(CACHE_CHART_CONTENT?.[selectedChartId]);
  }, [selectedChartId]);

  const onChangeField = (e) => {
    setSizeInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error(t("you_must_logged_sizes"));
      return;
    }
    if (!selectedChartId) return;

    if (Object.values(sizeInfo)?.length < 1) {
      toast.error(t("fields_error"));
      return;
    }

    const response = await addUserChart({
      ...sizeInfo,
      chart_id: selectedChartId,
      user_id: user?.id,
    });
    if (response?.error) {
      toast.error(t("user_chart_failed"));
    } else {
      toast.success("successfully saved your size information");
      setSizeInfo({});
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mb-4 mt-8 pb-4 pt-8 border-y bg-gray-200 p-2 rounded-md shadow relative"
      >
        <span className="bg-primary text-white px-4 py-1 ltr:rounded-r-3xl rtl:rounded-l-3xl absolute -top-4 ltr:left-0 rtl:right-0">
          {t("kadinle_tailor_sizes")}
        </span>
        <div className="flex gap-2 items-center justify-center mb-4 w-[130px] bg-white shadow rounded-md overflow-hidden text-base mx-auto">
          <select
            onChange={(e) => setSelectedChartId(e.target.value)}
            value={selectedChartId}
          >
            <option>{t("choose")}:</option>
            {Object.values(CACHE_CHART_CONTENT)
              ?.filter((c) => c?.language_id === language?.id)
              ?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid grid-cols-2">
          {typeof selectedChartContent === "object" &&
            Object.keys(selectedChartContent)?.map((item) => {
              if (
                selectedChartContent?.[item] &&
                item?.indexOf("column") !== -1
              ) {
                return (
                  <div className="border-collapse flex flex-col" key={item}>
                    <label className="border flex-1 p-2 text-center bg-gray-100 font-medium">
                      {selectedChartContent?.[item]}
                    </label>
                    <input
                      className="flex-1 p-2 border "
                      name={item}
                      value={sizeInfo?.[item]}
                      onChange={onChangeField}
                      placeholder={t("type_your_size") + "..."}
                    />
                  </div>
                );
              }
            })}
        </div>
        <button className="bg-primary text-white px-2 py-1 mt-4 rounded-2xl block w-[100px] mx-auto">
          {t("save")}
        </button>
      </form>
    </>
  );
};
