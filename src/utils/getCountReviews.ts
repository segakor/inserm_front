export const getCountReviews = (formValue: any) => {
  let count = 0;
  let price = 600;
  let maxCount = 0;

  function getMaxOfArray(numArray: number[]) {
    return Math.max.apply(null, numArray);
  }

  for (let key in formValue) {
    if (Array.isArray(formValue[key])) {
      /* console.log(formValue[key]) */
      maxCount = getMaxOfArray(formValue[key].map((item: any) => item?.amount));

      count += formValue[key]
        .map((item: any) => item?.amount)
        .reduce((a: any, b: any) => a + b);
    }
  }
  if (count > 24) {
    price = 550;
    /* return; */
  }
  if (count > 49) {
    price = 519;
    /* return; */
  }
  if (count > 199) {
    price = 499;
    /* return; */
  }
  if (count >= 200) {
    price = 479;
    /*  return; */
  }

  return {
    count,
    price,
    month: Math.ceil(maxCount / 2 / 4),
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
