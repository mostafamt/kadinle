import React from "react";

import Layout from "../../components/layout/Layout";
import JoinUs from "../../components/static/JoinUs";

export const metadata = {
  title: "KADINLE | Join us",
};

const page = ({ params: { locale } }) => {
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <JoinUs locale={locale} />
    </Layout>
  );
};

export default page;
