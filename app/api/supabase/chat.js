import { _supabase, supabase } from "./supabase.config";

export const getChatMessages = async (roomId) => {
  const res = await supabase
    .from("chat")
    .select("*")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  return res;
};

export const insertMessage = async (data) => {
  await _supabase.from("chat").insert(data);
  await _supabase
    .from("room")
    .update({ last_updated: new Date() })
    .eq("id", data?.room_id);
};
export const getRoomByUserId = async (userId) => {
  const response = await supabase
    .from("room")
    .select("*")
    .eq("user_id", userId);

  return response;
};

export const createRoom = async (userId) => {
  const response = await supabase
    .from("room")
    .insert({
      user_id: userId,
      status: true,
    })
    .select("id");

  return response;
};

export const getChatSettings = async () =>
  await supabase.from("chat_settings").select("*");
