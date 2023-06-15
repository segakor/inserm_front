import { AxiosError } from "axios";
import { getCampaignTariff } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useState, useEffect } from "react";
import { CampaignTariff } from "../../types";

export const useGetCampaignTariff = () => {
  const [campaignTariff, setCampaignTariff] = useState<
    CampaignTariff[] | undefined
  >();

  const [isLoading, setIsLoading] = useState(false);

  const handleGetCampaignTariff = async () => {
    try {
      setIsLoading(true);
      const response = await getCampaignTariff();
      setCampaignTariff(response.data.result);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить тарифы",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCampaignTariff();
  }, []);

  return { campaignTariff, isLoading };
};
