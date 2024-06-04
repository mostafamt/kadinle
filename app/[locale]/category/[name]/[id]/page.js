import {
  getBrandDetails,
  getCollectionDetails,
  getOfferDetails,
} from "@/app/api/supabase/home";
import React from "react";
import {unstable_setRequestLocale} from 'next-intl/server';
import SingleCategory from "../../../components/categories/SingleCategory";
import Layout from "../../../components/layout/Layout";

export async function generateMetadata({ params: { locale, name } }) {
  unstable_setRequestLocale(locale);
  return {
    title: `KADINLE | ${name}`,
  };
}

const searchCategory = {
  brands: {
    fn: (id) => getBrandDetails(id),
    searchKey: "brand_content",
  },
  offers: {
    fn: (id) => getOfferDetails(id),
    searchKey: "offer_content",
  },
  collections: {
    fn: (id) => getCollectionDetails(id),
    searchKey: "collection_content",
  },
};

const page = async ({ params }) => {
  const { id, name, locale } = params;
  const selectedRequest = searchCategory?.[name];

  const categoryRes = await selectedRequest?.fn(id);
  const category = categoryRes?.data;

  return (
    <Layout locale={locale} showCategoryBar categoryId={id} searchOnly>
      <SingleCategory
        searchKey={selectedRequest?.searchKey}
        category={category}
      />
    </Layout>
  );
};
export default page;
