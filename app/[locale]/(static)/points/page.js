import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { StaticPageTitle } from "../../components/global/StaticPageTitle";
import Layout from "../../components/layout/Layout";
import ScrollUpComponent from "../../components/global/ScrollUpComponent";
import Image from "next/image";

export const metadata = { title: "KADINLE | Kadinle points" };

const Points1 = "https://kadinle.com/media/images/Points1.svg";
const Points2 = "https://kadinle.com/media/images/Points2.svg";
const Points3 = "https://kadinle.com/media/images/Points3.svg";
const Points4 = "https://kadinle.com/media/images/Points4.svg";
const Points5 = "https://kadinle.com/media/images/Points5.svg";
const Points6 = "https://kadinle.com/media/images/Points6.svg";
const Points7 = "https://kadinle.com/media/images/Points7.svg";
const Points8 = "https://kadinle.com/media/images/Points8.svg";

const page = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("");

  return (
    <Layout locale={locale} bodyClassName="!max-w-full">
      <ScrollUpComponent />
      <StaticPageTitle title={t("Kadinle_Points")} />
      <div className="flex flex-col poppins   md:max-w-[575px] md:mx-auto w-full">
        <div className="flex justify-center text-[12px] text-[#707070]">
          <div className="flex flex-col w-[90%] max-w-[500px]">
            <div className="self-center mt-6">
              <Image
                src={Points1}
                alt="points image 2"
                height={200}
                width={200}
                className="w-[200px] object-contain"
              />
            </div>

            <h3 className="self-center text-opink font-[700] mt-4">
              {t("points_page_msg")}
            </h3>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg1")}
            </p>

            <h3 className="self-center text-opink font-[700] mt-10">
              {t("points_how")}
            </h3>
            <h4 className="text-black self-center font-medium mt-2 text-center px-4 leading-[24px]">
              {t("points_how_msg1")}
            </h4>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_how_msg2")}
            </p>

            <div className="self-center mt-6">
              <Image
                src={Points2}
                className="object-contain w-20"
                alt="points image 3"
                height={78}
                width={78}
              />
            </div>
            <p className="self-center mt-2 text-black font-[500]">
              {t("points_page_msg2")}
            </p>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg3")}
            </p>

            {/* <div className="self-center mt-6">
              <Image src={Points3} />
            </div>
            <p className="self-center mt-2 text-black font-[500]">
              {t("points_page_msg4")}
            </p>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg5")}
            </p> */}

            <div className="self-center mt-6">
              <Image
                src={Points4}
                className="object-contain w-20"
                alt="points image 4"
                height={78}
                width={78}
              />
            </div>
            <p className="self-center mt-2 text-black font-[500]">
              {t("points_page_msg6")}
            </p>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg7")}
            </p>

            <div className="self-center mt-6">
              <Image
                src={Points5}
                className="object-contain w-20"
                alt="points image 5"
                height={78}
                width={78}
              />
            </div>
            <p className="self-center mt-2 text-black font-[500]">
              {t("points_page_msg8")}
            </p>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg9")}
            </p>

            <div className="self-center mt-6">
              <Image
                src={Points6}
                className="object-contain w-20"
                alt="points image 6"
                height={78}
                width={78}
              />
            </div>
            <p className="self-center mt-2 text-black font-[500]">
              {t("Stay_Connected")}
            </p>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg10")}
            </p>

            <div className="self-center mt-6">
              <Image
                src={Points7}
                className="object-contain w-20"
                alt="points image 7"
                height={78}
                width={78}
              />
            </div>
            <p className="self-center mt-2 text-black font-[500]">
              {t("points_page_msg11")}
            </p>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg12")}
            </p>

            <div className="self-center mt-6">
              <Image
                src={Points8}
                className="object-contain w-20"
                alt="points image 8"
                height={78}
                width={78}
              />
            </div>
            <p className="self-center mt-2 text-black font-[500]">
              {t("points_page_msg13")}
            </p>
            <p className="self-center mt-2 text-center px-4 leading-[24px]">
              {t("points_page_msg14")}
            </p>

            <h3 className="text-opink mt-10 font-[500]">
              {t("Points_redeem_policy")}
            </h3>

            <div className="flex gap-2 mt-3">
              <p className="leading-[24px]">-</p>
              <p className="leading-[24px]">{t("points_page_msg15")}</p>
            </div>

            <div className="flex gap-2 mt-2">
              <p className="leading-[24px]">-</p>
              <p className="leading-[24px]">{t("points_page_msg16")}</p>
            </div>

            <div className="flex gap-2 mt-2">
              <p className="leading-[24px]">-</p>
              <p className="leading-[24px]">{t("points_page_msg17")}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
