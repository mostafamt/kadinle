import { increasePointsByType } from "../supabase/points";

const messagesInfo = {
  /* in supabase templates  */ reset_password_msg: {
    messageName: "reset_password_msg",
    subject: "Reset your account password",
  },
  /* used */ signup_msg: {
    messageName: "signup_msg",
    subject: "Welcome to the Kadinle family",
  },
  /* used */ subscription_msg: {
    messageName: "subscription_msg",
    subject: "You have successfully subscribed to the Kadinle newsletter ✅",
  },
  /* used  */ suggestions_msg: {
    messageName: "suggestions_msg",
    subject: "Kadinle appreciates all your opinions and feedback",
  },
  /* used */ received_problem_msg: {
    messageName: "received_problem_msg",
    subject: "We apologize for the problem you encountered on the site",
  },
  /* Used */ using_points_msg: {
    messageName: "using_points_msg",
    subject:
      "Attention! Use your points balance and gifts before they expiry date",
  },
  /* Used */ leaving_store_msg: {
    messageName: "leaving_store_msg",
    subject: "Keep in touch",
  },

  /* Used */ order_product_information_msg: {
    messageName: "order_product_information_msg",
    subject:
      "Your order has been confirmed and is being processed, Kadinle is at your service",
  },
  /* Used */ send_suggestions_msg: {
    messageName: "send_suggestions_msg",
    subject: "Kadinle.. We appreciate your opinions views",
  },

  /* UN used */ received_order_msg: {
    messageName: "received_order_msg",
    subject: "We have successfully received your order🛍😍",
  },
  /*  visit our shop link */ payment_successfully_msg: {
    messageName: "payment_successfully_msg",
    subject: "payment_successfully_msg subject",
  },
  /*  no subscription yet */ join_family_msg: {
    messageName: "join_family_msg",
    subject: "Welcome to the Kadinle family",
  },
};

export const generateMail = async (messageType, userEmail, params) => {
  let message = messagesInfo?.[messageType];
  if (message?.messageName) {
    const response = await fetch(`https://kadinle.com/api/sender`, {
      // const response = await fetch(`http://localhost:4321/sender`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2ODgyNDUyMDAsCiAgICAiZXhwIjogMTg0NjA5ODAwMAp9.Zbwwgxvz9VZm0zUmI-PN-xn71S_LGJYOnow-CKqoPgI",
      },
      body: JSON.stringify({
        messageType,
        userEmail,
        params,
        subject: message?.subject,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to generate mail. Server responded with status ${response.status}`
      );
    } else {
    }
    return response.json();
  }
};

export const receivedMail = async ({ email, subject, message }) => {
  if (email && subject && message) {
    const response = await fetch(`https://kadinle.com/api/received`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        email,
        message,
        subject,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to generate mail. Server responded with status ${response.status}`
      );
    } else {
      await increasePointsByType("SHARING_SURVEY");
    }
    return response.json();
  }
};
