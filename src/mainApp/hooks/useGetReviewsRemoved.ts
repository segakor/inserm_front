import { getRemovedReviews, updateRemovedReviewsStatus } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { RemovedReviews } from "../../types";
import { AxiosError } from "axios";

export const useGetReviewsRemoved = (status: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RemovedReviews[]>([]);

  const handleGetReviews = async () => {
    try {
      setIsLoading(true);
      const response = await getRemovedReviews({ status });
      setData(response.data.result);
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

  const handleUpdateStatus = async (value: {
    requestId: number;
    status: string;
  }) => {
    try {
      await updateRemovedReviewsStatus(value);
      await handleGetReviews();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Запись обновлена",
      });
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
    handleGetReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return {
    isLoading,
    data: data?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    handleUpdateStatus,
  };
};
