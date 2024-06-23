import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import Layout from "../components/layout/Layout";
import { MyAccount } from "../components/my-profile/MyAccount";
import { MyAccountDT } from "../components/my-profile/MyAccountDT";

export const metadata = {
  title: "KADINLE | My Profile",
};

const page = async ({ params: { locale } }) => {
  const user = cookies().get("KADINLE_USER")?.value;
  unstable_setRequestLocale(locale);
  if (!user) redirect("/login");

  return (
    <>
      <div className="full-screen">
        <Layout locale={locale}>
          <MyAccountDT locale={locale} />
        </Layout>
      </div>
      <div className="mob-screen">
        <MyAccount locale={locale} />
      </div>
    </>
  );
};

export default page;
