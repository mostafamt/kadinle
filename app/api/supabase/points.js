import { generateMail } from "../emails/sender";
import { POINTS_STATUS, POINTS_TYPE } from "../static/constants";
import { supabase } from "./supabase.config";
import { getUserData, getUserInfo } from "./user";

export const increasePoints = async (value, userId, status) => {
  const response = await supabase.from("user_point").insert(value);
  if (!response?.error) {
    updatePoints(value?.user_id || userId, value?.point, status);
  }
};

export const increasePointsByType = async (type, userId, points) => {
  try {
    const pointType = POINTS_TYPE?.[type];
    const user = getUserInfo();
    const query = {
      user_id: user?.id || userId,
      point_numeric: pointType?.numeric,
      point: points && type === "SPENT_MONEY" ? points : pointType?.point_count,
    };
    const response = await supabase.from("user_point").insert(query);

    if (!response?.error) {
      updatePoints(
        user?.id || userId,
        points && type === "SPENT_MONEY" ? points : pointType?.point_count
      );
    }
  } catch (error) {
    console.log(error);
  }
};
const updatePoints = async (userId, newPoints, status) => {
  const response = await supabase
    .from("user")
    .select("points")
    .eq("id", userId);
  let points = response?.data?.[0]?.points;
  await supabase
    .from("user")
    .update({ points: status === "RESET" ? points + newPoints : 0 })
    .eq("id", userId);
};

export const checkIfEmailHasSubscribe = async () => {
  const user = await getUserInfo();
  const response = await supabase
    .from("user_point")
    .select("*")
    .eq("user_id", user?.id)
    .eq("point_numeric", POINTS_TYPE?.SUBSCRIPTION?.numeric);

  if (response?.data?.length) return true;
  else return false;
};

export const checkIfTheInvitedTimesReachEnd = async (userId) => {
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const response = await supabase
    .from("user_point")
    .select()
    .range("created_at", startOfMonth, endOfMonth)
    .eq("user_id", userId)
    .eq("point_numeric", POINTS_TYPE.INVITE.numeric);

  return response;
};

const hashUserId = {};
export const registrationPoints = async (userId) => {
  if (!userId) return;
  if (hashUserId?.[userId]) return;
  hashUserId[userId] = userId;

  const userPoints = await supabase
    .from("user_point")
    .select("*")
    .eq("user_id", userId)
    .eq("point_numeric", POINTS_TYPE.SIGNUP.numeric);

  if (!userPoints?.data?.length) increasePointsByType("SIGNUP", userId);
};

export const resetPoints = async (userId) => {
  if (!userId) return;

  const userResponse = await getUserData();
  const user = userResponse?.data?.at(0);

  const currentDate = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
  const startDate = threeMonthsAgo.toISOString();

  const responsePoints = await supabase
    .from("user_point")
    .select("*")
    .gt("created_at", startDate)
    .eq("user_id", userId)
    .limit(50)
    .order("created_at", { ascending: false });

  const checkExpired = responsePoints?.data?.find(
    (point) => point?.status === POINTS_STATUS?.[3]
  );

  let expiredPoint = {
    point: -user?.points,
    status: POINTS_STATUS?.[3],
    user_id: userId,
    point_numeric: 0,
  };

  if (
    !checkExpired &&
    Date.parse(user?.created_at) < Date.parse(threeMonthsAgo)
  ) {
    increasePoints(expiredPoint, userId, "RESET");
  } else {
    if (Date.parse(user?.created_at) < Date.parse(threeMonthsAgo)) {
      increasePoints(expiredPoint, userId, "RESET");
    }
  }
};

export const sendMailExpiredPoints = async (userId, lang, pointsCount) => {
  if (!userId) return;

  const userResponse = await getUserData();
  const user = userResponse?.data?.at(0);

  const currentDate = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
  const startDate = threeMonthsAgo.toISOString();

  const responsePoints = await supabase
    .from("user_point")
    .select("*")
    .gt("created_at", startDate)
    .eq("user_id", userId)
    .limit(50)
    .order("created_at", { ascending: false });

  const checkExpired = responsePoints?.data?.find(
    (point) => point?.status === POINTS_STATUS?.[3]
  );

  const currentDate2 = new Date(checkExpired?.created_at);
  const nextThreeMonths = new Date();
  nextThreeMonths.setMonth(currentDate2.getMonth() + 3);
  const endDate = nextThreeMonths.toLocaleDateString("en-US");

  await generateMail("using_points_msg", user?.email, {
    lang,
    your_points: pointsCount,
    expire_day: endDate,
    customer_name: `${user?.first_name} ${
      user?.last_name ? user?.last_name : ""
    }`,
  });
};

export const loggedInTimes = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return;
  const today = new Date().toISOString().split("T")[0];
  const response = await supabase
    .from("user_point")
    .select("*")
    .eq("point_numeric", POINTS_TYPE?.DAILY_LOGIN?.numeric)
    .gte("created_at", `${today}T00:00:00Z`) // Compare with the start of the current day
    .lte("created_at", `${today}T23:59:59Z`); // Compare with the end of the current day
  // .eq("created_at", new Date().toLocaleDateString("en-Uk"))
  if (response?.data?.length) return;
  increasePointsByType("DAILY_LOGIN", user?.id);
};

export const onShareProductPoints = async () => {
  const user = await supabase.auth.getUser();
  if (!user?.id) return;
  const today = new Date().toISOString().split("T")[0];
  const response = await supabase
    .from("user_point")
    .select("*")
    .eq("point_numeric", POINTS_TYPE?.SHARE_PRODUCT?.numeric)
    .gte("created_at", `${today}T00:00:00Z`)
    .lte("created_at", `${today}T23:59:59Z`);
  if (response?.data?.length > 5) return;
  increasePointsByType("SHARE_PRODUCT", user?.id);
};
