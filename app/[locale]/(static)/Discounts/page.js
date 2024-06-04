import { getCoupons } from "@/app/api/supabase/products";

import Layout from "../../components/layout/Layout";
import  Discounts  from "../../components/static/Discounts";

export const metadata = {
  title: "KADINLE | Discounts",
};

const Page = async ({ params: { locale } }) => {
  const couponsRes = await getCoupons();
  const coupons = couponsRes?.data?.filter((coupon) => coupon?.public);

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <Discounts coupons={coupons} />
    </Layout>
  );
};

export default Page;
