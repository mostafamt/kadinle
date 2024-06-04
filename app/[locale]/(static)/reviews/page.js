import React from "react";
import Layout from "../../components/layout/Layout";
import { ReviewsPage } from "../../components/reviews/ReviewsPage";

const page = ({ params: { locale } }) => {
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ReviewsPage />
    </Layout>
  );
};

export default page;
