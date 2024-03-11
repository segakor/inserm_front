import {
  createRemoveReviewRequest,
  updateReview,
  updateReviewByClient,
} from "../../request";
import { Reviews } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useUpdateReview = () => {
  const handleUpdateReview = async (value: Reviews) => {
    try {
      await updateReview(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось сохранить запись",
      });
    }
  };

  const handleUpdateReviewByClient = async (value: {
    id: number;
    text: string;
  }) => {
    try {
      await updateReviewByClient(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось обновить текст отзыва",
      });
    }
  };

  const handleCreateRemoveReviewRequest = async (value: {
    reviewId: number;
  }) => {
    try {
      await createRemoveReviewRequest(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Ваш запрос успешно отправлен",
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось отправить запрос",
      });
    }
  };

  return {
    handleUpdateReview,
    handleUpdateReviewByClient,
    handleCreateRemoveReviewRequest
  };
};
