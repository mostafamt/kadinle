// eslint-disable-next-line import/no-unresolved
import { LANGUAGES } from "@/app/api/static/constants";
// eslint-disable-next-line import/no-unresolved
import { getCategories, getCategoriesTopLevel } from "@/app/api/supabase/home";
// eslint-disable-next-line import/no-unresolved
import { getNews } from "@/app/api/supabase/shared";
import React from "react";

import CategoryBar from "../categories/CategoryBar";
import { Menu } from "./Menu";
import { MenuFull } from "./MenuFull";
import NewsBar from "./NewsBar";
import { SubMenu } from "./SubMenu";
import { UpperBar } from "./UpperBar";
import { UpperMenu } from "./UpperMenu";
import { SidebarMenu } from "./SidebarMenu";

export const Header = async ({
  locale,
  params,
  showCategoryBar,
  categoryId,
  searchOnly,
  hideUpperMenu,
}) => {
  const news = await getNews(LANGUAGES?.[locale]);

  const categoriesData = await getCategories();
  const categoriesTopLevel = await getCategoriesTopLevel()

  const categories = categoriesData;
  return (
    <header>
      <NewsBar news={news?.data} setOpenNews={false} />
      {hideUpperMenu ? null : <UpperBar locale={locale} />}
      <div className="full-screen">
      <MenuFull locale={locale} searchOnly={searchOnly} />
      </div>
      <div className="mob-screen">
      <Menu locale={locale} searchOnly={searchOnly} />
      </div>
      <UpperMenu categories={categories} language={LANGUAGES?.[locale]}/>
      <SubMenu language={LANGUAGES?.[locale]} categories={categories} />
      <SidebarMenu categories={categoriesTopLevel} />

    </header>
  );
};
