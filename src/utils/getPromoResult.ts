import { promoCodeResult } from "../constants";

export const getPromoResult = (resultCode: string) => {
  if (resultCode.indexOf("not_enough_reviews_in_the_order") >= 0) {
    const result = promoCodeResult.find(
      (item) => item.code === "not_enough_reviews_in_the_order"
    );

    return {
      type: result?.type,
      message: result?.message.replace(
        "min",
        resultCode.slice(resultCode.indexOf("-") + 1)
      ),
    };
  }
  const result = promoCodeResult.find((item) => item.code === resultCode);

  return {
    type: result?.type,
    message: result?.message,
  };
};
