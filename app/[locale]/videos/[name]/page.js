import {
  getCustomerVideosList,
  getOurVideosList,
  getRealsList,
} from "@/app/api/supabase/videos";
import React from "react";
import {unstable_setRequestLocale} from 'next-intl/server';
import Layout from "../../components/layout/Layout";
import Videos from "../../components/videos/Videos";

export const metadata = {
  title: "KADINLE | Videos",
};

const page = async ({ params, searchParams }) => {

  const { locale, name } = params;
  unstable_setRequestLocale(locale);
  const { v } = searchParams;
  const videosRes =
    name === "our-videos"
      ? await getOurVideosList(v)
      : "customer-videos"
      ? await getCustomerVideosList(v)
      : getRealsList(v);
  return (
    <Layout locale={locale} searchOnly>
      <Videos layout={name} videos={videosRes?.data} />
    </Layout>
  );
};

export default page;
