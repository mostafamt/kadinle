import React from "react";

import Layout from "../../components/layout/Layout";
import { Distributor } from "./../../components/static/Distributor";

export const metadata = {
  title: "KADINLE | Distributor",
};

const page = ({ params: { locale } }) => {
  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <Distributor locale={locale} />
    </Layout>
  );
};

export default page;
