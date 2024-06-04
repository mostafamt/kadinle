import { supabase } from "./supabase.config";

export const getHomeData = async (param_limit) => {
  const res = await supabase.rpc("get_home_data", {
    param_limit,
  });
  return res;
};

export const getHomeSections = async (param_limit) => {
  const res = await supabase.rpc("get_home_sections", {
    param_limit,
  });
  return res;
};

export const getHomeSectionSorted = async () => {
  const response = await supabase.from("home_sections").select("*");
  return response;
};

export const getHomeCategory = async () => {
  const categories = await supabase
    .from("category")
    .select(`*, content:category_content(*)`)
    .is("parent_id", null);
  const categoriesWithoutKidsCategory = categories?.data?.filter(
    (cat) => cat.id !== "8a8aeced-c461-4281-9875-3f0367a4675d"
  );
  return categoriesWithoutKidsCategory;
};

export const getCategories = async () => {
  const categories = await supabase
    .from("category")
    .select(`*, content:category_content(*)`);
  // .is("parent_id", null);
  const categoriesWithoutKidsCategory = categories?.data?.filter(
    (cat) => cat.id !== "8a8aeced-c461-4281-9875-3f0367a4675d"
  );
  return categoriesWithoutKidsCategory;
};

export const getOfferedProduct = async () => {
  const res = await supabase.from("sale").select("*");
  const data = res?.data?.[0];
  const date = new Date(data?.end_date);
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  return {
    date: {
      day,
      hours,
      minutes,
      seconds,
      data,
    },
  };
};

export const getFlashProducts = async () => {
  const response = await supabase.from("sale").select("product_id");
  return response?.data;
};

export const getCustomersReviews = async () => {
  const res = await supabase
    .from("home_reviews")
    .select(`*, user(id, first_name, last_name, profile_img, hash_name)`);
  return res;
};

export const getHistoryProducts = async (param_ids, param_min, param_max) => {
  let res = await supabase.rpc("get_category_products", {
    param_ids,
    param_min,
    param_max,
  });
  return res;
};

export const getSaleDetails = async () => {
  let res = await supabase.rpc("get_sale_details");
  return res;
};
export const getBrandDetails = async (brandId) => {
  let res = await supabase.rpc("get_brand_details", {
    param_id: brandId,
  });
  return res;
};
export const getCollectionDetails = async (collectionId) => {
  let res = await supabase.rpc("get_collection_details", {
    param_id: collectionId,
  });
  return res;
};
export const getLatestProductsDetails = async (limit) => {
  let res = await supabase.rpc("get_latest_products", {
    param_limit: limit,
  });
  return res;
};
export const getBestSellingDetails = async (limit) => {
  let res = await supabase.rpc("get_bestselling_details", {
    param_limit: limit,
  });
  return res;
};
export const getSearchResults = async (key) => {
  let res = await supabase.rpc("get_search", {
    param_search: key,
  });
  return res;
};
export const getProductsLessThan = async (param_limit) => {
  let res = await supabase.rpc("get_less_than", {
    param_limit,
  });
  return res;
};

export const getOfferDetails = async (param_id) => {
  const res = await supabase.rpc("get_offer_details", {
    param_id,
  });
  return res;
};


export const getOffers = async () =>
  await supabase.from("offer").select(`*, offer_content(*)`);
