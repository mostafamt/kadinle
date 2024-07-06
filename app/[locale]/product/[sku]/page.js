import { LANGUAGES } from "@/app/api/static/constants";
import { getOfferedProduct } from "@/app/api/supabase/home";
import {
  getChart,
  getProductCategorySliders,
  getProductInfo,
  getRegion,
  getSizes,
  incrementVideoViews,
} from "@/app/api/supabase/products";
import {unstable_setRequestLocale} from 'next-intl/server';
import Link from "next/link";
import ChevronIcon from "../../components/chat/ChevronIcon";
import Layout from "../../components/layout/Layout";
import { ProductPage }  from "../../components/products/ProductPage";
import ProductPageMob from "../../components/products/ProductPageMob";


export async function generateMetadata({
  params: { sku, locale },
  searchParams,
}) {
  const product = await getProductInfo(sku);

  const productData = product?.data?.at(0);

  const content = productData?.productcontents?.find(
    (c) => c?.language_id === LANGUAGES?.[locale]
  );

  return {
    title: `KADINLE | ${content?.name}`,
    description: content?.description,
    openGraph: {
      title: `KADINLE | ${content?.name}`,
      description: content?.description,
      url: `https://kadinle.com/product/${sku}`,
      type: "website",
      images: [productData?.productimages?.at(0).image],
    },

    twitter: {
      title: `KADINLE | ${content?.name}`,
      description: content?.description,
      images: [productData?.productimages?.at(0).image],
      domain: "kadinle.com",
      card: "product",
      site: "@kadinle",
      creator: "@kadinle",
    },
  };
}

const SingleProduct = async ({ params: { sku, locale } }) => {
  unstable_setRequestLocale(locale);
  const productRes = getProductInfo(sku);
  const regionsRes = getRegion();
  const chartRes = getChart(sku);
  const sizesRes = getSizes();

  let product, chart, regions, sizesData;

  try {
    // eslint-disable-next-line no-undef
    [product, regions, chart, sizesData] = await Promise.all([
      productRes,
      regionsRes,
      chartRes,
      sizesRes,
    ]);
  } catch (err) { }

  let sizes = {};
  for (const size of sizesData) {
    sizes[size?.sizesContent?.[0]?.size_id] = size;
  }
  incrementVideoViews(product?.productinfo?.id);

  const remainingTimeFetch = await getOfferedProduct();

  const remainingTimeData = remainingTimeFetch?.date;
  const remainingTime = {
    days: remainingTimeData?.day,
    hours: remainingTimeData?.hours,
    minutes: remainingTimeData?.minutes,
    seconds: remainingTimeData?.seconds,
  };

  const productData = product?.data?.at(0);
  const productName = productData?.productcontents?.find(
    (product) => product?.language_id === LANGUAGES?.[locale]
  )?.name;
  const category = productData?.productinfo?.category_content?.find(
    (category) => category?.language_id === LANGUAGES?.[locale]
  );

  const productCategorySliders = await getProductCategorySliders(
    20,
    product?.data?.at(0)?.productinfo?.category_id
  );

  return (
    <>
      <Layout
        locale={locale}
        showFooter
      >
        <div className="full-screen">
          <ProductPage
            locale={locale}
            product={product?.data?.at(0)}
            regions={regions?.data}
            chart={chart?.data}
            sku={sku}
            sizes={sizes}
            remainingTime={remainingTime}
            productCategorySliders={productCategorySliders?.data}
          />
        </div>

        <div className="mob-screen">
          <ProductPageMob
            locale={locale}
            product={product?.data?.at(0)}
            regions={regions?.data}
            chart={chart?.data}
            sku={sku}
            sizes={sizes}
            remainingTime={remainingTime}
            productCategorySliders={productCategorySliders?.data}
          />
        </div>
      </Layout>
    </>
  );
};

export default SingleProduct;
