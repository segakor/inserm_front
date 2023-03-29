import { getArchiveDetails } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";
import { useEffect, useState } from "react";
import { Reviews } from "../../type";
import { AxiosError } from "axios";

export const useGetArchiveReviews = (id: string) => {
  const [reviews, setReviews] = useState<Reviews[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetReviews = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getArchiveDetails(id);
      setReviews(response.data.result);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить архивные отзывы клиента",
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
    reviews: reviews?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    isLoading,
  };
};
