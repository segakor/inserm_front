import { Reviews } from "./../type";
import { getDate } from "./getDate";

export const createDataTable = (reviews: Reviews[] | undefined) => {
  if (reviews?.length) {
    const data = reviews.map((item, index) => ({
      id: (index + 1).toString(),
      href: item.link,
      status: item.status,
      text: item.text,
      date: getDate({ date: item.date }),
      key: index
    }));
    return data;
  }
  return [];
};

export const createDataTableWithKey = (reviews: Reviews[] | undefined) => {
  if (reviews?.length) {
    const data = reviews.map((item, index) => ({
      ...item,
      key: (index + 1).toString(),
      date: typeof (item.date) === 'number' ? getDate({ date: item.date }) : item.date,
    }));
    return data;
  }
  return [];
};

