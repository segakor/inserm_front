import { Reviews } from "./../type";

export const createDataTable = (reviews: Reviews[] | undefined) => {
  if (reviews?.length) {
    const data = reviews.map((item, index) => ({
      id: (index + 1).toString(),
      href: item.link,
      status: item.status,
      text: item.text,
      date: "",
    }));
    return data;
  }
  return [];
};
