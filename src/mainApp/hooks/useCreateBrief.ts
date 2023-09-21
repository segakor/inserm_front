import { useState } from "react";
import { createBrief } from "../../request";
import { ReqCreateBrief } from "../../types";
import { openNotificationWithIcon } from "../../utils";
import { useGetProject } from "./useGetProject";
import { useGetCampaign } from "./useGetCampaign";

export const useCreateBrief = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleGetClientProject } = useGetProject();
  const { handleGetCampaign } = useGetCampaign();

  const handleCreateBrief = async (value: ReqCreateBrief) => {
    try {
      setIsLoading(true);
      await createBrief(value);
      await handleGetClientProject();
      await handleGetCampaign();
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateBrief,
    isLoading,
  };
};
