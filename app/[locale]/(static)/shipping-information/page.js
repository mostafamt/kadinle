import { getTranslations } from "next-intl/server";
import React from "react";
import Layout from "../../components/layout/Layout";
import ShippingInformationPage from "../../components/static/ShippingInformationPage";
import { getAllShippingInformation } from "@/app/api/supabase/products";

export const metadata = { title: "KADINLE | Shipping information" };

const page = async ({ params: { locale } }) => {
  const warehousesRes = await getAllShippingInformation();

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ShippingInformationPage warehouses={warehousesRes?.data} />
    </Layout>
  );
};

export default page;
