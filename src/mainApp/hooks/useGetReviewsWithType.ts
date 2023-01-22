import { getReviewsWithType } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";
import { useEffect, useState } from "react";
import { ReqGetReviewsWithType } from "../../type";

export const useGetReviewsWithType = (type: "moderate" | "isPaid" | "noPaid") => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ReqGetReviewsWithType | undefined>(undefined);

  const handleGetReviews = async () => {
    try {
      setIsLoading(true);
      const response = await getReviewsWithType(type);
      setData(response.data);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить отзывы клиента",
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
    handleGetReviews
  };
};
