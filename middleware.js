import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ar", "en", "tr"],
  defaultLocale: "en",
  fallback: "en",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  fallback: "en",
};
