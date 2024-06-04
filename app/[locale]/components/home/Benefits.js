import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SectionTitle } from "../global/SectionTitle";

const benefitsList = [
  {
    title: "Free_Shipping",
    description: "when_purchasing1",
    description2: "when_purchasing2",
    href: "/free-shipping-turkey",
    imageSrc: "https://kadinle.com/media/images/truck.gif",
  },
  {
    title: "send_gift",
    description: "send_gift_msg",
    href: "/send-gift",
    imageSrc: "https://kadinle.com/media/images/gift box.gif",
  },
  {
    title: "Your_Points",
    description: "Earn_points",
    href: "/points",
    imageSrc: "https://kadinle.com/media/images/award.gif",
  },
  {
    title: "Kadinle_Family",
    description: "Exclusive_benefits",
    href: "/family",
    imageSrc: "https://kadinle.com/media/images/family.svg",
  },
  {
    title: "Gift_Cards",
    description: "Gift_Cards_msg",
    href: "/gift",
    imageSrc: "https://kadinle.com/media/images/gift-hand.gif",
  },
];

export const Benefits = ({ t }) => {
  
  return (
    <div className="flex flex-col space-y-4 items-center mt-4">
      <SectionTitle title={t("many_benefits")} containerClassName="!my-0" />
      <div className="flex justify-center bg-[#e2e2e2] w-full benefit-parent">
        <div className="container-v-lrg w-[100%]">
          <div className="w-full flex justify-center">
            <div className="flex justify-between gap-2 py-5 w-[90%]  scroll-hide overflow-auto">
              {benefitsList?.map((info) => (
                <Link
                  key={info?.title}
                  href={info?.href}
                  className="text-[10px] text-center flex flex-col whitespace-nowrap justify-center gap-1 items-center hover:scale-110 transition-all cursor-pointer"
                >
                  <Image
                    className="w-full h-[38px] scale-110 object-contain"
                    src={info?.imageSrc}
                    alt={t(info?.title)}
                    height={38}
                    width={38}
                  />
                  <div className="flex flex-col space-y-1">
                    <h4 className="font-[500]">{t(info?.title)}</h4>
                    <p className="text-[12px] font-medium benefit-desc">
                      {t(info?.description)}
                      {info?.description2 ? (
                        <span>{t(info?.description2)}</span>
                      ) : null}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
