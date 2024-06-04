import Page from "./page"; // import your Demo's page
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return {
    title: `${t("forgotPassword")} | KADINLE`,
    description: t("forgotPasswordMessage"),
  };
}

export default Page;
