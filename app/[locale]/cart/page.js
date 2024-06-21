import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import CartPage from "../components/checkout/CartPage";
import Layout from "../components/layout/Layout";
import CartPageDT from "../components/checkout/CartPageDT";

export const metadata = {
  title: "KADINLE | Cart",
};

const page = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Layout locale={locale} showFooter>
        <div className="full-screen">
          <CartPageDT locale={locale} />
        </div>
        <div className="mob-screen">
          <CartPage locale={locale} />
        </div>
      </Layout>
    </>
  );
};
export default page;
