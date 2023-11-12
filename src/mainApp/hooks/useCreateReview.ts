import { createReviewList } from "../../request";
import { ReqCreateReviewList } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useCreateReview = () => {
  const handleCreateReview = async (value: ReqCreateReviewList) => {
    try {
      await createReviewList(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Записи успешно добавлены",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось добавить отзывы",
      });
    }
  };

  return {
    handleCreateReview,
  };
};
