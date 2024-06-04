import { getNotification } from "@/app/api/supabase/user";
import React from "react";
import {unstable_setRequestLocale} from 'next-intl/server';
import Layout from "../components/layout/Layout";
import Notifications from "../components/my-profile/Notifications";

export const metadata = {
  title: "KADINLE | Notifications",
};

const page = async ({ params: { locale } }) => {
  const notifications = await getNotification();
  unstable_setRequestLocale(locale);

  return (
    <Layout locale={locale} hideHeader>
      <Notifications notifications={notifications?.data} />
    </Layout>
  );
};

export default page;
