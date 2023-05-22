export const getCountReviews = (formValue: any) => {
  let count = 0;
  let priceForOne = 600;
  let maxCount = 0;
  let cards = [];

  function getMaxOfArray(numArray: number[]) {
    return Math.max.apply(null, numArray);
  }

  for (let key in formValue) {
    if (Array.isArray(formValue[key])) {
      cards.push(formValue[key]);
      maxCount = getMaxOfArray(formValue[key].map((item: any) => item?.amount));

      count += formValue[key]
        .map((item: any) => item?.amount)
        .reduce((a: any, b: any) => a + b);
    }
  }
  if (count > 24) {
    priceForOne = 550;
  }
  if (count > 49) {
    priceForOne = 519;
  }
  if (count > 199) {
    priceForOne = 499;
  }
  if (count >= 200) {
    priceForOne = 479;
  }

  return {
    count,
    priceForOne: 10,
    priceTotal: /* priceForOne * count */10,
    month: Math.ceil(maxCount / 2 / 4),
    cards: cards.flat(Infinity),
  };
};

const numWord = (value: number, words: string[]) => {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

export const getNumWord = (count: number, type: "review" | "month") => {
  if (type === "review") return numWord(count, ["отзыв", "отзыва", "отзывов"]);
  if (type === "month") return numWord(count, ["месяц", "месяца", "месяцев"]);
  return null;
};
