"use client";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import CloseIcon from "../Icons/CloseIcon";
const NewsBar = ({ setOpenNews, news, locale }) => {
  const isArabic = locale === "ar";

  return (
    <div className="bg-yellow-200 text-black direction-ltr news-parent">
      <div className="flex items-center text-xs justify-between gap-2 p-1 direction-ltr">
        <Marquee
          speed={50}
          pauseOnHover={true}
          direction={isArabic ? "right" : "left"}
        >
          {news?.map((item, index) => (
            <div
              className={`flex items-center ${isArabic && "direction-rtl"}`}
              key={item?.id}
            >
              {item.link && item.link !== "#" ? (
                <a
                  href={
                    item.link.includes("http")
                      ? item.link
                      : `https://${item.link}`
                  }
                  className="whitespace-nowrap mr-2 cursor-pointer text-primary"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item?.news_content?.[0]?.content}
                </a>
              ) : (
                <p className="whitespace-nowrap mx-2 text-primary">
                  {item?.news_content?.[0]?.content}
                </p>
              )}

              <Image
                src={"https://kadinle.com/media/images/logo-icon.png"}
                alt="kadinle"
                className={`w-5 h-5 direction-ltr ${
                  index === news?.length - 1 ? "hidden" : ""
                }`}
                height={40}
                width={40}
              />
            </div>
          ))}
        </Marquee>
        <button
          onClick={() => setOpenNews(false)}
          className=" flex items-center justify-center text-black rounded-full"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NewsBar;
