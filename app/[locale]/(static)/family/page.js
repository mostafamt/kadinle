import React from "react";
import Layout from "../../components/layout/Layout";
import FamilyPage from "../../components/static/FamilyPage";

export const metadata = {
  title: "KADINLE | Kadinle family",
};

const page = ({ params: { locale } }) => {
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <FamilyPage />
    </Layout>
  );
};

export default page;
