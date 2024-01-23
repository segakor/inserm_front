import { CampaignTariff } from "../types";

export const getCountReviews = (
  formValue: any,
  campaignTariff: CampaignTariff[] | undefined
) => {
  let count = 0;
  let maxCount;
  let cards = [];

  function getMaxOfArray(numArray: number[]) {
    return Math.max.apply(null, numArray);
  }

  for (let key in formValue) {
    if (Array.isArray(formValue[key])) {
      cards.push(formValue[key]);
      maxCount = getMaxOfArray(formValue[key].map((item: any) => item?.amount));

      count += formValue[key]
        .map((item: any) => item?.amount || 0)
        .reduce((a: any, b: any) => a + b);
    }
  }

  const currentPrice = campaignTariff?.find((item) =>
    item.countRange.length === 2
      ? item.countRange[1] >= count
      : item.countRange[0]
  );

  const priceForOne = currentPrice?.price || 0;

  maxCount = cards
    .map((item) => item.map((item2: any) => item2?.amount))
    .flat()
    .sort((a, b) => b - a)[0];

  return {
    count,
    priceForOne,
    priceTotal: priceForOne * count,
    month: Math.ceil(maxCount / 2 / 4),
    cards: cards.flat(Infinity),
  };
};
