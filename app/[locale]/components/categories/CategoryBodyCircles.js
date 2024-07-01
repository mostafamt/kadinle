"use client";
import {
  getBestSellingDetails,
  getLatestProductsDetails,
  getOfferedProduct,
  getProductsLessThan,
  getSaleDetails,
} from "@/app/api/supabase/home";
import {
  getCategoryDetails,
  getCategoryInfo,
} from "@/app/api/supabase/products";
import React, { useEffect, useState } from "react";

import SingleCategory from "../../components/categories/SingleCategory";
import Layout from "../../components/layout/Layout";
import { LANGUAGES } from "@/app/api/static/constants";
import SingleCategoryDT from "../../components/categories/SingleCategoryDT";


const CategoryBodyCircles = ({ id }) => {
  const [category, setCategory] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const categoryRes = await getCategoryDetails(id);
      setCategory(categoryRes?.data);

      const remainingTimeFetch = await getOfferedProduct();
      const remainingTimeData = remainingTimeFetch?.date;
      setRemainingTime({
        days: remainingTimeData?.day,
        hours: remainingTimeData?.hours,
        minutes: remainingTimeData?.minutes,
        seconds: remainingTimeData?.seconds,
      });
    };

    fetchData();
  }, [id]);

  return (
    <>
     
    </>
  );
};

export default CategoryBodyCircles;
