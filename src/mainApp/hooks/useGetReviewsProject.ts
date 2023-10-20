import { getPersonCampaignList, getProjectDetails } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { AllPersonCampaign, ReqGetProjectDetails } from "../../types";
import { AxiosError } from "axios";

export const useGetReviewsProject = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ReqGetProjectDetails | undefined>(undefined);
  const [campaignList, setCampaignList] = useState<AllPersonCampaign | null>(
    null
  );

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getProjectDetails(id);
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
    data?.userId && handleGetPersonCampaignList(data?.userId);
  }, [data?.userId]);

  return {
    isLoading,
    projectName: data?.name,
    reviews: data?.reviews?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    tariff: data?.tariff,
    statusess: data?.statuses,
    handleGetReviews,
    campaignList
  };
};
