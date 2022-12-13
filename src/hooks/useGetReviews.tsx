import { getDetails } from "../request";
import { openNotificationWithIcon } from "../utils/notification";
import { useEffect, useState } from "react";
import { Reviews } from "../type";

export const useGetReviews = (id: string) => {
  const [reviews, setReviews] = useState<Reviews[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getDetails(id);
      setReviews(response.data.reviews);
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
    handleGetReviews(id);
  }, [id]);

  return { reviews, isLoading };
};
