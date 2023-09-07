import { refreshCampaign, removeCampaign } from "../../request";
import { goToAinoxPageCampaign, openNotificationWithIcon } from "../../utils";
import { useLocalState } from "../context/hooks";
import { useGetCampaign } from "./useGetCampaign";

export const useEditCampaign = () => {
  const state = useLocalState();
  const { personInfo } = state;
  const { handleGetCampaign } = useGetCampaign();

  const handleRefresh = async (campaignId: number) => {
    try {
      const res = await refreshCampaign(campaignId);

      goToAinoxPageCampaign({
        email: personInfo?.email || "",
        projectName: res.data.result.name,
        price: res.data.result.price,
        isRecurent: false,
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось обновить проект",
      });
    }
  };

  const handleRemove = async (campaignId: number) => {
    try {
      await removeCampaign(campaignId);
      await handleGetCampaign();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Проект удален",
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось удалить проект",
      });
    }
  };

  return {
    handleRefresh,
    handleRemove,
  };
};
