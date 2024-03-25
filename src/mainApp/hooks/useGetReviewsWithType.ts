import { getReviewsWithType } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { ReqGetReviewsWithType } from "../../types";
import { AxiosError } from "axios";

export const useGetReviewsWithType = (
  type: "moderate" | "isPaid" | "noPaid"
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ReqGetReviewsWithType | undefined>(
    undefined
  );

  const handleGetReviews = async (search?: string) => {
    try {
      setIsLoading(true);
      const response = await getReviewsWithType(type, search);
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
    handleGetReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return {
    isLoading,
    reviews: data?.result?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    handleGetReviews,
  };
};
