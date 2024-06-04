"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useMemo } from "react";

export const ProductStarReviews = ({ reviews }) => {
  const t = useTranslations();
  let reviewsCount = useMemo(() => {
    return reviews?.reduce((result, cur) => {
      return (result += cur?.rating);
    }, 0);
  }, [reviews]);

  let content = useMemo(() => {
    let rating = reviewsCount / reviews?.length;

    const fullStars = Math.floor(rating);
    let hasHalfStar = rating % 1 !== 0;

    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starIcons.push(
          <Image
            src="https://kadinle.com/media/images/full_star.png"
            alt="fill star"
            key={i}
            className="h-4 w-4 object-contain"
            height={16}
            width={16}
          />
        );
      } else if (hasHalfStar) {
        starIcons.push(
          <Image
            src="https://kadinle.com/media/images/half_star.png"
            key={fullStars}
            className="h-4 w-4 object-contain block rtl:rotate-[217deg]"
            alt="half star"
            height={16}
            width={16}
          />
        );
        hasHalfStar = null;
      } else {
        starIcons.push(
          <Image
            alt="outline star"
            src="https://kadinle.com/media/images/outlien_star.png"
            key={fullStars}
            className="h-4 w-4 object-contain"
            height={16}
            width={16}
          />
        );
      }
    }

    return starIcons;
  }, [reviewsCount, reviews?.length]);
  return (
    <div className="flex gap-1 items-center text-xs text-gray-400">
      {reviews?.length ? (
        <>
          {content} ({reviews?.length})
        </>
      ) : (
        <p>(0) {t("reviews")}</p>
      )}
    </div>
  );
};
