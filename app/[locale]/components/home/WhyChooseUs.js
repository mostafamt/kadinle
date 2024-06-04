import Image from "next/image";
import Link from "next/link";

const whyList = [
  {
    title: "Safe_Payments",
    description: "Safe_Payments_msg",
    imageSrc: "https://kadinle.com/media/images/safePayment.svg",
    href: "safe-payments",
  },
  {
    title: "Money_Back_Gurantee",
    description: "Money_Back_Gurantee_msg",
    imageSrc: "https://kadinle.com/media/images/moneyBack.svg",
    href: "money-back",
  },
  {
    title: "fast_shipping",
    description: "fast_shipping_msg",
    imageSrc: "https://kadinle.com/media/images/fastShipping.svg",
    href: "fast-shipping",
  },
  {
    title: "Best_Quality",
    description: "why_Best_Quality_description",
    imageSrc: "https://kadinle.com/media/images/bestQuality.svg",
    href: "best-quality",
  },
];
export const WhyChooseUs = ({ t }) => {
  return (
    <div className={` flex justify-center items-center mt-[40px] mb-8 whychoose-parent`}>
      <div className="flex flex-col space-y-4 items-center container w-[100%]">
        <div className="flex flex-col space-y-1 justify-center md:justify-start">
          <p className="text-xl md:text-2xl font-medium text-sec ">{t("why_us_msg")}</p>
          <div className="bg-primary w-[80px] h-[8px] rounded-xl "></div>
        </div>
        <div className="flex justify-start lg:space-y-0  gap-4 lg:gap-10 sm:p-0 whychoose">
          {whyList?.map((info) => (
            <Link
              key={info?.title}
              href={info?.href}
              className={`relative group transition-all flex flex-col w-1/4 lg:max-w-none space-y-3 border-2 border-primary border-dashed items-center justify-start xl:justify-center px-2  lg:px-5 py-2 rounded-2xl cursor-pointer`}
            >
              <div
                className={`absolute bottom-0 h-0 group-hover:h-full  ltr:right-0 rtl:left-0 rounded-2xl transition-all duration-[300ms] w-full 
                
               bg-primary`}
              ></div>
              <Image
                className=" z-[100] h-[50px] lg:h-[80px]"
                src={info?.imageSrc}
                width={100}
                height={100}
              />
              <p className="z-[100]  group-hover:text-white font-medium text-[16px] lg:text-lg text-center">
                {t(info?.title)}
              </p>
              <p
                className={`z-[100] group-hover:text-white
                // active === 1 ? "text-white" : "text-tgray"
               transition-all text-center text-[13px] lg:text-[15px] md:text-md leading-[20px] lg:leading-7`}
              >
                {t(info?.description)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
