"use client";

import { increasePointsByType } from "@/app/api/supabase/points";
import { addReview, checkIfHadReviewed } from "@/app/api/supabase/reviews";
import { useGlobalOptions } from "@/app/context/GlobalOptionsContext";
import { useTranslations } from "next-intl";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Loading } from "../global/Loading";
import { ReviewCard } from "./ReviewCard";
import { StarIcon } from "../Icons/StarIcon";

export const StoreReviews = ({ storeReviews, loading }) => {
  const t = useTranslations();
  const { user } = useGlobalOptions();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const onAddReview = async (e) => {
    e.preventDefault();

    if (!user || !user?.id) {
      toast.error(t("only_user"));
      return;
    }

    const checkReviewed = await checkIfHadReviewed();
    if (checkReviewed) {
      toast.warning(t("had_review"));
      return;
    }

    if (!rating || !content) {
      toast.error(t("fields_error"));
      return;
    }

    const response = await addReview({
      rating,
      content,
      user_id: user?.id,
    });

    if (response?.error) toast.error(t("failed_review"));
    else {
      toast.success(t("success_review"));
      await increasePointsByType("STORE_RATING", user?.id);
      setRating(0);
      setContent("");
    }
  };

  return (
    <div className=" px-4">
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {storeReviews?.length ? (
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                {storeReviews?.map((review) => (
                  <ReviewCard review={review} key={review?.id} layout="store" />
                ))}
              </div>
            ) : (
              <p className="text-red-500 text-sm text-center mt-4">
                {t("no_results")}
              </p>
            )}
          </>
        )}
        <form
          onSubmit={onAddReview}
          className="flex flex-col gap-2 border-t pt-2 bg-gray-100 mt-4 p-4 shadow"
        >
          <h4 className="text-opink font-medium first-letter:capitalize">
            {t("add_review")}
          </h4>
          <div className="flex">
            {Array(5)
              .fill(0)
              ?.map((s, index) => (
                <button
                  className=""
                  onClick={() => setRating(index + 1)}
                  key={index}
                >
                  <StarIcon
                    className={`h-4 w-4 ${
                      index + 1 <= rating
                        ? "text-primary fill-primary"
                        : "text-black fill-black"
                    }`}
                  />
                </button>
              ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[90px] border border-gray-200 rounded-md p-2 mb-2"
          />
          <button className="p-2 rounded-md max-w-[200px] bg-opink text-white border border-transparent hover:border-opink hover:bg-transparent hover:text-opink">
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};
