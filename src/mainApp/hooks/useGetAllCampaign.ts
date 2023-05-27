import { AxiosError } from "axios";
import { getCampaign } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { Campaign } from "../../types";

export const useGetAllCampaign = () => {
  const [allCampaign, setAllCampaign] = useState<Campaign[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCampaign = async () => {
    try {
      setIsLoading(true);
      const response = await getCampaign();
      const campaignArray = response.data.result.map((item) => ({
        ...item,
        type: "campaign",
      }));
      setAllCampaign(campaignArray);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить проекты",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCampaign();
  }, []);

  return { allCampaign, isLoading };
};
