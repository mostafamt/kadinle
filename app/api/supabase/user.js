import { uploadReturnImage, uploadUserAvatar } from "../upload/upload";
import { supabase } from "./supabase.config";

// import { sendMailExpiredPoints } from "./PointsContext";

// get user info

export const getUserById = async (userId) => {
  if (!userId) return;
  const res = await supabase.from("user").select("id").eq("id", userId);
  return res;
};

export const getUserInfo = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAvatar = async (file) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profileImg = await uploadUserAvatar({ userId: user?.id, file });
  await supabase
    .from("user")
    .update({
      profile_img: profileImg?.url,
    })
    .eq("id", user?.id);
};

export const updateProfile = async ({
  first_name,
  last_name,
  line_one,
  line_two,
  city,
  postal_code,
  country,
  phone,
  email,
  hash_name,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { meta, metaError } = await supabase.auth.updateUser({
    data: {
      first_name,
      last_name,
    },
  });

  const res = await supabase
    .from("user")
    .update({
      first_name,
      last_name,
      phone,
      email,
      hash_name,
      line_one,
      line_two,
      city,
      postal_code,
      country,
    })
    .eq("id", user?.id);
  return res;
};

// get user data
export const getUserData = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userData = await supabase.from("user").select("*").eq("id", user?.id);
    return userData;
  } catch (error) {
  }
};

// liking a product
export const likeProduct = async (product_id) => {
  try {
    const user = await getUserInfo();
    const res = await supabase
      .from("user_like")
      .insert([{ user_id: user?.id, product_id: product_id }]);
  } catch (error) {
    console.log(error);
  }
};

// unliking a product
export const unlikeProduct = async (product_id) => {
  try {
    const user = await getUserInfo();
    const res = await supabase
      .from("user_like")
      .delete()
      .eq("user_id", user?.id)
      .eq("product_id", product_id);
  } catch (error) {
    console.log(error);
  }
};

