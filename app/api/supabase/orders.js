import { supabase } from "./supabase.config";

export const getCartItems = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const res = await supabase
      .from("user_cart")
      .select("*")
      .eq("user_id", user?.id);

    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addNewOrder = async (
  bill,
  price,
  discount,
  coupon_id,
  shipping_adress,
  warehouse_from,
  shipping_type,
  shipping_date,
  shipping_cost
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const res = await supabase
    .from("order")
    .insert([
      {
        user_id: user?.id,
        price,
        discount,
        coupon_id,
        shipping_adress,
        warehouse_from,
        shipping_type,
        shipping_date,
      },
    ])
    .select("*");
  if (res?.error) return res;

  const orderId = res?.data?.[0]?.id;
  const order_number = res?.data?.[0]?.order_number;
  const cartResponse = await getCartItems();

  let items = [];

  for (const item of cartResponse?.data) {
    items.push({
      order_id: orderId,
      quantity: item?.quantity,
      variant_id: item?.variant_id,
    });
  }
  await updateStock(cartResponse?.data, shipping_adress);

  const orderContent = await supabase.from("order_content").insert([...items]);

  if (!orderContent?.error) {
    const orderBill = {
      bill,
      total: price,
      shipping_cost,
      order_id: orderId,
      user_id: user?.id,
    };
    await supabase.from("bill").insert(orderBill);
    const res = await supabase
      .from("user_cart")
      .delete()
      .eq("user_id", user?.id);
    if (!res?.error) {
      return { order_id: orderId, order_number };
    } else {
      return res;
    }
  }
};

export const getOrderBill = async (orderId) => {
  const response = await supabase
    .from("bill")
    .select(`*`)
    .eq("order_id", orderId);
  return response;
};

export const getBillReports = async (userId) => {
  const response = await supabase
    .from("bill_report")
    .select(`*, bill(*)`)
    .eq("user_id", userId);
  return response;
};

export const getOrderReports = async (userId) => {
  const response = await supabase
    .from("order_report")
    .select(`*, order(id, order_number,price)`)
    .eq("user_id", userId);
  return response;
};

// export const updateStock = async (cart, shippingAddress) => {
//   let variantIds = cart?.data?.map?.((item) => item?.variant_id);

//   const response = await supabase
//     .from("user_address")
//     .select(`*, address(id,country(id, name))`)
//     .eq("id", shippingAddress);
//   const responseData = response?.data?.at(0);

//   let country = responseData?.address?.country;

//   const availableWarehouse = await supabase
//     .from("warehouse")
//     .select("id")
//     .eq("name", country?.name);

//   const availableWarehouseId = availableWarehouse?.data?.at(0)?.id;

//   const availableStockResponse = await supabase
//     .from("stock")
//     .select("*")
//     .eq("warehouse_id", availableWarehouseId)
//     .in("variant_id", variantIds);

//   if (availableStockResponse?.data?.length === variantIds?.length) {
//     for (const item of availableStockResponse?.data) {
//       await supabase
//         .from("stock")
//         .update({ stock: item?.stock - 1 })
//         .eq("id", item?.id);
//     }
//   } else {
//     let turkey = "f9f217d8-6e4b-4027-a8d6-7871d2fbeb15";
//     const mainStockResponse = await supabase
//       .from("stock")
//       .select("*")
//       .eq("warehouse_id", turkey)
//       .in("variant_id", variantIds);
//     for (const item of mainStockResponse?.data) {
//       await supabase
//         .from("stock")
//         .update({ stock: item?.stock - 1 })
//         .eq("id", item?.id);
//     }
//   }
// };
export const updateStock = async (cart, shippingAddress) => {
  const response = await supabase
    .from("user_address")
    .select(`*, address(id,country(id, name))`)
    .eq("id", shippingAddress);
  const responseData = response?.data?.at(0);

  let country = responseData?.address?.country;

  const currentWarehouse = await supabase
    .from("warehouse")
    .select("id")
    .eq("name", country?.name);

  const currentWarehouseId = currentWarehouse?.data?.at(0)?.id;

  for (const variant of cart?.data) {
    const availableStockResponse = await supabase
      .from("stock")
      .select("*")
      .eq("warehouse_id", currentWarehouseId)
      .eq("variant_id", variant?.id);

    const availableStock = availableStockResponse?.data;

    if (availableStock?.id) {
      await supabase
        .from("stock")
        .update({ stock: availableStock?.stock - variant?.quantity })
        .eq("id", availableStock?.id);
    } else {
      let turkey = "f9f217d8-6e4b-4027-a8d6-7871d2fbeb15";

      const mainStockResponse = await supabase
        .from("stock")
        .select("*")
        .eq("warehouse_id", turkey)
        .eq("variant_id", variant?.id);

      await supabase
        .from("stock")
        .update({ stock: mainStockResponse?.stock - variant?.quantity })
        .eq("id", mainStockResponse?.id);
    }
  }
};

export const getWarehouseOfCartItems = async (variant_ids) => {
  const res = await supabase
    .from("product_variant")
    .select(`*, stock(*,warehouse(id, name))`)
    .in("id", variant_ids);
  return res;
};

export const addBillReport = async (data) => {
  const res = await supabase.from("bill_report").insert(data);
  return res;
};

export const getStocksByVariantIds = async (variant_ids) => {
  const res = await supabase
    .from("stock")
    .select("*")
    .in("variant_id", variant_ids);
  return res;
};
