import { Client, ClientNew } from "../types";

export const getAmountAutoPay = (allClient: Client[] | ClientNew[]) => {
  const arr: boolean[] = [];
  allClient.forEach((item) => {
    item.projects?.forEach((item) => {
      arr.push(item.autopay);
    });
  });
  allClient.forEach((item) => {
    item.campaigns?.forEach((item) => {
      arr.push(item.autopay);
    });
  });
  return {
    active: arr.filter((item) => item === true).length,
    notActive: arr.filter((item) => item === false).length,
  };
};
