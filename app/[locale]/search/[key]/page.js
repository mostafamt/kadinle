import React from "react";

import SingleCategory from "../../components/categories/SingleCategory";
import Layout from "../../components/layout/Layout";
import { getSearchResults } from "@/app/api/supabase/home";
import SingleCategoryDT from "../../components/categories/SingleCategoryDT";

export const metadata = {
  title: "KADINLE | Search",
};

const page = async ({ params }) => {
  const { key, locale } = params;
  const res = await getSearchResults(key);

  return (
    <>
    <Layout locale={locale} searchOnly>
        <div className="full-screen">
          <SingleCategoryDT layout="search" category={res?.data} />
        </div>
        <div className="mob-screen">
          <SingleCategory layout="search" category={res?.data} />
        </div>
      </Layout>
    </>
  );
};
export default page;
