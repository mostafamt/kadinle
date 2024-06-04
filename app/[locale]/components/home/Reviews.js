"use client";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import { SectionTitle } from "../global/SectionTitle";
import Image from "next/image";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import SliderNavigationBtn from "../global/SliderNavigationBtn";
import { TestimonialCard } from "../cards/TestimonialCard";

const circle2 = "https://kadinle.com/media/images/circle2.png";
const Curve = "https://kadinle.com/media/images/curve.svg";

export const Reviews = ({ reviews, sectionSettings }) => {
  const t = useTranslations();
  const { language } = useGlobalOptions();
  const [forward, setForward] = useState(true);
  const [target, setTarget] = useState(0);
  const [intervalFunc, setIntervalFunc] = useState(null);
  const reviewNumber = reviews?.length - 1;

  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTarget((prev) => {
        if (prev === 0) {
          setForward(true);
          return prev + 1;
        } else if (prev >= reviewNumber) {
          setForward(false);
          return prev - 1;
        } else {
          return forward ? prev + 1 : prev - 1;
        }
      });
    }, 3000);
    setIntervalFunc(interval);
    return () => clearInterval(interval);
  }, [target, reviews?.length]);

  useEffect(() => {
    const percent =
      target === 0 ? 33.333 : target === 1 ? 0 : (target - 1) * -33.333;
    sliderRef.current.style.transform = `translateX(${percent}%)`;
  }, [target]);

  const decreaseSlideHandler = () => {
    setTarget((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  };

  const increaseSlideHandler = () => {
    setTarget((prev) => {
      if (prev >= reviewNumber) return 0;
      return prev + 1;
    });
  };

  const cardClickHandler = (index, product_sku) => {
    setTarget(index);
    clearInterval(intervalFunc);
  };

  return (
    <div
      style={{
        order: sectionSettings?.section_order,
        display: !sectionSettings?.display_home && "none !important",
      }}
      id="reviews"
      className="h-[740px] overflow-hidden relative w-full mt-[75px] flex flex-col items-center"
    >
      <SectionTitle title={t("Customers_Reviews")} />
      <div className={`absolute block w-full  mt-[50px] lg:mt-[4%]`}>
        <Image
          src={Curve}
          alt="curve"
          className="object-cover h-full w-full"
          height={400}
          width={1900}
        />
      </div>
      <div className="hidden xl:block absolute bottom-[25%] ltr:right-0 rtl:left-0 translate-x-1/2">
        <Image
          className="w-[150px]"
          src={circle2}
          alt="circle"
          height={180}
          width={159}
        />
      </div>

      <div className="relative top-10 flex justify-center items-center container-lrg w-[100%] crousel-sec">
        {reviews?.length > 5 && (
          <SliderNavigationBtn
            onClick={
              language?.code?.toLowerCase() === "ar"
                ? increaseSlideHandler
                : decreaseSlideHandler
            }
          />
        )}
        <div className="w-full flex relative overflow-y-visible px-4 mt-24 overflow-x-clip max-w-5xl mx-auto">
          <div
            className="flex transition-all duration-1000 translate-x-[33.333%] direction-ltr w-full"
            ref={sliderRef}
            style={{ maxWidth: `${100}%` }}
          >
            {" "}
            {reviews?.map((review, index) => {
              return (
                <div
                  key={index}
                  onClick={() => cardClickHandler(index)}
                  className="w-1/3 relative"
                >
                  <div
                    className={`cursor-pointer w-1/3 min-w-[400px] relative text-black min-h-[290px] duration-300 transition-transform ${
                      target === index &&
                      "z-50 -translate-y-16 -mx-10 rounded-xl min-w-[420px]"
                    } `}
                  >
                    <TestimonialCard
                      review={review}
                      small={target !== index ? true : false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {reviews?.length > 5 && (
          <SliderNavigationBtn
            onClick={
              language?.code?.toLowerCase() === "ar"
                ? decreaseSlideHandler
                : increaseSlideHandler
            }
            rotate
          />
        )}
      </div>

      <div className="flex justify-center items-center gap-2 z-50 absolute bottom-[4%] direction-ltr">
        {reviews?.map((review, index) => (
          <div
            key={index}
            onClick={(e) => setTarget(index)}
            className={
              target === index
                ? "h-3 w-[40px] bg-opink rounded-xl cursor-pointer"
                : "h-3 w-3 bg-primary-gray rounded-xl cursor-pointer"
            }
          ></div>
        ))}
      </div>
    </div>
  );
};
