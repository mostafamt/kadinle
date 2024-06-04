import React from "react";

import Layout from "../../components/layout/Layout";
import SupportPage from "../../components/static/SupportPage";

export const metadata = { title: "KADINLE | Support" };

const page = async ({ params: { locale } }) => {
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <SupportPage locale={locale} />
    </Layout>
  );
};

export default page;
