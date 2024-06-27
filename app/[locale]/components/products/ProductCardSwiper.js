"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { getProductInfo } from "@/app/api/supabase/products";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const ProductCardSwiper = ({ item }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProductInfo(item?.sku);
      const data = products?.data;
      setImages(data[0]?.productimages || []);
      console.log("data.productimages", data[0]?.productimages);
    };

    fetchData();
  }, [item]);

  return (
    <div className="w-full h-[150px] lg:h-[250px]">
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              className="w-full h-[140px] lg:h-[250px]"
              src={image.image}
              alt=""
              width={150}
              height={100}
              style={{
                width: "100%",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCardSwiper;
