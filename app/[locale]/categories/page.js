import { LANGUAGES } from "@/app/api/static/constants";
import { getHomeCategory } from "@/app/api/supabase/home";
import {unstable_setRequestLocale} from 'next-intl/server';
import { CategoriesBody } from "../components/categories/CategoriesBody";
import  {CategoriesBodyFull}  from "../components/categories/CategoriesBodyFull";
import Layout from "../components/layout/Layout";

export const metadata = {
  title: "KADINLE | Categories",
};

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const categoriesData = await getHomeCategory();
  return (
    <Layout locale={locale} searchOnly hideUpperMenu>
      <div className="full-screen">
      <CategoriesBodyFull
        categories={categoriesData}
        languageId={LANGUAGES?.[locale]}
      />
      </div>

      <div className="mob-screen">
      <CategoriesBody
        categories={categoriesData}
        languageId={LANGUAGES?.[locale]}
      />
      </div>
    </Layout>
  );
};

export default page;
