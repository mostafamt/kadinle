import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = { title: "KADINLE | Track order" };

const order1 = "https://kadinle.com/media/images/order1.png";
const order2 = "https://kadinle.com/media/images/order2.png";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("trackYourOrder")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-3">
              <h2 className="text-black font-semibold">{t("howCanTrack")}</h2>
              <div className="bg-opink h-[2px] w-[25px]"></div>
            </div>

            <p className="mt-1 leading-[24px]">{t("checkStatusRequest")}</p>

            <p className="mt-1 leading-[24px] text-black  ltr:ml-2  rtl:mr-2">
              {t("loginToAccount")}{" "}
              <span className="font-semibold">{`“${t("myOrders")}”`}</span>
              {t("ordersInTurkey")}
            </p>

            <Image
              className="w-[150px] object-contain mt-2 ltr:ml-2  rtl:mr-2"
              src={order1}
              alt="track order image 1"
              width={150}
              height={130}
            />

            <p className="mt-4 text-black ">
              {t("clickOn")}{" "}
              <span className="font-semibold">{`“${t("viewDetails")}”`}</span>{" "}
              {t("forOrderWish")}
            </p>

            <p className="mt-3 text-black ">
              {t("IfYourOrderStatus")}{" "}
              <span className="font-semibold">{`${t("tracking")}`} </span>
              {t("toCheckDelivery")}
            </p>

            <Image
              className="w-[150px] object-contain mt-2 ltr:ml-2  rtl:mr-2"
              src={order2}
              alt="track order image 2"
              width={150}
              height={130}
            />

            <p className="mt-2 text-black ">
              {t("additionallyYouCan")}{" "}
              <span className="font-semibold">
                {`“${t("shippingTrackingNumber")}”`}
              </span>{" "}
              {t("providedInOrder")}
            </p>

            <Link
              href="/new-arrivals"
              className="text-center py-2 w-[60%] max-w-[300px] bg-opink text-owhite self-center rounded-[6px] mt-5 uppercase"
            >
              {t("shopNow")}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
