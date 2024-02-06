import { AxiosError } from "axios";
import { getCampaign } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { setClientCampaign, setIsLoadingProject } from "../context/action";
import { useDispatch, useLocalState } from "../context/hooks";

export const useGetCampaign = () => {
  const dispatch = useDispatch();

  const state = useLocalState();

  const {
    filterProject: { isActive },
  } = state;
  

  const handleGetCampaign = async () => {
    try {
      dispatch(setIsLoadingProject(true));
      const response = await getCampaign(isActive, undefined, undefined);
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
    } finally {
      dispatch(setIsLoadingProject(false));
    }
  };

  return { handleGetCampaign };
};
