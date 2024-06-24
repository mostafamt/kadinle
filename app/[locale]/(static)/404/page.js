import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import Layout from "../../components/layout/Layout";
const background = "https://kadinle.com/media/images/background.png";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
const t = await getTranslations("");

 const NotFound = () => {
   return (
     <main className="min-h-400px relative">
       <Image
         src={background}
         height={180}
         width={575}
         className="h-full min-h-[150px] w-full object-cover"
         priority
       />
       <div className="absolute top-1/2 flex flex-col items-center left-1/2 -translate-x-1/2 -translate-y-1/2">
         <h1 className="text-white text-3xl mb-3 capitalize font-semibold">
           {t("page_not_found")}
         </h1>
         <Link
           href="/"
           className="bg-opink text-white p-2 rounded-2xl text-xs capitalize"
         >
           {t("CONTINUE_SHOPPING")}
         </Link>
       </div>
     </main>
   );
 };
  return (
    <>
      <div className="full-screen">
        <Layout locale={locale} showFooter>
          <NotFound />
        </Layout>
      </div>
      <div className="mob-screen">
        <NotFound />
      </div>
    </>
  );
 
};

export default page;
