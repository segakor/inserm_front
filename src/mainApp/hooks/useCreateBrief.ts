import { createBrief } from "../../request";
import { ReqCreateBrief } from "../../type";
import { openNotificationWithIcon } from "../../utils/notification";
import { useGetProject } from "./useGetProject";

export const useCreateBrief = () => {
  const { handleGetClientProject } = useGetProject();

  const handleCreateBrief = async (value: ReqCreateBrief) => {
    try {
      await createBrief(value);
      await handleGetClientProject();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Бриф сохранен",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось сохранить бриф",
      });
    }
  };

  return {
    handleCreateBrief,
  };
};
