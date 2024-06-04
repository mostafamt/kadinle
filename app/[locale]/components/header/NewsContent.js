import React from "react";
import Image from "next/image";

export const NewsContent = ({ news, isArabic }) => {
  return (
    <div className="flex gap-12">
      {news?.map((item, index) => (
        <div
          className={`flex items-center ${isArabic && "direction-rtl"}`}
          key={item?.id}
        >
          {item.link && item.link !== "#" ? (
            <a
              href={
                item.link.includes("http") ? item.link : `https://${item.link}`
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
    </div>
  );
};
