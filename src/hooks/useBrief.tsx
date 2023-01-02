import { useEffect, useState } from "react";
import { getBrief } from "../request";
import { ReqGetBrief } from "../type";
import { openNotificationWithIcon } from "../utils/notification";

export const useBrief = (id: string) => {
  const handleGetBrief = async () => {
    try {
      const response = await getBrief(id);
      console.log(response);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить бриф клиента",
      });
    }
  };

  return { handleGetBrief };
};
