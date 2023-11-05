export const numWord = (value: number, words: string[]) => {
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