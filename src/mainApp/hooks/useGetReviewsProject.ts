import { getProjectDetails } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { ReqGetProjectDetails } from "../../types";
import { AxiosError } from "axios";

export const useGetReviewsProject = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ReqGetProjectDetails | undefined>(undefined);

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
    projectName: data?.name,
    reviews: data?.reviews?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    tariff: data?.tariff,
    statusess: data?.statuses,
    handleGetReviews
  };
};
