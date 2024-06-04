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
import React from "react";

import SingleCategory from "../../components/categories/SingleCategory";
import Layout from "../../components/layout/Layout";
import { LANGUAGES } from "@/app/api/static/constants";

const searchCategory = {
  "new-arrivals": {
    fn: () => getLatestProductsDetails(250),
    searchKey: "",
  },
  "best-seller": {
    fn: () => getBestSellingDetails(250),
    searchKey: "",
  },
  "flash-sale": {
    fn: () => getSaleDetails,
    searchKey: "",
  },
  "new-arrivals": {
    fn: () => getLatestProductsDetails(250),
    searchKey: "",
  },
  "best-seller": {
    fn: () => getBestSellingDetails(250),
    searchKey: "",
  },
  "price-less-15": {
    fn: () => getProductsLessThan(250),
    searchKey: "",
  },
  "price-less-25": {
    fn: () => getProductsLessThan(250),
    searchKey: "",
  },
  "price-less-35": {
    fn: () => getProductsLessThan(250),
    searchKey: "",
  },
};

export async function generateMetadata({
  params: { id, locale },
  searchParams,
}) {
  const sectionName = searchCategory?.[id];
  const res = !sectionName && (await getCategoryInfo(id));
  const content =
    !sectionName &&
    res?.data?.find((c) => c?.language_id === LANGUAGES?.[locale]);

  if (sectionName)
    return {
      title: `KADINLE | ${id}`,
    };

  return {
    title: `KADINLE | ${content?.title}`,
    description: content?.description,
    openGraph: {
      title: `KADINLE | ${content?.title}`,
      description: content?.description,
      url: `https://kadinle.com/categories/${id}`,
      type: "website",
      images: [content?.mobile_image],
    },

    twitter: {
      title: `KADINLE | ${content?.title}`,
      description: content?.description,
      images: [content?.mobile_image],
      domain: "kadinle.com",
      card: "category",
      site: "@kadinle",
      creator: "@kadinle",
    },
  };
}

const page = async ({ params }) => {
  const { id, locale } = params;
  const selectedRequest = searchCategory?.[id];
  const categoryRes = selectedRequest
    ? await selectedRequest?.fn()
    : await getCategoryDetails(id);
  const category = categoryRes?.data;
  const remainingTimeFetch = await getOfferedProduct();

  const remainingTimeData = remainingTimeFetch?.date;
  const remainingTime = {
    days: remainingTimeData?.day,
    hours: remainingTimeData?.hours,
    minutes: remainingTimeData?.minutes,
    seconds: remainingTimeData?.seconds,
  };

  return (
    <Layout locale={locale} showCategoryBar categoryId={id} searchOnly>
      <SingleCategory
        searchKey={selectedRequest?.searchKey}
        category={category}
        remainingTime={remainingTime}
        hideUpperMenu
      />
    </Layout>
  );
};
export default page;
