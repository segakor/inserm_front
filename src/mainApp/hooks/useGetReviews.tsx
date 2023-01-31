import { getDetails } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";
import { useEffect, useState } from "react";
import { ReqGetDetails } from "../../type";
import { AxiosError } from "axios";

export const useGetReviews = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ReqGetDetails | undefined>(undefined);

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getDetails(id);
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
    reviews: data?.reviews.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    tariff: data?.tariff,
    statusess: data?.statuses,
    handleGetReviews
  };
};
