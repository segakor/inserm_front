export const getRangeDate = (start: number, end: number) => {
  var options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
  } as const;

  return `${new Date(start * 1000).toLocaleString("ru", options)}-${new Date(
    end * 1000
  ).toLocaleString("ru", options)}`;
};
