import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Image from "next/image";

export const metadata = { title: "KADINLE | Size guide" };

const quick1 = "https://kadinle.com/media/images/measureYourselfCorrectly.png";
const quick2 = "https://kadinle.com/media/images/measurementsTable.png";
const quick3 = "https://kadinle.com/media/images/measurements.png";
const quick4 = "https://kadinle.com/media/images/measurementsTable2.png";
const quick5 = "https://kadinle.com/media/images/clientsService.jpg";
const quick6 = "https://kadinle.com/media/images/material.png";
const quick7 = "https://kadinle.com/media/images/measurementsDought.jpg";
const quick8 = "https://kadinle.com/media/images/makeKadinleYourTrust.png";
const quick9 = "https://kadinle.com/media/images/returnPolicy.png";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("sizeGuide")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <h2 className="mt-1 leading-[24px] text-black ">
              {t("Dear_customer")}
            </h2>

            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("select_category_msg")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("refer_msg")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("measurement_msg")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("taking_msg")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("details_related")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("appropriate_msg")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("Browsing_msg")}</p>
            </div>
            <div className="flex gap-2 ltr:ml-3 rtl:mr-3  mt-1">
              <div className="flex items-center justify-center h-[24px]">
                <div className="min-w-[8px] h-[8px] bg-black rounded-full"></div>
              </div>
              <p className="leading-[24px]">{t("event_msg")}</p>
            </div>

            <p className="leading-[24px] mt-6 mx-auto text-black">
              {t("we_are_here")}
            </p>

            <p className="self-center leading-[24px] mt-6 text-black font-[500]">
              {t("size_msg")}
            </p>

            <p className="leading-[24px] mt-2 mx-auto text-black">
              {t("minimizeReturns")}
            </p>

            <p className=" leading-[24px] mt-4 text-black ">
              {t("getting_msg")}
            </p>

            <p className="leading-[24px] mt-1">{t("absolute_msg")}</p>
            <p className="leading-[24px] mt-1">{t("great_msg")}</p>
            <p className="leading-[24px] mt-1">{t("Luckily_msg")}</p>

            {/* 1 */}
            <p className="text-black mt-10 leading-[24px] font-[700]">
              1- {t("Measure_msg")}
            </p>
            <p className="mt-1 leading-[24px]">{t("measurements_msg")}</p>
            <Image
              className="w-[40%] max-w-[129px] self-center my-2 object-contain "
              src={quick1}
              alt="size guide image 1"
              height={240}
              width={300}
            />

            {/* 2 */}
            <p className="text-black leading-[24px] font-[700]">
              2- {t("measurement_guide")}
            </p>
            <p className="mt-1 leading-[24px]">{t("even_msg")}</p>
            <p className="leading-[24px] ">{t("find_msg")}</p>

            <p className="leading-[24px] mt-4">
              <span className="font-[500] text-opink">{t("First")}:</span>{" "}
              {t("way1")}
            </p>
            <Image
              className="w-[80%] max-w-[283px] self-center my-2 object-contain"
              src={quick2}
              alt="size guide image 2"
              height={240}
              width={300}
            />

            <p className="leading-[24px] mt-4">
              <span className="font-[500] text-opink">{t("Second")}:</span>{" "}
              {t("way2")}
            </p>
            <Image
              className="w-[70%] max-w-[200px] self-center my-2"
              src={quick3}
              alt="size guide image 3"
              height={240}
              width={300}
            />

            <p className="leading-[24px] mt-4">
              <span className="font-[500] text-opink">{t("Third")}:</span>{" "}
              {t("way3")}
            </p>
            <Image
              className="w-[70%] max-w-[200px] self-center mt-4 object-contain"
              src={quick4}
              alt="size guide image 4"
              height={240}
              width={300}
            />

            {/* 3 */}
            <p className="text-black mt-8 leading-[24px] font-[700]">
              3- {t("read_review")}
            </p>
            <p className="mt-1 leading-[24px]">{t("size_scroll")}</p>
            <p className="mt-1 leading-[24px]">{t("everyone_msg")}</p>

            <Image
              className="w-[90%] max-w-[329px] self-center my-2 object-contain"
              src={quick5}
              alt="size guide image 5"
              height={240}
              width={300}
            />

            {/* 4 */}
            <p className="text-black mt-10 leading-[24px] font-[700]">
              4- {t("give_msg21")}
            </p>
            <p className="mt-1 leading-[24px]">{t("give_msg20")}</p>
            <p className="mt-1 leading-[24px]">{t("give_msg19")}</p>

            {/* 5 */}
            <p className="leading-[24px] mt-10 font-[700] text-black">
              5- {t("give_msg16")}
            </p>
            <p className="leading-[24px]">{t("give_msg15")}</p>
            <p className="leading-[24px]">{t("give_msg14")}</p>

            <Image
              className="w-[80%] max-w-[280px] self-center my-2 object-contain"
              src={quick6}
              alt="size guide image 6"
              height={240}
              width={300}
            />
            <p className="text-black mt-10 leading-[24px] font-[700]">
              6- {t("give_msg12")}
            </p>

            {/* 6 */}
            <p className="mt-1 leading-[24px]">{t("give_msg11")}</p>

            <Image
              className="w-[90%] max-w-[329px] self-center my-2 object-contain"
              src={quick7}
              alt="size guide image 7"
              height={240}
              width={300}
            />

            {/* 7 */}
            <p className="text-black mt-10 leading-[24px] font-[700]">
              7- {t("give_msg7")}
            </p>
            <p className="mt-1 leading-[24px]">{t("give_msg6")}</p>
            <p className="mt-1 leading-[24px]">{t("give_msg66")}</p>

            <Image
              className="w-[80%] max-w-[280px] self-center my-2 object-contain"
              src={quick8}
              alt="size guide image 8"
              height={240}
              width={300}
            />

            {/* 8 */}
            <p className="text-black mt-10 leading-[24px] font-[700]">
              8- {t("give_msg4")}
            </p>
            <p className="mt-1 leading-[24px]">{t("give_msg3")}</p>

            <Image
              className="w-[90%] max-w-[320px] self-center my-2 object-contain"
              src={quick9}
              alt="size guide image 9"
              height={240}
              width={300}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
