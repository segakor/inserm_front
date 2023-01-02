import { getBrief } from "../request";
import { openNotificationWithIcon } from "../utils/notification";

export const useSendBrief = () => {

  const handeSendBrief = async (projectId: string, brief: string) => {
    try {
      console.log(projectId, brief)
      const response = await getBrief(projectId);
      console.log(response.data);
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
