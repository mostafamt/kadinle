import React from "react";
import {unstable_setRequestLocale} from 'next-intl/server';
import CartPage from "../components/checkout/CartPage";

export const metadata = {
  title: "KADINLE | Cart",
};

const page = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  return <CartPage locale={locale} />;
};
export default page;
