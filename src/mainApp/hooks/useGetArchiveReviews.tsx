import { getArchiveDetails } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";
import { useEffect, useState } from "react";
import { Reviews } from "../../type";

export const useGetArchiveReviews = (id: string) => {
  const [reviews, setReviews] = useState<Reviews[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getArchiveDetails(id);
      setReviews(response.data.result);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить архивные отзывы клиента",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetReviews(id);
  }, [id]);

  return {
    reviews: reviews?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    isLoading,
  };
};
