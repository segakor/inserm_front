import { AxiosError } from "axios";
import { getCampaign } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { setClientCampaign } from "../context/action";
import { useDispatch } from "../context/hooks";

export const useGetCampaign = () => {
  const dispatch = useDispatch();

  const handleGetCampaign = async () => {

    try {
      const response = await getCampaign(false);
      const campaignArray = response.data.result.map((item) => ({
        ...item,
        type: "campaign",
      }));
      dispatch(setClientCampaign(campaignArray));
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить проекты",
        status: typedError.status,
      });
    }
  };

  return { handleGetCampaign };
};
