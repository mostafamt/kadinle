import React from "react";

import Layout from "../../components/layout/Layout";
import ExclusiveAgency from "../../components/static/ExclusiveAgency";

export const metadata = {
  title: "KADINLE | Exclusive Agency",
};

const page = ({ params: { locale } }) => {
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ExclusiveAgency locale={locale} />
    </Layout>
  );
};

export default page;
