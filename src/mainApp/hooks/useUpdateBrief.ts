import { useState } from "react";
import { updateBrief } from "../../request";
import { ReqCreateBrief } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useUpdateBrief = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateBrief = async (value: ReqCreateBrief) => {
    try {
      setIsLoading(true);
      await updateBrief(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Бриф сохранен",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось обновить бриф",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdateBrief,
    isLoading,
  };
};
