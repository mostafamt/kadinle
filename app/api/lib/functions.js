import Link from "next/link";
import React from "react";

// const setLanguageHandler = () => {
//   const localStorageLang =
//     typeof window === "object" && localStorage.getItem("kadinle_lang");
//   if (localStorageLang) {
//     const lang1 = JSON.parse(localStorageLang);
//     setLanguage(lang1);
//   } else {
//     setLanguage(DEFAULT_LANGUAGE);
//   }
// };
// const setCurrencyHandler = () => {
//   const localStorageCurrency =
//     typeof window === "object" && localStorage.getItem("kadinle_currency");
//   if (localStorageCurrency) {
//     const currency1 = JSON.parse(localStorageCurrency);
//     setCurrency(currency1);
//   } else {
//     setCurrency(DEFAULT_CURRENCY);
//   }
// };

export function getClosestWeight(productWeight, availableWeights) {
  let closestWeight = availableWeights[0];
  let minDifference = Math.abs(productWeight - closestWeight);

  availableWeights.forEach((weight) => {
    const difference = Math.abs(productWeight - weight);
    if (difference < minDifference) {
      minDifference = difference;
      closestWeight = weight;
    }
  });

  return closestWeight;
}

export const getFormatPrice = (price, currency, ignore) => {
  let code = "";
  switch (currency?.currency?.code) {
    case "USD":
      code = "$";
      break;
    case "TRY":
      code = "TL";
      break;
    case "EUR":
      code = "€";
      break;
    default:
      code = currency?.currency?.code;
  }
  let calculatePrice = ignore
    ? price
    : (price * currency?.currency?.rate).toFixed(2);
  return `${calculatePrice} ${code}`;
};

export const calculateDeliveryTime = (order) => {
  let createdAt = new Date(order?.orderDetails?.created_at).getDate();
  let shippingDateFrom = new Date(
    order?.orderDetails?.shipping_date_from
  ).getDate();
  let shippingDateTo = new Date(
    order?.orderDetails?.shipping_date_to
  ).getDate();
  return `${shippingDateFrom - createdAt} - ${shippingDateTo - createdAt}`;
};

export function replaceTextWithTag(text, targetText, Tag, tagProps, newText) {
  const parts = text.split(targetText);
  const replacedText = parts.map((part, index) => {
    if (index !== parts.length - 1) {
      return (
        <React.Fragment key={index}>
          {part}
          <Tag {...tagProps}>{newText}</Tag>
        </React.Fragment>
      );
    }
    return part;
  });
  return replacedText;
}

export function replaceTextWithLink(text, targetText, newText, to) {
  const parts = text.split(targetText);
  const replacedText = parts.map((part, index) => {
    if (index !== parts.length - 1) {
      return (
        <React.Fragment key={index}>
          {part}
          <Link className="text-primary underline" href={to}>
            {newText}
          </Link>
        </React.Fragment>
      );
    }
    return part;
  });
  return replacedText;
}

export function replaceManyWordsWithLink(text, replacements) {
  let replacedText = [text];

  replacements.forEach(({ targetText, newText, to }) => {
    const newReplacedText = [];

    replacedText.forEach((part) => {
      if (typeof part === "string") {
        const parts = part.split(targetText);
        parts.forEach((innerPart, index) => {
          newReplacedText.push(innerPart);
          if (index !== parts.length - 1) {
            newReplacedText.push(
              <Link className="text-primary underline" href={to} key={index}>
                {newText}
              </Link>
            );
          }
        });
      } else {
        newReplacedText.push(part);
      }
    });

    replacedText = newReplacedText;
  });

  return <>{replacedText}</>;
}

export function getMonthCount(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startYear = start.getFullYear();
  const startMonth = start.getMonth();

  const endYear = end.getFullYear();
  const endMonth = end.getMonth();

  return (endYear - startYear) * 12 + (endMonth - startMonth);
}
