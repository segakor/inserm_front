import { unsubdcribe } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";

export const useUnsubscribe = () => {
  const handleUnsubscribe = async (value: { projectId: number }) => {
    try {
      await unsubdcribe(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось отменить подписку",
      });
    }
  };

  return {
    handleUnsubscribe,
  };
};
