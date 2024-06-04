"use client";
import { addComment, didUserBuy } from "@/app/api/supabase/products";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OneReview from "./OneReview";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "../Icons/StarIcon";

const ProductReviewsFull = ({ variants, product_id, reviews, setRefresh }) => {
  const t = useTranslations();
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [media, setMedia] = useState("");
  const [allowComment, setAllowComment] = useState(false);
  const [maxCommentsView, setMaxCommentsView] = useState(5);

  const isAllowToComment = async () => {
    const response = await didUserBuy(variants?.map((variant) => variant?.id));
    setAllowComment(response);
  };

  useEffect(() => {
    if (!variants) return;

    isAllowToComment();
  }, [variants]);

  const uploadFiles = (e) => {
    let mediaBlob = [];
    const maxSizeInBytes = 5 * 1024 * 1024;
    setMedia(Array.from(e.target.files));
    for (let file of [...e.target.files]) {
      if (file?.type?.indexOf("video") !== -1) {
        if (file?.type === "video/mp4") {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.src = URL.createObjectURL(file);
          video.onloadedmetadata = () => {
            URL.revokeObjectURL(video.src);
          };
          if (video?.duration <= 15) {
            mediaBlob.push({ type: "video", src: video?.src });
          } else {
            toast.error(t("video_error_1"));
          }
        } else {
          toast.error(t("video_error_2"));
        }
      } else {
        if (file?.size > maxSizeInBytes) {
          toast.error(t("video_error_3"));
        } else {
          mediaBlob.push({ type: "image", src: URL.createObjectURL(file) });
        }
      }
    }
    setFiles(mediaBlob);
  };

  const submitComment = () => {
    addComment({ product_id, content, media, rating }).then((res) => {
      if (res?.error) {
        setError(res?.error);
      } else {
        setError("");
        setRefresh((p) => !p);
      }
    });
  };

  return (
    <div className="flex flex-col mt-6 mb-[16px]">
      <p className="font-[700] text-[28px]  mb-4">
        {t("Customer_reviews_and_comments")}
      </p>
      <div className="flex flex-col space-y-3">
        {reviews?.length ? (
          <>
            {reviews?.map((review) => (
              <OneReview review={review} key={review?.id} />
            ))}
            {reviews.length > maxCommentsView ? (
              <button onClick={() => setMaxCommentsView((prev) => prev + 15)}>
                {t("more")}
              </button>
            ) : null}
          </>
        ) : (
          <p className="text-sm px-6 py-2 text-gray-400 -mt-2 mb-4">
            {t("empty_comments")}
          </p>
        )}
      </div>

      {allowComment ? (
        <div className="flex flex-col mt-5 ">
          <h3 className="font-bold text-[18px] mb-2">{t("add_comment")}</h3>
          {/* video terms alert */}

          <div className=" flex flex-col gap-2 mb-4 max-w-[500px]">
            <p className="text-sm p-4 rounded-md bg-white text-yellow-600">
              {t("terms_videos_msg12")}
              <Link
                className="mx-[3px] text-yellow-400 underline"
                href="/terms-video"
              >
                {t("terms_videos_msg13")}
              </Link>{" "}
            </p>
            <p className="text-xs p-4 rounded-md bg-white text-red-500">
              {t("terms_videos_msg14")}
            </p>
          </div>

          {/* video terms alert */}

          <div className="flex gap-1 mb-2">
            {Array(5)
              .fill(0)
              ?.map((s, index) => (
                <button key={index} onClick={() => setRating(index + 1)}>
                  <StarIcon
                    className={`h-5 w-5 ${
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
            className=" p-2 resize-none border-[2px] w-[500px] h-[160px] mt-1 border-[#AEAEAE] outline-none"
          />
          <div className="relative max-w-[500px] border mt-4 bg-gray-200 border-[#AEAEAE] outline-none p-4 flex items-center justify-center">
            <label>{t("Upload_Images")}</label>
            <input
              type="file"
              onChange={uploadFiles}
              multiple
              className="absolute top-0 left-0 h-full w-full z-10 opacity-0"
            />
          </div>
          {files?.length ? (
            <div className="flex items-center gap-2 my-4">
              {files?.map((file) => {
                if (file.type === "video") {
                  return (
                    <video
                      key={file?.src}
                      src={file?.src}
                      alt="comment media"
                      className="h-16 w-16 rounded-md "
                    />
                  );
                } else {
                  return (
                    <Image
                      key={file?.src}
                      src={file?.src}
                      alt="comment media"
                      className="h-16 w-16 rounded-md "
                    />
                  );
                }
              })}
            </div>
          ) : null}
          {error ? (
            <p className="my-4 text-center bg-red-200 text-red-500 p-1">
              {error}
            </p>
          ) : null}
          <button
            onClick={submitComment}
            className="bg-opink w-[100px] mt-3 mb-4 text-[18px] flex items-center justify-center rounded-full text-owhite py-[10px] hover:bg-owhite hover:text-opink border border-owhite hover:border-opink"
          >
            {t("SEND")}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductReviewsFull;
