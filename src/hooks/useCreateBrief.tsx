import { createBrief } from "../request";
import { ReqCreateBrief } from "../type";
import { openNotificationWithIcon } from "../utils/notification";

export const useCreateBrief = () => {

  const handleCreateBrief = async (value: ReqCreateBrief) => {
    try {
      await createBrief(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Бриф сохранен",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось сохранить бриф",
      });
    }
  };

  return {
    handleCreateBrief
  };
};
