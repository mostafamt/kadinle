import { supabase } from "@/app/api/supabase/supabase.config";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from 'next-intl/server';
import { LANGUAGES, SECTIONS_ORDER } from "../api/static/constants";
import {
  getCustomersReviews,
  getHomeCategory,
  getHomeSections,
  getHomeSectionSorted,
  getOfferedProduct,
  getOffers,
} from "../api/supabase/home";
import { PopupNameForm } from "./components/forms/PopupNameForm";
import ScrollUpComponent from "./components/global/ScrollUpComponent";
import { SectionTitle } from "./components/global/SectionTitle";
import { Banner } from "./components/home/Banner";
import { Benefits } from "./components/home/Benefits";
import { CategoryBanner } from "./components/home/CategoryBanner";
import Collections from "./components/home/Collections";
import { CustomSlider } from "./components/home/CustomSlider";
import FlashSale from "./components/home/FlashSale";
import HistoryProducts from "./components/home/HistoryProducts";
import PriceLimit from "./components/home/PriceLimit";
import { Reviews } from "./components/home/Reviews";
import { SaleTimer } from "./components/home/SaleTimer";
import { VideoSection } from "./components/home/VideoSection";
import { WhyChooseUs } from "./components/home/WhyChooseUs";
import Layout from "./components/layout/Layout";
import { OurNew } from "./components/home/OurNew";
import { Offer } from "./components/home/Offer";
import { OurPartners } from "./components/home/OurPartners";
import ReviewsMob from "./components/home/ReviewsMob";
import { NextIntlClientProvider, useTranslations } from 'next-intl';

export const metadata = {
  title: "KADINLE | Home",
};

export default async function Home({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  const homeSectionsOrderFetch = async () => {
    const res = await getHomeSectionSorted();
    if (res?.error) {
      return SECTIONS_ORDER;
    } else {
      let hash = {};
      for (const section of res?.data) {
        let hashName = section?.section_name?.toLowerCase();
        hash[hashName] = {
          ...section,
          section_order: section?.section_order + 1,
        };
      }
      return hash;
    }
  };

  const res = await supabase.auth.getUser();
  const homeSectionsOrder = await homeSectionsOrderFetch();

  const remainingTimeFetch = await getOfferedProduct();
  const remainingTimeData = remainingTimeFetch?.date;
  const remainingTime = {
    days: remainingTimeData?.day,
    hours: remainingTimeData?.hours,
    minutes: remainingTimeData?.minutes,
    seconds: remainingTimeData?.seconds,
  };

  const categories = await getHomeCategory();
  const homeSectionsFetch = await getHomeSections(20);
  const homeSections = homeSectionsFetch?.data;
  const reviewsFetch = await getCustomersReviews();
  const reviews = reviewsFetch?.data;
  const offersFetch = await getOffers();
  const offers = offersFetch?.data;

  return (
    <LocaleLayout locale={locale} messages={await getMessages(locale)} homeSectionsOrder={homeSectionsOrder} remainingTime={remainingTime} categories={categories} homeSections={homeSections} reviews={reviews} offers={offers} />
  );
}

async function getMessages(locale) {
  try {
    return (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    return {};
  }
}

function LocaleLayout({ locale, messages, homeSectionsOrder, remainingTime, categories, homeSections, reviews, offers }) {
  return (
    <Layout locale={locale} showFooter>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <PageContent homeSectionsOrder={homeSectionsOrder} remainingTime={remainingTime} categories={categories} homeSections={homeSections} reviews={reviews} offers={offers} locale={locale} />
      </NextIntlClientProvider>
    </Layout>
  );
}

function PageContent({ homeSectionsOrder, remainingTime, categories, homeSections, reviews, offers, locale }) {
  const t = useTranslations();

  return (
    <>
      <ScrollUpComponent />
      <PopupNameForm />
      <Banner />
      <WhyChooseUs t={t} />
      <Benefits t={t} />
      <SaleTimer remainingTime={remainingTime} />
      <FlashSale offer={offers?.at(0)} languageId={LANGUAGES?.[locale]} />
      <PriceLimit t={t} />
      {offers?.at(1) ? (
        <Offer offer={offers?.at(1)} languageId={LANGUAGES?.[locale]} />
      ) : null}
      <Collections
        collections={homeSections?.home_collections}
        locale={locale}
        languageId={LANGUAGES?.[locale]}
      />
      <SectionTitle title={t("All_your_needs_here")} classname="container mx-auto" />
      <div className="flex flex-col">
        {categories?.map((category) => (
          <CategoryBanner
            homeSectionsOrder={homeSectionsOrder}
            category={category}
            key={category?.id}
            languageId={LANGUAGES?.[locale]}
            t={t}
          />
        ))}
        <CustomSlider
          sectionSettings={homeSectionsOrder?.["best seller"]}
          lists={homeSections?.home_carousel}
        />
        <VideoSection
          videos={homeSections?.our_videos}
          head={t("ourVideos")}
          layout="our-videos"
          sectionSettings={homeSectionsOrder?.["our videos"]}
          locale={locale}
          order={3}
        />
        <VideoSection
          videos={homeSections?.user_videos}
          head={t("customerVideos")}
          layout="customer-videos"
          sectionSettings={homeSectionsOrder?.["customer videos"]}
          locale={locale}
          order={6}
        />
        <VideoSection
          videos={homeSections?.influencer_videos}
          head={t("influencerVideos")}
          layout={"influencer-videos"}
          sectionSettings={homeSectionsOrder?.["influencer videos"]}
          locale={locale}
          order={8}
        />
        <OurNew
          products={homeSections?.latest_products}
          sectionSettings={homeSectionsOrder?.["our new"]}
        />
      </div>
      <div className="full-screen">
        <Reviews
          reviews={reviews}
          sectionSettings={homeSectionsOrder?.["reviews"]}
          locale={locale}
        />
      </div>
      <div className="mob-screen">
        <ReviewsMob
          reviews={reviews}
          sectionSettings={homeSectionsOrder?.["reviews"]}
          locale={locale}
        />
      </div>
      <OurPartners locale={locale} partners={homeSections?.partners ?? []} />
    </>
  );
}
