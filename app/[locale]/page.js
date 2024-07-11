import { supabase } from "@/app/api/supabase/supabase.config";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { LANGUAGES, SECTIONS_ORDER } from "../api/static/constants";
import {
  getCollections,
  getCustomersReviews,
  getDefinitionSlider,
  getHomeCategory,
  getHomeSections,
  getHomeSectionSorted,
  getLessThenGallery,
  getOfferedProduct,
  getOffers,
} from "../api/supabase/home";
import { PopupNameForm } from "./components/forms/PopupNameForm";
import ScrollUpComponent from "./components/global/ScrollUpComponent";
import { SectionTitle } from "./components/global/SectionTitle";
import { Benefits } from "./components/home/Benefits";
// import { CategoryBanner } from "./components/home/CategoryBanner";
import Collections from "./components/home/Collections";
// import { CustomSlider } from "./components/home/CustomSlider";
import FlashSale from "./components/home/FlashSale";
import PriceLimit from "./components/home/PriceLimit";
import { Reviews } from "./components/home/Reviews";
import { SaleTimer } from "./components/home/SaleTimer";
// import { VideoSection } from "./components/home/VideoSection";
import { WhyChooseUs } from "./components/home/WhyChooseUs";
import Layout from "./components/layout/Layout";
// import { OurNew } from "./components/home/OurNew";
import { Offer } from "./components/home/Offer";
import { OurPartners } from "./components/home/OurPartners";
import ReviewsMob from "./components/home/ReviewsMob";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { default as Swiper } from "./components/swiper/swiper";
import AboutUs from "./components/home/AboutUs";
import { BenefitsDT } from "./components/home/BenefitsDT";
import CollectionsDT from "./components/home/CollectionsDT";
import VideoSection from "./components/home/VideoSection";
import CategoryBanner from "./components/home/CategoryBanner";
import CustomSlider from "./components/home/CustomSlider";
import OurNew from "./components/home/OurNew";

export const revalidate = 60;

export const metadata = {
  title: "KADINLE | Home",
};

