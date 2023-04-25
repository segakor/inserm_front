import { Client } from "../types";

export const getAmountAutoPay = (allClient: Client[]) => {
  const arr: boolean[] = [];
  allClient.forEach((item) => {
    item.projects.forEach((item) => {
      arr.push(item.autopay);
    });
  });
  return {
    active: arr.filter((item) => item === true).length,
    notActive: arr.filter((item) => item === false).length,
  };
};
