import React from "react";
import Layout from "../../components/layout/Layout";
import OurFranchise from "../../components/static/OurFranchise";

export const metadata = {
  title: "KADINLE | Our Franchise",
};

const page = ({ params: { locale } }) => {
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <OurFranchise locale={locale} />
    </Layout>
  );
};

export default page;
