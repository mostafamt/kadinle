import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";

export const metadata = { title: "KADINLE | We care about you" };

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("weCare")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="flex flex-col mt-4">
              <h2 className="text-black font-[700]">{t("canICancel")}</h2>
            </div>
            <p className="leading-[24px] mt-1">
              {t("youCanCancel")}{" "}
              <Link
                href="/profile?active=returnOrder"
                className="text-opink font-[500]"
              >
                {t("returnTickets")}
              </Link>
              .
            </p>

            <h3 className="text-black font-[700] mt-5">{t("canIEdit")}</h3>
            <h3 className="leading-[24px] mt-1">{t("youCanEasily")}</h3>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">
                {t("loginTo")}{" "}
                <Link href="/profile" className="text-opink font-[500]">
                  {t("myAccount")}
                </Link>{" "}
                {t("page")}
              </p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">
                {t("goTo")}
                <Link
                  href="/profile?active=order"
                  className="text-opink font-[500] capitalize"
                >
                  {t("my orders")}
                </Link>{" "}
                {t("page")}
              </p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("selectTheOrder")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("modify")}</p>
            </div>

            <p>
              <span className="text-[#DC0606] leading-[24px] mt-3">
                {t("note")}
              </span>{" "}
              {t("ifYour")}
            </p>

            <p className="text-black font-[700] mt-5">{t("whatExpected")}</p>
            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("preparing")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("shippingMyTake")}</p>
            </div>

            <p className="text-black font-[700] mt-5">{t("whatTracking")}</p>
            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("orderNumberSpecific")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("shippingMyTake")}</p>
            </div>

            {/* 5 */}
            <p className="text-black font-[700] mt-5">{t("howDo")}</p>
            <p className="leading-[24px] mt-1">{t("YouCheck")}</p>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("yourOrderConfirmed")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("preparingOrder")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("orderShipped")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("orderDelivered")}</p>
            </div>

            {/* 6 */}
            <p className="text-black font-[700] mt-5">{t("whatTerms")}</p>
            <p className="leading-[24px] mt-1">{t("customerRightsToReturn")}</p>

            {/* 7 */}

            <p className="text-black font-[700] mt-5">{t("discountCoupon")}</p>
            <p className="leading-[24px] mt-1">{t("afterFinish")}</p>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("typeCoupon")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("clickOnApply")}</p>
            </div>

            <p className="leading-[24px] mt-1">{t("onceConfirm")}</p>

            {/* 8 */}
            <p className="text-black font-[700] mt-5">{t("whenCan")}</p>
            <p className="leading-[24px] mt-1">{t("theCost")}</p>

            {/* 9 */}
            <h3 className="text-black font-[700] mt-5">{t("whatPayment")}</h3>
            <h3 className="leading-[24px] mt-1">{t("atKadinle")}</h3>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("visa")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("masterCard")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("googlePay")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("applePay")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("americanExpress")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("aliPay")}</p>
            </div>

            {/* 10 */}
            <p className="text-black font-[700] mt-5">
              {t("myOrderConfirmedBut")}
            </p>
            <p className="leading-[24px] mt-1">{t("youContact")}</p>

            {/* 11 */}
            <p className="text-black font-[700] mt-5">{t("iReceived")}</p>
            <p className="leading-[24px] mt-1">{t("inCase")}</p>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("orderNumberAndProductCode")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("completeImage")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("ImageOfProduct")}</p>
            </div>

            <p className="leading-[24px] mt-1">{t("theCustomerService")}</p>

            {/* 12 */}
            <p className="text-black font-[700] mt-5">{t("whatIReceive")}</p>
            <p className="leading-[24px] mt-1">{t("inTheCase")}</p>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("orderNumberAndProductCode")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("anImageShowing")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("fulSizeImage")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("anImageWrongInfo")}</p>
            </div>

            <p className="leading-[24px] mt-1">{t("kadinleSupportTeam")}</p>

            {/* 13 */}
            <p className="text-black font-[700] mt-5">{t("doIHavePay")}</p>
            <p className="leading-[24px] mt-1">
              {t("customerBears")}{" "}
              <Link
                href="/profile?active=order"
                className="text-opink font-[500]"
              >
                {t("myOrdersPage")}
              </Link>{" "}
              {t("orBy")}
              <Link
                href="/shipping-policy-turkey"
                className="text-opink font-[500]"
              >
                {t("shippingPolicePage")}
              </Link>
              .
            </p>

            {/* 14 */}
            <p className="text-black font-[700] mt-5">
              {t("howCanTrackStatus")}
            </p>
            <p className="leading-[24px] mt-1">{t("throughMyOrder")}</p>

            {/* 15 */}
            <p className="text-black font-[700] mt-5">{t("canIRefund")}</p>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-2">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">{t("ifOrderNotShipped")}</p>
            </div>

            <div className="flex gap-3 ltr:ml-3 rtl:mr-3 mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="w-[8px] h-[8px] rounded-full bg-black "></div>
              </div>
              <p className="leading-[24px]">
                {t("afterTheOrder")}{" "}
                <Link href="/return" className="text-opink font-[500]">
                  {t("exchangeAndReturn")}
                </Link>
              </p>
            </div>

            {/* 16 */}
            <p className="text-black font-[700] mt-5">
              {t("moreThanOneCoupon")}
            </p>
            <p className="leading-[24px] mt-1">{t("onlyUseOne")}</p>

            {/* 17 */}
            <p className="text-black font-[700] mt-5">{t("onlyUseOne")}</p>
            <p className="leading-[24px] mt-1">
              {t("cashOnDeliveryService")}
              <span className="font-medium">{t("paymentPolicies")}</span>{" "}
              {t("approvedByKadinle")}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
