import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

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

export const BenefitsDT = ({ t }) => {
  return (
    <div className="flex flex-col space-y-4 items-center mt-4">
      {/* <div className="flex flex-col space-y-1 justify-center md:justify-start text-center">
        <h2 className="text-xl md:text-2xl font-medium hover:text-primary cursor-pointer">
          {t("many_benefits")}
        </h2>
        <div className="bg-primary w-[20%] lg:w-[80px] h-[8px] rounded-xl"></div>
      </div> */}
      <div className="flex justify-center bg-[#e2e2e2] w-full">
        <div className="container-v-lrg w-[100%] px-4">
          <div className="w-full flex justify-center">
            <div className="flex lg:w-none lg:max-w-none lg:space-y-0 justify-center gap-4 lg:gap-6 py-6">
              {benefitsList?.map((info) => (
                <Link
                  key={info?.title}
                  href={info?.href}
                  className="flex flex-1 gap-4 lg:gap-3 items-center hover:scale-110 transition-all cursor-pointer"
                >
                  <Image
                    className=" w-[20%] max-w-[85px] lg:max-w-none lg:w-none"
                    src={info?.imageSrc}
                    alt={t(info?.title)}
                    height={90}
                    width={90}
                  />
                  <div className="flex flex-col space-y-1">
                    <h4 className="font-[500] text-[15px] lg:text-base">
                      {t(info?.title)}
                    </h4>
                    <p className="text-[12px] font-medium">
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
