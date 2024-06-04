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
          locale={locale}
          showCategoryBar={showCategoryBar}
          categoryId={categoryId}
          searchOnly={searchOnly}
          hideUpperMenu={hideUpperMenu}
        />
      )}
      <div className={`md:max-w-[575px] md:mx-auto w-full full-page ${bodyClassName}`}>
        {children}
      </div>
      <Footer locale={locale} />
      {/* {showFooter ? <Footer locale={locale} /> : null}
      {hideBottomNav ? null : <BottomNav />} */}
      <BottomNav />
    </div>
  );
};

export default Layout;
