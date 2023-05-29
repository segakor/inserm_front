import { unsubdcribe } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useGetProject } from "./useGetProject";

export const useUnsubscribe = () => {
  const { handleGetClientProject } = useGetProject();

  const handleUnsubscribe = async (value: { projectId: number }) => {
    try {
      await unsubdcribe(value);
      await handleGetClientProject();
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
