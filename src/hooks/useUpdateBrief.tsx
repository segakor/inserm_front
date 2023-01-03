import { updateBrief } from "../request";
import { ReqCreateBrief } from "../type";
import { openNotificationWithIcon } from "../utils/notification";

export const useUpdateBrief = () => {

  const handleUpdateBrief = async (value: ReqCreateBrief) => {
    try {
      await updateBrief(value);
      openNotificationWithIcon({
        type: "success",
        message: "Успех",
        description: "Бриф сохранен",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось обновить бриф",
      });
    }
  };

  return {
    handleUpdateBrief
  };
};