export default async function Home({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  // const homeSectionsOrderFetch = async () => {
  //   const res = await getHomeSectionSorted();
  //   if (res?.error) {
  //     return SECTIONS_ORDER;
  //   } else {
  //     let hash = {};
  //     for (const section of res?.data) {
  //       let hashName = section?.section_name?.toLowerCase();
  //       hash[hashName] = {
  //         ...section,
  //         section_order: section?.section_order + 1,
  //       };
  //     }
  //     return hash;
  //   }
  // };

  const homeSectionsOrderFetch = async () => {
    const res = await getHomeSectionSorted();
    if (res?.error) {
      return SECTIONS_ORDER;
    } else {
      let hash = {};
      for (const section of res?.data) {
        let hashName = section?.section_name?.toLowerCase();
        hash[section?.section_id] = {
          ...section,
          section_order: section?.section_order + 1,
        };
      }
      return hash;
    }
  };
  const collectionsFetch = await getCollections();
  const collections = collectionsFetch?.data;

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

  const lessThenGalleryFetch = await getLessThenGallery();
  const lessThenGallery = lessThenGalleryFetch?.data;

  const definitionSliderFetch = await getDefinitionSlider();
  const definitionSlider = definitionSliderFetch?.data;

  return (
    <LocaleLayout
      locale={locale}
      messages={(await import(`../../messages/${locale}.json`)).default}
      homeSectionsOrder={homeSectionsOrder}
      remainingTime={remainingTime}
      categories={categories}
      homeSections={homeSections}
      reviews={reviews}
      offers={offers}
      collections={collections}
      lessThenGallery={lessThenGallery}
      definitionSlider={definitionSlider}
    />
  );
}

async function getMessages(locale) {
  try {
    return (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    return {};
  }
}

function LocaleLayout({
  locale,
  messages,
  homeSectionsOrder,
  remainingTime,
  categories,
  homeSections,
  reviews,
  offers,
  collections,
  lessThenGallery,
  definitionSlider,
}) {
  return (
    <Layout locale={locale} showFooter>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <PageContent
          homeSectionsOrder={homeSectionsOrder}
          remainingTime={remainingTime}
          categories={categories}
          homeSections={homeSections}
          reviews={reviews}
          offers={offers}
          locale={locale}
          collections={collections}
          lessThenGallery={lessThenGallery}
          definitionSlider={definitionSlider}
        />
      </NextIntlClientProvider>
    </Layout>
  );
}

function PageContent({
  homeSectionsOrder,
  remainingTime,
  categories,
  homeSections,
  reviews,
  offers,
  locale,
  collections,
  lessThenGallery,
  definitionSlider,
}) {
  const t = useTranslations();
  const translations = {
    who_we_are: t("who_we_are"),
    sales: t("sales"),
    rating: t("ratings"),
    map: t("map"),
    best_quality: t("best_quality"),
    kadinle_blog: t("kadinle_blog"),
    flashSale: t("flashSale"),
    endAt: t("endAt"),
    days: t("days"),
    hours: t("hours"),
    minutes: t("minutes"),
    seconds: t("seconds"),
  };

  return (
    <>
      <Swiper languageId={LANGUAGES?.[locale]} />
      <ScrollUpComponent />
      <PopupNameForm />
      <WhyChooseUs t={t} />
      <div className="full-screen">
        <BenefitsDT t={t} />
      </div>
      <div className="mob-screen">
        <Benefits t={t} />
      </div>

      <SaleTimer remainingTime={remainingTime} translations={translations} />
      <FlashSale offer={offers?.at(0)} languageId={LANGUAGES?.[locale]} />

      <div className="lg:max-w-[1400px] lg:m-auto lg:px-4">
        {offers?.at(1) ? (
          <Offer offer={offers?.at(1)} languageId={LANGUAGES?.[locale]} />
        ) : null}
        <AboutUs
          definitionSlider={definitionSlider}
          translations={translations}
          lessThenGallery={lessThenGallery}
          languageId={LANGUAGES?.[locale]}
          homeSectionsOrder={homeSectionsOrder}
          homeSections={homeSections}
        />
        {/* less than section */}
        <PriceLimit
          lessThenGallery={lessThenGallery}
          t={t}
          languageId={LANGUAGES?.[locale]}
        />
        <div className="full-screen">
          <CollectionsDT
            collections={collections}
            locale={locale}
            languageId={LANGUAGES?.[locale]}
            seeMore={t("SEE_MORE")}
          />
        </div>
        <div className="mob-screen">
          <Collections
            collections={collections}
            locale={locale}
            languageId={LANGUAGES?.[locale]}
            seeMore={t("SEE_MORE")}
          />
        </div>

        <div className="flex flex-col space-y-4 items-center my-4">
          <SectionTitle
            title={t("All_your_needs_here")}
            className="container mx-auto"
          />
        </div>
        <div className="flex flex-col">
          {categories?.map((category) => (
            <CategoryBanner
              homeSectionsOrder={homeSectionsOrder}
              category={category}
              // categoryBannerName={categories}
              key={category?.id}
              languageId={LANGUAGES?.[locale]}
              // t={t}
              // page="main"
            />
          ))}
          <CustomSlider
            sectionSettings={homeSectionsOrder?.BEST_SELLER}
            lists={homeSections?.home_carousel}
            // order={13}
          />
          <VideoSection
            videos={homeSections?.our_videos}
            head={t("ourVideos")}
            seeMore={t("seeMore")}
            viewCount={t("View_count")}
            noView={t("no_views")}
            layout="our-videos"
            sectionSettings={homeSectionsOrder?.OUR_VIDEOS}
            locale={locale}
            order={3}
          />
          <VideoSection
            videos={homeSections?.user_videos}
            head={t("customerVideos")}
            layout="customer-videos"
            sectionSettings={homeSectionsOrder?.CUSTOMER_VIDEOS}
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
            sectionSettings={homeSectionsOrder?.OUR_NEW}
            // order={20}
            ourNew={t("ourNew")}
            seeMore={t("SEE_MORE")}
          />
        </div>
      </div>
      <div className="full-screen">
        <Reviews
          reviews={reviews}
          sectionSettings={homeSectionsOrder?.["reviews"]}
          locale={locale}
          CustomersReviews={t("Customers_Reviews")}
        />
      </div>
      <div className="mob-screen">
        <ReviewsMob
          reviews={reviews}
          sectionSettings={homeSectionsOrder?.["reviews"]}
          locale={locale}
          CustomersReviews={t("Customers_Reviews")}
        />
      </div>
      <OurPartners locale={locale} partners={homeSections?.partners ?? []} />
    </>
  );
}
