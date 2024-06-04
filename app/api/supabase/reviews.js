import { supabase } from "./supabase.config";

export const addReview = async (data) => {
  const response = await supabase
    .from("home_reviews")
    .insert(data)
    .select("id");
  return response;
};

export const getStoreReviews = async (param_min, param_max) => {
  const response = await supabase.rpc(`get_home_reviews`, {
    param_min,
    param_max,
  });
  return response;
};

export const checkIfHadReviewed = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const response = await supabase
    .from("home_reviews")
    .select("user_id")
    .eq("user_id", user?.id);
  return response?.data?.length;
};
