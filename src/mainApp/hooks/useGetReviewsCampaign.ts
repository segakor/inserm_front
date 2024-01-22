import { getCampaignDetails, getPersonCampaignList } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { AllPersonCampaign, ResGetCampaignDetails } from "../../types";
import { AxiosError } from "axios";

export const useGetReviewsCampaign = (id: string, isAdmin?: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResGetCampaignDetails | undefined>(
    undefined
  );
  const [campaignList, setCampaignList] = useState<AllPersonCampaign | null>(
    null
  );

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getCampaignDetails(id);
      response.data.archives = response.data.archives.map((item) => {
        return {
          ...item,
          archive: item.archive.map((item_arch) => {
            return {
              ...item_arch,
              reviews: item_arch.reviews.map((reviews, index) => {
                return { ...reviews, key: index.toString() };
              }),
            };
          }),
        };
      });

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

  const handleGetPersonCampaignList = async (userId: number) => {
    try {
      const response = await getPersonCampaignList(userId);
      setCampaignList(response.data);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить список всех проектов клиента",
      });
    }
  };

  useEffect(() => {
    handleGetReviews(id);
  }, [id]);

  useEffect(() => {
    data?.userId && isAdmin && handleGetPersonCampaignList(data?.userId);
  }, [data?.userId]);

  return {
    isLoading,
    data,
    handleGetReviews,
    campaignList,
  };
};
