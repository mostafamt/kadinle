import {
  footerLinksFamily,
  footerLinksPublic,
  footerLinksServiceCenter,
} from "@/app/api/static/links";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NewsLatter } from "../home/NewsLatter";
import { useTranslations } from "next-intl";
const banner = "https://kadinle.com/media/images/banner.png";

const Footer = ({ locale }) => {
  const t =useTranslations();

  return (
    <footer>
      <NewsLatter banner={banner} locale={locale} />
      <div className="flex flex-col justify-center items-center bg-fgray">
        <div className="flex flex-col items-center w-[90%] lg:w-[98%]">
          <div className="flex flex-col md:items-center lg:items-start w-full justify-between pt-5 pb-3 lg:py-20 px-0 text-xs dir-footer  ">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex flex-1 flex-col space-y-4 justify-center ">
                <Link href="/">
                  <Image
                    src={"/logo.svg"}
                    alt="kadinle logo"
                    height={50}
                    width={120}
                  />{" "}
                </Link>
                <h4 className="font-[300] leading-4 lg:w-[50%] text-[#686868]">
                  {t("kadinleFooterAbout")}
                </h4>
                <h5 className="font-[400] leading-5 mt-2 text-primary full-screen">
                  {t("Follow_us_on")}
                </h5>
                <div className="flex flex-col space-y-2">
                  <div className="flex gap-4 items-center">
                    <a href="https://www.facebook.com/kadinleofficial?mibextid=ZbWKwL">
                      {" "}
                      <Image
                        className="cursor-pointer w-5 h-5"
                        alt="facebook account"
                        src={
                          "https://kadinle.com/media/images/facebook-app-symbol.svg"
                        }
                        height={20}
                        width={20}
                      />
                    </a>

                    <a href="https://twitter.com/kadinle">
                      {" "}
                      <Image
                        className="cursor-pointer w-5 h-5"
                        alt="twitter account"
                        src={"https://kadinle.com/media/images/twitter.svg"}
                        height={20}
                        width={20}
                      />
                    </a>

                    <a href="https://www.tiktok.com/@kadinle.official">
                      {" "}
                      <Image
                        className="cursor-pointer w-5 h-5"
                        alt="tiktok account"
                        src={"https://kadinle.com/media/images/tik-tok.svg"}
                        height={20}
                        width={20}
                      />
                    </a>

                    <a href="https://www.instagram.com/kadinleofficial/?igshid=MzRlODBiNWFlZA%3D%3D">
                      {" "}
                      <Image
                        className="cursor-pointer w-5 h-5"
                        alt="instagram account"
                        src={"https://kadinle.com/media/images/Instagram2.svg"}
                        height={20}
                        width={20}
                      />
                    </a>

                    <a href="https://www.youtube.com/@kadinle">
                      {" "}
                      <Image
                        className="cursor-pointer w-5 h-5"
                        alt="youtube account"
                        src={"https://kadinle.com/media/images/youtube.svg"}
                        height={20}
                        width={20}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-between w-full">
              <div className="flex flex-1 flex-col space-y-2  font-[500] md:w-none mt-4 ">
                <h4 className="font-semibold text-primary text-sm capitalize">
                  {t("customerService")}
                </h4>
                <ul className="flex flex-col space-y-2">
                  {footerLinksServiceCenter?.map((item) => (
                    <li key={item?.name}>
                      <Link
                        href={item?.path}
                        className="cursor-pointer hover:text-primary capitalize"
                      >
                        {t(item?.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-1 flex-col space-y-2  font-[500] md:w-none mt-4 ">
                <h4 className="font-semibold text-primary text-sm">
                  {t("publicPolicies")}
                </h4>
                <ul className="flex flex-col space-y-2">
                  {footerLinksPublic?.map((item) => (
                    <li key={item?.name}>
                      <Link
                        href={item?.path}
                        className="cursor-pointer hover:text-primary capitalize"
                      >
                        {t(item?.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2 lg:gap-4 items-center justify-center md:p-0 mt-4">
              <div className="w-1/3 lg:w-full flex flex-col space-y-2">
                <Image
                  className="w-[120px] lg:min-w-[120px] md:w-none cursor-pointer"
                  src={"https://kadinle.com/media/images/googlePlay.png"}
                  height={80}
                  width={120}
                />
                <div className="mob-screen">
                  <Image
                    className="scale-[80%]"
                    src={
                      "https://kadinle.com/media/images/Screenshot 2023-01-28 at 3.28.32 PM.png"
                    }
                    alt="qr code"
                    width={120}
                    height={80}
                  />
                </div>
              </div>

              <div className="w-1/3 lg:w-full flex flex-col space-y-2">
                <Image
                  className="w-[120px] lg:min-w-[120px] md:w-none hover:text-primary cursor-pointer"
                  src={"https://kadinle.com/media/images/appStore.png"}
                  height={80}
                  width={120}
                />
                <div className="mob-screen">
                  <Image
                    className="scale-[80%]"
                    src={
                      "https://kadinle.com/media/images/Screenshot 2023-01-28 at 3.28.32 PM.png"
                    }
                    alt="qr code"
                    width={120}
                    height={80}
                  />
                </div>
              </div>

              <div className="w-1/3 lg:w-full flex flex-col space-y-2 ">
                {/* <div className="h-[35px]"> */}
                <Image
                  className="w-[120px] lg:min-w-[120px] md:w-none hover:text-primary cursor-pointer"
                  src={"https://kadinle.com/media/images/hwawi.png"}
                  height={80}
                  width={120}
                />
                {/* </div> */}
                <div className="mob-screen">
                  <Image
                    className="scale-[80%]"
                    src={
                      "https://kadinle.com/media/images/Screenshot 2023-01-28 at 3.28.32 PM.png"
                    }
                    alt="qr code"
                    width={120}
                    height={80}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center bg-black">
          <div className="flex justify-center gap-4  w-full p-2 copy-right">
            <p className="text-tgray text-[10px] text-center">
              <span className="text-primary">{t("KADINLE_STORE")}</span> ©{" "}
              <span className="text-white">{new Date().getFullYear()}</span> -{" "}
              {t("DESIGNED_BY")}{" "}
              <a href="https://www.whynot-tech.com/" className="text-dblue">
                WHY NOT Tech!
              </a>{" "}
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