// list user_like
export const listUser_like = async () => {
  try {
    const user = await getUserInfo();
    const res = supabase.rpc("get_products_liked_by_user", {
      param_id: user?.id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getFavoriteList = async () => {
  try {
    const user = await getUserInfo();
    const res = supabase.from("user_like").select("*").eq("user_id", user?.id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const listUser_likeOfProduct = async (product_id) => {
  try {
    const user = await getUserInfo();
    const res = supabase
      .from("user_like")
      .select("*")
      .eq("user_id", user?.id)
      .eq("product_id", product_id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
// add address
export const addAddress = async ({
  line_one,
  line_two,
  city,
  postal_code,
  country,
  title,
}) => {
  try {
    const user = await getUserInfo();
    const res = await supabase
      .from("address")
      .insert([
        {
          line_one,
          line_two,
          city,
          postal_code,
          country,
        },
      ])
      .select("id");
    const response = await supabase
      .from("user_address")
      .insert([
        { user_id: user?.id, address_id: res?.data?.[0]?.id, title: title },
      ]);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// delete address
export const deleteAddress = async (address_id) => {
  try {
    const { deleteUserAddress, deleteUserAddressError } = await supabase
      .from("user_address")
      .delete()
      .eq("address_id", address_id);
    const { deleteAddress, deleteAddressError } = await supabase
      .from("address")
      .delete()
      .eq("id", address_id);
  } catch (error) {
    console.log(error);
  }
};

// update address
export const updateAddress = async ({
  line_one,
  line_two,
  city,
  postal_code,
  country,
  title,
  id: address_id,
  user_address_id,
}) => {
  try {
    const user = await getUserInfo();
    const { data, error } = await supabase
      .from("address")
      .update({
        line_one,
        line_two,
        city,
        postal_code,
        country,
      })
      .eq("id", address_id);
    const res = await supabase
      .from("user_address")
      .update({ title: title })
      .eq("address_id", address_id)
      .eq("user_id", user?.id);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get user addresses
export const getUserAddresses = async () => {
  try {
    const user = await getUserInfo();
    const res = await supabase
      .from("user_address")
      .select("*")
      .eq("user_id", user?.id);
    const addressIds = res?.data?.map((address) => {
      return address.address_id;
    });
    const { data, error } = await supabase
      .from("address")
      .select(`*, country(id, name)`)
      .in("id", addressIds);

    const listOfAddress = res?.data?.map((address) => {
      return {
        ...address,
        ...data?.find(
          (currentAddress) => address.address_id === currentAddress?.id
        ),
        user_address_id: address?.id,
      };
    });
    console.log(
      "🚀 ~ file: UserContexts.js:262 ~ getUserAddresses ~ listOfAddress:",
      listOfAddress
    );
    return listOfAddress;
  } catch (error) {
    console.log(error);
  }
};

// set as default address
export const setDefaultAddress = async (user_address_id) => {
  try {
    const user = await getUserInfo();
    const res = await supabase
      .from("user")
      .update({
        default_address_id: user_address_id,
      })
      .eq("id", user?.id);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  // handel errors in future
};

//get address info
export const getAddressInfo = async (id) => {
  if (!id) return;
  const { data, error } = await supabase
    .from("address")
    .select("*")
    .eq("id", id);

  return data;
};

// add to user_cart
export const addToUser_cart = async (variant_id, quantity) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // check if the item exist
    const response = await supabase
      .from("user_cart")
      .select("*")
      .eq("variant_id", variant_id);
    if (response?.data?.length) {
      updateUser_cart(variant_id, quantity);
      return;
    } else {
      const res = await supabase
        .from("user_cart")
        .insert([
          { user_id: user?.id, variant_id: variant_id, quantity: quantity },
        ]);

      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

// delete from user_cart
export const deleteFromUser_cart = async (variant_id) => {
  if (!variant_id) return;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const res = await supabase
      .from("user_cart")
      .delete()
      .eq("user_id", user?.id)
      .eq("variant_id", variant_id);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// update user_cart
export const updateUser_cart = async (variant_id, quantity) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const res = await supabase
      .from("user_cart")
      .update({ quantity: quantity })
      .eq("user_id", user?.id)
      .eq("variant_id", variant_id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// list user orders
export const listUserOrders = async () => {
  try {
    const {
      data: { user },
    } = await supabase?.auth.getUser();
    let res = await supabase.rpc("get_orders_for_user", {
      param_id: user?.id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderStatus = async () => {
  try {
    let res = await supabase.from("order_status").select(`
      *,
      order_status_content(*)
    `);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// getCombine orders
export const getCombineOrders = async () => {
  try {
    const user = await getUserInfo();
    const response = await supabase
      .from("order")
      .select(
        `
    id, order_number,
    order_content(*, product_variant(product(id,price,barcode,product_content(id, name, language_id), product_image(image)))),
    order_status(*)
    `
      )
      .eq("user_id", user?.id);
    return response;
  } catch (error) {}
};

export const getReasons = async () => {
  try {
    const response = await supabase.from("return_reason_content").select("*");
    return response;
  } catch (error) {}
};

export const addRequestReturnOrder = async (
  {
    orderId: order_id,
    variantId: variant_id,
    return_reason_id,
    other_reason,
    return_status,
    files,
  },
  lang
) => {
  try {
    const user = await getUserInfo();

    const getImages = async () => {
      const images = [];
      for (const file of files) {
        let img = await uploadReturnImage({
          user_id: user?.id,
          order_id,
          variant_id,
          file,
        });
        if (img?.url) images.push(img?.url);
      }
      return images;
    };

    const images = await getImages();
    const response = await supabase.from("order_return_request").insert({
      variant_id,
      order_id,
      other_reason,
      return_reason_id,
      return_status,
      images,
      user_id: user?.id,
    });

    return response;
  } catch (error) {}
};

// get Return requests
export const getReturnRequests = async () => {
  try {
    const user = await getUserInfo();
    const response = await supabase
      .from("order_return_request")
      .select(
        `
      *,
      order(id, order_number),
      product_variant(product(product_sku,product_content(id, name, language_id))),
      return_status(*,return_status_content(*)),
      return_reason(*, return_reason_content(*))
    `
      )
      .eq("user_id", user?.id);
    return response;
  } catch (error) {}
};

export const cancelReturnRequest = async (requestId) => {
  const response = await supabase
    .from("order_return_request")
    .delete()
    .eq("id", requestId);
  return response;
};

// submit suggestion
export const submitSuggestion = async (suggestion) => {
  if (!suggestion) return;
  try {
    const user = await getUserInfo();
    const res = await supabase
      .from("user_suggestion")
      .select("status")
      .eq("user_id", user?.id);
    if (!res?.data?.length) {
      const data = await supabase.from("user_suggestion").insert({
        user_id: user?.id,
        suggestion,
      });
      return data;
    } else {
      return { error: 1 };
    }
  } catch (error) {
    console.log(error);
  }
};

// submit ticket
export const submitTicket = async (ticket) => {
  if (!ticket) return;
  try {
    const user = await getUserInfo();
    const res = await supabase
      .from("user_ticket")
      .select("status")
      .eq("user_id", user?.id);
    if (!res?.data?.length) {
      const data = supabase.from("user_ticket").insert({
        user_id: user?.id,
        ticket,
      });
      return data;
    } else {
      return { error: 1 };
    }
  } catch (error) {
    console.log(error);
  }
};

// invite a friend
export const inviteFriend = async (email) => {
  try {
    const user = await getUserInfo();
    if (email) {
      const response = await supabase.from("user_invite").insert({
        user_id: user?.id,
        email,
      });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

// list invited friends
export const ListInvited = async () => {
  try {
    const user = await getUserInfo();
    const response = await supabase
      .from("user_invite")
      .select("*")
      .eq("user_id", user?.id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const isUserInvited = async (email) => {
  const response = await supabase
    .from("user_invite")
    .select("*")
    .eq("email", email);
  return response;
};

// list user points
export const getUserPoints = async () => {
  try {
    const user = await getUserInfo();
    const response = await supabase
      .from("user_point")
      .select("*")
      .eq("user_id", user?.id);

    return response;
  } catch (error) {
    console.log(error);
  }
};

//list user wallet history
export const getUserWalletHistory = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const response = await supabase
      .from("user_wallet")
      .select(`*, user(id, first_name, last_name, profile_img,email)`)
      .eq("user_id", user?.id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// getStock count
export const getStockCount = async (variantId) => {
  if (!variantId) return;
  try {
    const res = await supabase
      .from("stock")
      .select("*")
      .eq("variant_id", variantId);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const discountPoints = async (points, lang) => {
  if (!points) return;
  try {
    const user = await getUserData();
    const pointCount = user?.data?.at(0)?.points;

    // await sendMailExpiredPoints(user?.id, lang, pointCount - points);

    const res = await supabase
      .from("user")
      .update({
        points: pointCount - points,
      })
      .eq("id", user?.id);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const buyByWallet = async (amount) => {
  const user = await getUserInfo();
  const response = await supabase
    .from("user_wallet")
    .insert({ amount: -amount, user_id: user?.id, status: "BILL" })
    .eq("user_id", user?.id);
  if (response?.error) return;

  await updateMoney(amount, user?.id, "decrease");
  if (!response?.error) {
    return true;
  } else return false;
};

export const addMoney = async (amount) => {
  const user = await getUserInfo();
  const response = await supabase
    .from("user_wallet")
    .insert({ amount, user_id: user?.id, status: "DEPOSIT" })
    .eq("user_id", user?.id);

  if (!response?.error) await updateMoney(amount, user?.id);
  return response;
};

export const sendMoney = async (amount, email) => {
  const user = await getUserInfo();
  const selectedUserResponse = await supabase
    .from("user")
    .select("id, email")
    .eq("email", email);
  const selectedUser = selectedUserResponse?.data?.[0];

  if (!selectedUser?.email) {
    return { error: `NO_EMAIL` };
  }

  const responseReceived = await supabase.from("user_wallet").insert({
    amount,
    user_id: selectedUser?.id,
    user_from: user?.id,
    status: "RECEIVED",
  });

  const responseSent = await supabase.from("user_wallet").insert({
    amount: -amount,
    user_id: user?.id,
    user_from: selectedUser?.id,
    status: "SENT",
  });

  if (!responseReceived?.error && !responseSent?.error) {
    await updateMoney(amount, selectedUser?.id);
    await updateMoney(amount, user?.id, "decrease");
  }

  return responseSent;
};

export const updateMoney = async (newAmount, userId, action = "increase") => {
  const response = await supabase
    .from("user")
    .select("wallet")
    .eq("id", userId);
  let amount = response?.data?.[0]?.wallet;
  let wallet = action === "increase" ? amount + newAmount : amount - newAmount;

  const responseUserWallet = await supabase
    .from("user")
    .update({ wallet })
    .eq("id", userId);
  return responseUserWallet;
};

export const checkIfEmailExist = async (email) => {
  const response = await supabase
    .from("user")
    .select("id,first_name, last_name, email, profile_img")
    .ilike("email", email);
  return response;
};

export const sendOrderReport = async (report) => {
  const response = await supabase.from("order_report").insert(report);
  return response;
};

export const subscribe = async (email) => {
  const res = await supabase
    .from("newsletter_subscription")
    .insert([{ email }]);

  return res;
};

export const getNotification = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) return;
    const res = await supabase
      .from("user_alert")
      .select("*")
      .eq("user_id", user?.id);
    return res;
  } catch (error) {}
};

export const updateNotificationStatus = async (id) => {
  const res = await supabase
    .from("user_alert")
    .update({ status: true })
    .eq("id", id);
  return res;
};

export const getUserCart = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let res = await supabase.rpc("get_cart_for_user", {
      param_id: user?.id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addNewSupplierRegistration = async (data) => {
  const res = await supabase.from("suppliers").insert(data);
  return res;
};

export const addUserChart = async (data) => {
  const res = await supabase
    .from("user_chart")
    .select("*")
    .eq("user_id", data?.user_id);
  const checkIfChartExist = res?.data?.find(
    (c) => c?.chart_id === data?.chart_id
  );

  if (checkIfChartExist) {
    const response = await supabase
      .from("user_chart")
      .update(data)
      .eq("id", checkIfChartExist?.id);
    return response;
  }
  
  const response = await supabase.from("user_chart").insert(data);
  return response;
};

export const getUserChart = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const response = await supabase
    .from("user_chart")
    .select("*")
    .eq("user_id", user?.id);
  return response;
};
