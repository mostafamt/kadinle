import Page from "./page"; // import your Demo's page
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");
  return {
    title: `${t("login")} | KADINLE`,
    description: t("login_description"),
  };
}

export default Page;
