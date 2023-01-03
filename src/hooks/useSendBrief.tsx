import { getBrief } from "../request";
import { openNotificationWithIcon } from "../utils/notification";

export const useSendBrief = () => {

  const handeSendBrief = async (projectId: string, brief: string) => {
    try {
      await getBrief(projectId);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось сохранить бриф",
      });
    }
  };

  return {
    handeSendBrief
  };
};
