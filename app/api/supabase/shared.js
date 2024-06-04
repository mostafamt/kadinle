import { supabase } from "./supabase.config";

export const dynamicFetch = async ({ table }) => {
  const response = await supabase.from(table).select("*");
  return response;
};

export const dynamicFetchById = async ({ table, columnKey, columnValue }) => {
  const response = await supabase
    .from(table)
    .select("*")
    .eq(columnKey, columnValue);
  return response;
};

export const getLanguages = async () => {
  let { data: language, error } = await supabase.from("language").select("*");
  return language;
};

export const getCountries = async () => {
  try {
    let res = await supabase.from("country").select(`*, currency(*)`);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

//list all Currencies
export const getCurrencies = async () => {
  let res = await supabase.from("currency").select("*");
  return res?.data;
};


// get news
export const getNews = async (language) => {
  const res = await supabase
    .from("news")
    .select(
      `
      *,
      news_content(*)
    `
    )
    .eq("news_content.language_id", language)
    .order("created_at", { ascending: true });
  return res;
};
