"use client";
import React, { useEffect, useState, useRef } from "react";
import { getHomeSliders } from "@/app/api/supabase/home";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const HomeSwiper = () => {
  const [data, setData] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchSliders = async () => {
      const sliders = await getHomeSliders();
      setData(sliders?.data || []);
    };

    fetchSliders();
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      console.log("Swiper instance:", swiperRef.current.swiper);
    }
  }, [swiperRef]);

  return (
    <div className="h-[199px] md:h-[400px]">
      <Swiper
        ref={swiperRef}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.image}>
            <Image
              className="w-fit full-screen"
              src={item.web_image}
              alt={item.description}
              width={1200}
              height={500}
              style={{ width: "100%" }}
            />
            <Image
              className="w-fit mob-screen"
              src={item.mobile_image}
              alt={item.description}
              width={500}
              height={200}
              style={{ width: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
