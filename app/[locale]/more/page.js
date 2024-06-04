import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { getTranslations } from "next-intl/server";
import Layout from "../components/layout/Layout";
import ScrollUpComponent from "../components/global/ScrollUpComponent";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/app/api/supabase/supabase.config";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

const Address = "https://kadinle.com/media/images/address.svg";
const FAQ = "https://kadinle.com/media/images/chat.gif";
const choose = "https://kadinle.com/media/images/choose.svg";
const chooseYes = "https://kadinle.com/media/images/chooseYes.svg";
const Currency = "https://kadinle.com/media/images/currency.svg";
const Gift2 = "https://kadinle.com/media/images/gift-hand.gif";
const Language = "https://kadinle.com/media/images/language.svg";
const Legal = "https://kadinle.com/media/images/legal.svg";
const Notification = "https://kadinle.com/media/images/notification.svg";
const Payment2 = "https://kadinle.com/media/images/payment2.svg";
const Privacy = "https://kadinle.com/media/images/privacy.svg";
const Profile2 = "https://kadinle.com/media/images/profile2.svg";
import {unstable_setRequestLocale} from 'next-intl/server';

const MorePage = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations(locale);
  const user = JSON.parse(cookies().get("KADINLE_USER").value);

  return (
    <Layout hideHeader locale={locale}>
      <ScrollUpComponent />
      <div className="flex justify-center bg-[#F5F6F8]  min-h-screen">
        <div className="flex flex-col w-[90%] max-w-[500px]">
          <h2 className="font-[700] text-[24px] my-2 mt-4">{t("More")}</h2>
          <div className="bg-white shadow text-xs capitalize font-normal">
            <div className="flex flex-col text-[#25252D] bg-white rounded-[0]">
              {user?.id ? (
                <>
                  <Link
                    href="/profile"
                    className={`flex justify-between  px-3 border-b`}
                  >
                    <div className="flex gap-5  w-full items-center">
                      <Image
                        src={Profile2}
                        className={` rounded-full bg-gray-200 w-[21px] NotActive NotStroke`}
                        height={25}
                        width={25}
                        alt={t("My_Profile")}
                      />
                      <p className={`py-3  w-full`}>{t("My_Profile")}</p>
                    </div>
                    <Image
                      className={`rtl:rotate-180 py-3 object-contain`}
                      src={choose}
                      alt="Choose"
                      height={20}
                      width={20}
                    />
                  </Link>

                  <Link
                    href="/profile?active=address"
                    className={`flex justify-between px-3  border-b`}
                  >
                    <div className="flex gap-5  w-full items-center">
                      <Image
                        src={Address}
                        className={`w-[21px] NotActive NotStroke object-contain`}
                        height={25}
                        width={25}
                        alt={t("My_Address")}
                      />
                      <p className={`py-3  w-full `}>{t("My_Address")}</p>
                    </div>
                    <Image
                      className={`rtl:rotate-180 py-3 object-contain`}
                      src={choose}
                      alt="choose"
                      height={20}
                      width={20}
                    />
                  </Link>

                  <Link
                    href="/how-to-buy"
                    className={`flex justify-between px-3  border-b`}
                  >
                    <div className="flex gap-5  w-full items-center">
                      <Image
                        src={Payment2}
                        className={`w-[21px] object-contain`}
                        height={25}
                        width={25}
                        alt={t("Payment_Method")}
                      />
                      <p className={`py-3  w-full `}>{t("Payment_Method")}</p>
                    </div>
                    <Image
                      className={`rtl:rotate-180 py-3 object-contain`}
                      src={choose}
                      alt="Choose"
                      height={20}
                      width={20}
                    />
                  </Link>
                </>
              ) : null}

              <Link
                href="/send-gift"
                className={`flex justify-between px-3  border-b
                "bg-white text-black"
                `}
              >
                <div className="flex gap-2  w-full items-center">
                  <Image
                    src={Gift2}
                    className={`w-[30px] NotActive NotStroke object-contain
                    `}
                    alt="send gift"
                    height={30}
                    width={30}
                  />
                  <p className={`py-3 w-full`}>{t("sendGift")}</p>
                </div>
                <Image
                  className={`rtl:rotate-180 py-3  object-contain`}
                  src={choose}
                  alt="Choose"
                  height={20}
                  width={20}
                />
              </Link>
            </div>
            {user?.id ? (
              <Link
                href="/notifications"
                className="flex flex-col  border-b text-[#25252D] bg-white  rounded-[7px]"
              >
                <div className={`flex justify-between px-3 `}>
                  <div className="flex gap-5  w-full items-center">
                    <Image
                      src={Notification}
                      className={`w-[21px] object-contain `}
                      alt="notifications"
                      height={25}
                      width={25}
                    />
                    <p className={`py-3  w-full `}>
                      {/* {t("Notification_Settings")} */}
                      {t("notifications")}
                    </p>
                  </div>
                  <Image
                    className={`rtl:rotate-180 py-3 object-contain`}
                    src={choose}
                    height={20}
                    width={20}
                    alt="Choose"
                  />
                </div>
              </Link>
            ) : null}
            <Link
              href="/shipping-policy-turkey"
              className={`flex justify-between px-3  border-b`}
            >
              <div className="flex gap-5  w-full items-center">
                <Image
                  src={Privacy}
                  className={`w-[21px] object-contain `}
                  alt="Privacy_Policy"
                  height={25}
                  width={25}
                />
                <p className={`py-3  w-full`}>{t("Privacy_Policy")}</p>
              </div>
              <Image
                className={`rtl:rotate-180 py-3 object-contain`}
                src={choose}
                alt="Choose"
                height={20}
                width={20}
              />
            </Link>

            <Link
              href="/common-questions"
              className={`flex justify-between px-3  border-b`}
            >
              <div className="flex gap-2  w-full items-center">
                <Image
                  src={FAQ}
                  className={`w-[30px] NotActive NotStroke object-contain
                    `}
                  alt="Frequently Asked Questions"
                  height={30}
                  width={30}
                />
                {/* <FAQ
                className={`w-[21px] ${active === 10 ? "Active Stroke" : "NotActive NotStroke"
                  }`}
              /> */}
                <p className={`py-3  w-full`}>
                  {t("Frequently_Asked_Questions")}
                </p>
              </div>
              <Image
                className={`rtl:rotate-180 py-3 object-contain`}
                src={choose}
                alt="Choose"
                height={20}
                width={20}
              />
            </Link>

            <Link
              href="/shipping-information"
              className={`flex justify-between px-3  border-b`}
            >
              <div className="flex gap-5  w-full items-center">
                <Image
                  src={Legal}
                  className={`w-[21px] object-contain `}
                  alt={t("Shipping_Information")}
                  height={25}
                  width={25}
                />
                <p className={`py-3  w-full`}>{t("Shipping_Information")}</p>
              </div>
              <Image
                className={`rtl:rotate-180 py-3 object-contain`}
                src={choose}
                alt="Choose"
                height={20}
                width={20}
              />
            </Link>
            {!user?.id ? (
              <Link
                href="/login"
                className="flex items-center justify-center w-full  text-opink my-4"
              >
                {t("signin")}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MorePage;
