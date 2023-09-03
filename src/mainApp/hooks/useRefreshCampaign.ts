import { refreshCampaign } from "../../request";
import { goToAinoxPageCampaign, openNotificationWithIcon } from "../../utils";
import { useLocalState } from "../context/hooks";

export const useRefreshCampaign = () => {
  const state = useLocalState();
  const { personInfo } = state;

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

  return {
    handleRefresh,
  };
};
