import { uploadCommentMedia } from "../upload/upload";
import { increasePointsByType } from "./points";
import { supabase } from "./supabase.config";
// get all product information
export const getProductInfo = async (param_id) => {
  let res = await supabase.rpc("get_product_info", {
    param_id,
  });
  return res;
};

// singlar product card
export const getProductCardById = async (param_id) => {
  const res = await supabase.rpc("get_product_card_by_id", {
    param_id,
  });
  return res;
};

// multiple details for category
export const getCategoryDetails = async (param_id) => {
  const res = await supabase.rpc("get_category_details", {
    param_id,
  });
  return res;
};
// multiple product cards for category
export const getProductByCategory = async (param_id) => {
  const res = await supabase.rpc("get_category_details", {
    param_id,
  });
  return res;
};
//get product size chart

// add comment
export const addComment = async ({ product_id, content, rating, media }) => {
  let shouldStop = false;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const checkIfHasCommentedBefore = await supabase
      .from("comment")
      .select("*")
      .eq("user_id", user?.id)
      .eq("product_id", product_id);
    if (checkIfHasCommentedBefore?.data?.length) return;

    const res = await supabase
      .from("comment")
      .insert({
        user_id: user?.id,
        product_id,
        content,
        rating,
      })
      .select("id");
    const commentId = res?.data?.[0]?.id;

    if (commentId && media) {
      await increasePointsByType("RATING", user?.id);
      for (const file of media) {
        const path = await uploadCommentMedia({
          userId: user?.id,
          commentId,
          file,
        });
        const response = await supabase
          .from("comment_media")
          .insert({ comment_id: commentId, url: path?.url });
        if (response?.error) {
          return { error: "Error adding comment or comment media" };
        } else {
          if (file?.type?.indexOf("video") === -1 && !shouldStop) {
            await increasePointsByType("UPLOAD_VIDEO", user?.id);
            shouldStop = true;
          }
        }
      }
      return { status: 200 };
    }
  } catch (error) {
    console.log(error);
  }
};

// get Category info
export const getCategoryInfo = async (categoryId) => {
  const res = await supabase
    .from("category_content")
    .select("*")
    .eq("category_id", categoryId);
  return res;
};

// handle apply coupon
export const applyCoupon = async (code) => {
  const res = await supabase.from("coupon").select("*").eq("code", code);
  if (res?.data?.length) {
    return res?.data?.[0];
  } else {
    return { error: "Invalid code" };
  }
};
// get All regions
export const getRegion = async () => {
  const res = await supabase.from("region").select("*");
  return res;
};

// getProductsByIds

export const getProductsByIds = async (productIds) => {
  const res = await supabase.from("product").select("*").in("id", productIds);
  return res?.data;
};
export const getProductsInfoByIds = async (productIds) => {
  const res = await supabase
    .from("product_content")
    .select("*")
    .in("product_id", productIds);
  return res?.data;
};

export const getProductsVariantsByIds = async (variantsIds) => {
  const res = await supabase
    .from("product_variant")
    .select("*")
    .in("id", variantsIds);
  return res?.data;
};

export const getProductChart = async (productId) => {
  const res = await supabase
    .from("chart_data")
    .select(
      `
      *,
      size(*,size_content(*))
    `
    )
    .eq("product_id", productId);
  const chartContent = await supabase
    .from("chart_content")
    .select("*")
    .eq("chart_id", res?.data?.[0]?.chart_id);
  return {
    data: res?.data,
    content: chartContent?.data,
  };
};

export const getSizes = async () => {
  const res = await supabase.from("size").select(`
  *,
  sizesContent:size_content(*)
  `);
  return res?.data;
};

export const getCountry = async (countryId) => {
  const res = await supabase.from("country").select("*").eq("id", countryId);
  return res;
};

export const getCoupons = async () => {
  const res = await supabase.from("coupon").select("*");
  return res;
};

export const incrementVideoViews = async (commentId, views) => {
  const res = await supabase
    .from("comment_media")
    .update({ views })
    .eq("comment_id", commentId);

  return res;
};
export const getWarehouseInformation = async ({ countryId, warehouseId }) => {
  const res = await supabase
    .from("warehouse_availability")
    .select(
      `*,
      shipping:shipping_price_id(*)
    `
    )
    .eq("warehouse_id", warehouseId)
    .eq("country_id", countryId);
  return res;
};

export const getShippingInformation = async ({ countryId, warehouseId }) => {
  const res = await supabase
    .from("warehouse_availability")
    .select(
      `*,
      shipping:shipping_price_id(*)
    `
    )
    .eq("country_id", countryId);
  return res;
};
export const getAllShippingInformation = async () => {
  const res = await supabase.from("warehouse_availability").select(
    `*,
      shipping:shipping_price_id(*),
      country(*)
    `
  );
  return res;
};

export const getWarehouseAddress = async (addressId) => {
  const res = await supabase
    .from("warehouse")
    .select("*")
    .eq("address_id", addressId);
  return res;
};

export const getChartNumbers = async (chartIds) => {
  const response = await supabase.from("chart").select("*").in("id", chartIds);
  return response;
};

export const getChartHeader = async (chartId) => {
  const response = await supabase
    .from("chart_content")
    .select("*")
    .eq("chart_id", chartId);
  return response;
};

export const getChart = async (param_sku) => {
  let res = await supabase.rpc("get_product_chart", {
    param_sku,
  });
  return res;
};

export const getChartContent = async (languageId) => {
  const response = await supabase
    .from("chart_content")
    .select("*")
    .eq("language_id", languageId);
  return response;
};

export const getSimilarProducts = async (param_sku, param_min, param_max) => {
  let res = await supabase.rpc("get_similar_products", {
    param_sku,
    param_min,
    param_max,
  });
  return res;
};

export const didUserBuy = async (variantIds) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return;

  const response = await supabase
    .from("order")
    .select(
      `
  *,
  order_content(variant_id)
  `
    )
    .eq("user_id", user?.id)
    .in("order_content.variant_id", variantIds);

  return response;
};

export const deleteUnknownVideos = async (videoId, videoUrl) => {
  const response = await supabase
    .from("product_image")
    .delete()
    .eq("id", videoId)
    .eq("image", videoUrl);
};

export const getBrands = async () => {
  const res = supabase.from("brand").select("*");
  return res;
};

export const getSeasons = async () => {
  const res = supabase.from("season").select("*, content:season_content(*)");
  return res;
};


export const getProductCategorySliders = async (
  param_limit,
  param_category_id
) => {
  const res = supabase.rpc("get_category_best_sections", {
    param_limit,
    param_category_id,
  });
  return res;
};
