import React from "react";

import { IinquireAvailabilityScreen } from "@/app/[locale]/components/chat/IinquireAvailabilityScreen";
import { ShippingOrderScreen } from "@/app/[locale]/components/chat/ShippingOrderScreen";
import Image from "next/image";

function getCountryName() {
  const localStorageCurrency =
    typeof window === "object" && localStorage.getItem("kadinle_currency");
  if (localStorageCurrency) {
    const country = JSON.parse(localStorageCurrency);
    return country?.name;
  }
}
export const chat = {
  intro_screen: {
    messages: {
      text: "intro_text",
      text1: "intro_text_1",
      text2: "intro_text_2",
    },
    actions: [
      { role: "button", name: "help_screen", screen_link: "help_screen" },
    ],
    allowBack: false,
  },
  help_screen: {
    list: [
      { name: "list_text_1", screen_link: "store_usage_screen" },
      { name: "list_text_2", screen_link: "kadinle_products_screen" },
      { name: "list_text_3", screen_link: "buy_product_screen" },
      { name: "list_text_4", screen_link: "best_offers_screen" },
      // { name: "list_text_5", screen_link: "store_benefits_screen" },
      // { name: "list_text_6", screen_link: "contact_customer_support_screen" },
    ],
    allowHelp: false,
  },
  store_usage_screen: {
    list: [
      {
        name: "store_usage_screen_1",
        screen_link: "registration_login_screen",
      },
      {
        name: "store_usage_screen_2",
        screen_link: "account_information_screen",
      },
      { name: "store_usage_screen_3", screen_link: "purchase_order_screen" },
      {
        name: "store_usage_screen_4",
        link:
          getCountryName()?.indexOf("turkey") !== -1
            ? "/shipping/turkey"
            : "/shipping/international",
      }, // { name: "store_usage_screen_4", screen_link: "store_policy_screen" },
      // {
      //   name: "store_usage_screen_5",
      //   screen_link: "contact_customer_support_screen",
      // },
    ],
    allowHelp: false,
  },
  kadinle_products_screen: {
    list: [
      {
        name: "Kadinle_Products_screen_1",
        link: "/about",
        // screen_link: "about_kadinle_screen",
      },
      {
        name: "Kadinle_Products_screen_2",
        screen_link: "varieties_products_screen",
      },
      {
        name: "Kadinle_Products_screen_3",
        screen_link: "warranty_policy_screen",
      },
      {
        name: "Kadinle_Products_screen_4",
        screen_link: "chose_the_best_screen",
      },
      // { name: "list_text_6", screen_link: "contact_customer_support_screen" },
    ],
  },
  buy_product_screen: {
    list: [
      { name: "buy_product_screen_1", screen_link: "payment_methods_screen" },
      { name: "buy_product_screen_2", screen_link: "product_prices_screen" },
      { name: "buy_product_screen_3", screen_link: "products_material_screen" },
      { name: "buy_product_screen_4", screen_link: "shipping_order_screen" },
      { name: "buy_product_screen_5", screen_link: "exchange_return_screen" },
      {
        name: "buy_product_screen_6",
        screen_link: "sizes_measurements_screen",
      },
    ],
  },
  best_offers_screen: {
    list: [
      { name: "best_offers_screen_1", screen_link: "discount_coupons_msg" },
      { name: "best_offers_screen_2", screen_link: "kadinle_points_screen" },
      { name: "best_offers_screen_3", screen_link: "send_gift_screen" },
      { name: "best_offers_screen_4", screen_link: "gift_vouchers_screen" },
      { name: "best_offers_screen_5", screen_link: "free_shipping_screen" },
    ],
  },

  // Discount_coupons_screen
  discount_coupons_msg: {
    messages: {
      title: "discount_coupons_title",
      text: "discount_coupons_msg",
    },
    actions: [
      {
        role: "button",
        name: "best_offers_screen_2",
        screen_link: "kadinle_points_screen",
      },
    ],
  },
  // kadinle_points_screen
  kadinle_points_screen: {
    messages: {
      text: "kadinle_points_msg",
    },
    actions: [{ name: "best_offers_screen_2", path: "/points" }],
  },
  // send_gift_screen
  send_gift_screen: {
    messages: {
      title: "send_gift_text1",
      text: "send_gift_screen_msg",
      // marker: "send_gift_screen_msg1",
      // text1: "send_gift_screen_msg2",
    },
    actions: [{ name: "sendGift", path: "/send-gift" }],
  },
  // gift_vouchers_screen
  gift_vouchers_screen: {
    messages: {
      title: "gift_vouchers_title",
      text: "gift_vouchers_msg",
    },
    actions: [{ name: "giftVoucher", path: "/send-gift" }],
  },
  // free_shipping_screen
  free_shipping_screen: {
    messages: {
      text: "free_shipping_msg",
      // text1: "free_shipping_msg1",
      // list: ["free_shipping_list_item_1", "free_shipping_list_item_2"],
      link2: {
        name: "Free_Shipping",
        path:
          getCountryName()?.indexOf("turkey") !== -1
            ? "/free-shipping-turkey"
            : "/shipping/free/international",
      },
    },
  },
  // store_benefits_screen
  // store_benefits_screen: {
  //   list: [
  //     { name: "store_benefits_screen_1", screen_link: "wholesale_screen" },
  //     { name: "store_benefits_screen_2", screen_link: "" },
  //     { name: "store_benefits_screen_3", screen_link: "" },
  //     { name: "store_benefits_screen_4", screen_link: "" },
  //   ],
  // },

  // wholesale_screen: {
  //   messages: {
  //     list: [
  //       "wholesale_msg",
  //       "wholesale_msg1",
  //       "wholesale_msg2",
  //       "wholesale_msg3",
  //       "wholesale_msg4",
  //       "wholesale_msg5",
  //       "wholesale_msg6",
  //       "wholesale_msg7",
  //       "wholesale_msg8",
  //       "wholesale_msg9",
  //       "wholesale_msg10",
  //     ],
  //   },
  // },

  // nested screens
  // registration_login screen
  registration_login_screen: {
    messages: {
      text: "registration_login_msg",
    },
    actions: [
      { name: "registration_login_link_1", path: "/login" },
      { name: "registration_login_link_2", path: "/signup" },
    ],
  },
  // account_information screen
  account_information_screen: {
    messages: {
      text: "account_information_msg",
    },
    actions: [
      { name: "account_information_link_1", path: "/profile" },
      { name: "account_information_link_2", path: "/terms" },
    ],
  },
  // purchase_order screen
  purchase_order_screen: {
    messages: {
      text: "purchase_order_msg",
    },
    actions: [
      { name: "purchase_link_1", path: "/categories" },
      {
        role: "button",
        name: "purchase_link_2",
        screen_link: "purchase_order_list_screen",
      },
    ],
  },
  purchase_order_list_screen: {
    messages: {
      title: "store_usage_screen_3",
      list: [
        "purchase_list_item_1",
        "purchase_list_item_2",
        "purchase_list_item_3",
        "purchase_list_item_4",
        "purchase_list_item_5",
        "purchase_list_item_6",
      ],
    },
  },
  store_policy_screen: {
    messages: {
      text: "store_policy_msg",
    },
    actions: [
      { name: "store_policy_link_2", path: "/return" },
      { name: "store_policy_link_1", path: "/shipping-policy-turkey" },
      { name: "store_policy_link_3", path: "/shipping/turkey" },
    ],
  },
  // contact_customer_support_screen: {
  //   messages: {
  //     text: "contact_customer_support_msg",
  //     fields: [
  //       {
  //         name: "",
  //         type: "",
  //         placeholder: "contact_customer_support_input_placeholder",
  //       },
  //     ],
  //   },
  // },

  about_kadinle_screen: {
    messages: {
      title: "about_kadinle_title",
      text: "about_kadinle_msg",
      text1: "about_kadinle_msg1",
    },
  },
  varieties_products_screen: {
    messages: {
      text: "varieties_products_msg",
      text1: "varieties_products_msg1",
    },
    actions: [
      { name: "varieties_products_link_1", path: "/howtobuy" },
      { name: "varieties_products_link_2", path: "/categories" },
    ],
  },
  warranty_policy_screen: {
    messages: {
      text: "warranty_policy_msg",
    },
    actions: [{ name: "warranty_policy_link_1", path: "/moneyback" }],
  },
  chose_the_best_screen: {
    messages: {
      text: "support_description",
    },
    icon: {
      img: (
        <Image
          src={"https://kadinle.com/media/images/Customer.svg"}
          className="mx-auto block w-fit my-1 cursor-pointer scale-[200%]"
          alt="support icon"
          height={30}
          width={30}
        />
      ),
      path: "",
      // target: 3,
    },
  },

  //
  payment_methods_screen: {
    messages: {
      text: "payment_methods_msg",
      text1: "payment_methods_msg1",
    },
  },
  product_prices_screen: {
    messages: {
      text: "product_prices_msg",
      text1: "product_prices_msg1",
    },
  },
  // products_material_screen
  products_material_screen: {
    messages: {
      text: "products_material_msg",
      text1: "products_material_msg1",
    },
  },
  shipping_order_screen: {
    type: "manual",
    component: (props) => <ShippingOrderScreen {...props} />,
  },
  exchange_return_screen: {
    messages: {
      title: "exchange_return_msg",
      text: "",
      // text3: "exchange_return_msg6",
      text4: "exchange_return_msg8",
      link1: { name: "exchange_return_msg5", path: "/return" },
      link2: { name: "warranty_policy_link_1", path: "/moneyback" },
      list: [
        "exchange_return_msg1",
        "exchange_return_msg2",
        // "exchange_return_msg3",
        "exchange_return_msg4",
      ],
    },
    // component: ,
  },
  sizes_measurements_screen: {
    list: [
      {
        name: "sizes_measurements_screen_1",
        screen_link: "inquire_availability_screen",
      },
      {
        name: "sizes_measurements_screen_2",
        screen_link: "girls_sizes_screen",
      },
      { name: "sizes_measurements_screen_3", screen_link: "plus_sizes_screen" },
      // { name: 'sizes_measurements_screen_4', screen_link: 'Measurements_sizes_screen' },
      // { name: 'sizes_measurements_screen_5', screen_link: 'measurement_manual_screen' },
    ],
  },
  // nested screens level 2
  // inquire_availability_screen
  inquire_availability_screen: {
    type: "manual",
    component: (props) => <IinquireAvailabilityScreen {...props} />,
  },
  //girls_sizes_screen
  girls_sizes_screen: {
    messages: {
      title: "girls_sizes_title",
      text: "girls_sizes_msg",
      text1: "girls_sizes_msg1",
    },
  },
  // plus_sizes_screen
  plus_sizes_screen: {
    messages: {
      title: "plus_sizes_title",
      text: "plus_sizes_msg",
      text1: "plus_sizes_msg1",
    },
  },
  // Measurements_sizes_screen
  // measurement_manual_screen
};
