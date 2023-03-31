import { updateBrief } from "../../request";
import { ReqCreateBrief } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useUpdateBrief = () => {

  const handleUpdateBrief = async (value: ReqCreateBrief) => {
    try {
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
    }
  };

  return {
    handleUpdateBrief
  };
};
