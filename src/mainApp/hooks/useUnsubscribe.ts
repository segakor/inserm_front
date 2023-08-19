import { unsubdcribe, unsubdcribeCampaign } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useGetCampaign } from "./useGetCampaign";
import { useGetProject } from "./useGetProject";

export const useUnsubscribe = () => {
  const { handleGetClientProject } = useGetProject();
  const { handleGetCampaign } = useGetCampaign();

  const handleUnsubscribe = async (id: number, type: string) => {
    return new Promise((resolve, reject) => {
      type === "project"
        ? unsubdcribe({ projectId: id })
        : unsubdcribeCampaign({ campaignId: id })
            .then(() => {
              handleGetClientProject();
              handleGetCampaign();
              resolve(true);
            })
            .catch(() => {
              openNotificationWithIcon({
                type: "error",
                message: "",
                description: `Не удалось отменить подписку`,
              });
              reject();
            });
    });
  };

  return {
    handleUnsubscribe,
  };
};
