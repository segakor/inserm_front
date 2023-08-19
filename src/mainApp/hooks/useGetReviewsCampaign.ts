import { getCampaignDetails } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { ResGetCampaignDetails } from "../../types";
import { AxiosError } from "axios";

export const useGetReviewsCampaign = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResGetCampaignDetails | undefined>(
    undefined
  );

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getCampaignDetails(id);
      response.data.archive = response.data.archive.map((arch_item) => ({
        ...arch_item,
        reviews: arch_item.reviews.map((rev_item, index) => ({
          ...rev_item,
          key: index.toString(),
        })),
      }));
      setData(response.data);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить отзывы клиента",
        status: typedError.status,
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
    handleGetReviews,
  };
};
