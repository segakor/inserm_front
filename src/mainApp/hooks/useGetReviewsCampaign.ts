import { getCampaignDetails } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { ReqGetCampaignDetails } from "../../types";
import { AxiosError } from "axios";

export const useGetReviewsCampaign = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ReqGetCampaignDetails | undefined>(undefined);

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getCampaignDetails(id);
      setData(response.data);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить отзывы клиента",
        status: typedError.status
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetReviews(id);
  }, [id]);

  return {
    isLoading,
    data,
    handleGetReviews
  };
};
