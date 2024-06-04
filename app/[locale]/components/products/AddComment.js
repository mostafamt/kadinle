"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "../Icons/StarIcon";
import { didUserBuy, addComment } from "./../../../api/supabase/products";
import { PlusIcon } from "../Icons/PlusIcon";

const add = "https://kadinle.com/media/images/add.svg";

const AddComment = ({ variants, setRefresh, productId }) => {
  const t = useTranslations();
  const [error, setError] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [files, setFiles] = useState("");
  const [media, setMedia] = useState("");
  const [rating, setRating] = useState(5);
  const [allowComment, setAllowComment] = useState(false);

  const isAllowToComment = async () => {
    const response = await didUserBuy(variants?.map((variant) => variant?.id));
    setAllowComment(response);
  };
  useEffect(() => {
    if (!variants) return;

    isAllowToComment();
  }, [variants]);

  const uploadFiles = (e) => {
    let media = [];
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
            media.push({ type: "video", src: video?.src });
          } else {
            toast.error(t("upload_comment_media_error1"));
          }
        } else {
          toast.error(t("upload_comment_media_error2"));
        }
      } else {
        if (file?.size > maxSizeInBytes) {
          toast.error(t("upload_comment_media_error3"));
        } else {
          media.push({ type: "image", src: URL.createObjectURL(file) });
        }
      }
    }
    setFiles(media);
  };
  const submitComment = () => {
    addComment({
      product_id: productId,
      content: commentContent,
      media,
      rating,
    }).then((res) => {
      if (res?.error) {
        setError(res?.error);
      } else {
        setError("");
        setRefresh((p) => !p);
      }
    });
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col gap-2 mb-4 max-w-[500px]">
        <p className="text-[11px] p-4 rounded-md bg-white text-yellow-600">
          {t("terms_videos_msg12")}
          <Link
            className="mx-[3px] text-yellow-400 underline"
            href="/terms-video"
          >
            {t("terms_videos_msg13")}
          </Link>{" "}
        </p>
        <p className="text-[10px] p-4 rounded-md bg-white text-red-500">
          {t("terms_videos_msg14")}
        </p>
      </div>

      {files?.length ? (
        <div className="flex items-center gap-2 my-4">
          {files?.map((file) => {
            if (file?.type === "video") {
              return (
                <video
                  key={file?.src}
                  src={file?.src}
                  alt="comment media"
                  className="h-10 w-10 rounded-md "
                />
              );
            } else {
              return (
                <Image
                  key={file?.src}
                  src={file?.src}
                  alt="comment media"
                  className="h-10 w-10 rounded-md "
                  height={40}
                  width={40}
                />
              );
            }
          })}
        </div>
      ) : null}
      {error ? (
        <p className="my-4 text-center bg-red-200 text-red-500 text-sm p-1">
          {error}
        </p>
      ) : null}
      {allowComment ? (
        <div className="relative mt-2 mb-1">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="text-[10px] bg-[#F5F6F8] p-2 w-full border border-primary rounded-lg h-[90px] "
            placeholder={t("addReview")}
          />
          <div className="z-10 absolute bottom-4 ltr:left-2 rtl:right-2 w-[20px] h-[20px] ">
            <input
              type="file"
              onChange={uploadFiles}
              multiple
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              className="absolute opacity-0 top-0 ltr:left-0 rtl:right-0 w-full h-full z-40"
            />
            <Image className="" src={add} alt="upload images" />
            <button>
              <PlusIcon className="" />
            </button>
          </div>
          <div className="absolute flex items-end  gap-3 bottom-4 ltr:right-2 rtl:left-2">
            <div className="flex">
              {Array(5)
                .fill(0)
                ?.map((s, index) => (
                  <button
                    className=""
                    key={index}
                    onClick={() => setRating(index + 1)}
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
            <button
              onClick={submitComment}
              className="bg-primary px-[12px] h-[15px] rounded-full text-[10px] text-owhite"
            >
              {t("SEND")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddComment;
