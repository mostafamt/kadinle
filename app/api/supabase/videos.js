import { supabase } from "./supabase.config";

export const getSingleReal = async (param_id) => {
  const res = await supabase.rpc("single_showreel", {
    param_id,
  });
  return res;
};
export const getRealsList = async (param_id) => {
  const res = await supabase.rpc("showreel_list", {
    param_id,
  });
  return res;
};
export const getOurVideosList = async (param_id) => {
  const res = await supabase.rpc("ourvideos_list", {
    param_id,
  });
  return res;
};
export const getCustomerVideosList = async (param_id) => {
  const res = await supabase.rpc("customervideos_list", {
    param_id,
  });
  return res;
};

export const incrementView = async (id, type = "product") => {
  const endpoint =
    type === "product" ? "updateProductViews" : "updateCommentViews";
  const response = await fetch(`https://kadinle.com/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    body: JSON.stringify({
      id,
    }),
  });
};

export const addLike = async (reelId, userId) => {
  const res = await supabase
    .from("showreel_like")
    .insert({
      user_id: userId,
      showreel_id: reelId,
    })
    .select("id");
  return res;
};

export const addMediaLike = async (reelId, userId) => {
  const res = await supabase
    .from("comment_media_like")
    .insert({
      user_id: userId,
      comment_media_like: reelId,
    })
    .select("id");
  return res;
};

export const addProductLike = async (reelId, userId) => {
  const res = await supabase
    .from("product_media_like")
    .insert({
      user_id: userId,
      product_media_id: reelId,
    })
    .select("id");
  return res;
};
