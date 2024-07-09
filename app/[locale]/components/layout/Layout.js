import React from "react";

import BottomNav from "../footer/BottomNav";
import Footer from "../footer/Footer";
import { Header } from "../header/Header";
import { MobileNav } from "../header/MobileNav";
import { unstable_setRequestLocale } from "next-intl/server";

const Layout = ({
  children,
  locale,
  hideBottomNav,
  hideHeader,
  hideBack,
  handleBack,
  title,
  customTitle,
  showIcons,
  showCategoryBar,
  bodyClassName,
  containerClassName,
  categoryId,
  showFooter,
  searchOnly,
  showMobileMenu,
  hideUpperMenu,
  hideSubMenu,
  hideCategoryIcon,
  hideFooter,
}) => {
  unstable_setRequestLocale(locale);
  return (
    <div className={containerClassName}>
      {showMobileMenu ? (
        <MobileNav
          handleBack={handleBack}
          title={title}
          customTitle={customTitle}
          showIcons={showIcons}
          containerClassName="!mb-1"
        />
      ) : null}
      {hideHeader || showMobileMenu ? null : ( //   hideBack={hideBack} //
        <Header
          hideSubMenu={hideSubMenu}
          locale={locale}
          showCategoryBar={showCategoryBar}
          categoryId={categoryId}
          searchOnly={searchOnly}
          hideUpperMenu={hideUpperMenu}
          hideCategoryIcon={hideCategoryIcon}
        />
      )}
      <div
        className={`md:max-w-[575px] md:mx-auto w-full full-page ${bodyClassName}`}
      >
        {children}
      </div>
      {hideFooter? null : <Footer locale={locale} />}

      {/* {showFooter ? <Footer locale={locale} /> : null}
      {hideBottomNav ? null : <BottomNav />} */}
      <div className="mob-screen">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
