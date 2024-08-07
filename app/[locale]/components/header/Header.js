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
import { UpperBarDT } from "./UpperBarDT";

export const Header = async ({
  locale,
  params,
  showCategoryBar,
  categoryId,
  searchOnly,
  hideUpperMenu,
  hideSubMenu,
  hideCategoryIcon,
}) => {
  const news = await getNews(LANGUAGES?.[locale]);

  const categoriesData = await getCategories();
  const categoriesTopLevel = await getCategoriesTopLevel();

  const categories = categoriesData;
  return (
    <header>
      <NewsBar news={news?.data} setOpenNews={false} locale={locale} />
      <div className="full-screen">
        {hideUpperMenu ? null : <UpperBarDT locale={locale} />}
        <MenuFull locale={locale} searchOnly={searchOnly} />
      </div>
      <div className="mob-screen">
        {hideUpperMenu ? null : <UpperBar locale={locale} />}
        <Menu
          locale={locale}
          searchOnly={searchOnly}
          hideCategoryIcon={hideCategoryIcon}
        />
      </div>
      {/* <UpperMenu categories={categories} language={LANGUAGES?.[locale]}/> */}
      {hideSubMenu ? null : (
        <SubMenu language={LANGUAGES?.[locale]} categories={categories} />
      )}

      <SidebarMenu categories={categoriesTopLevel} />
    </header>
  );
};
