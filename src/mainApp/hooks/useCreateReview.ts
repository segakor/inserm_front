import { createReview, createReviewList } from "../../request";
import { ReqCreateReviewList } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useCreateReview = () => {
  const handleCreateReview = async (value: {
    text: string;
    link: string;
    projectId?: number;
    cardId?: number;
  }) => {
    try {
      await createReview(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось добавить запись",
      });
    }
  };

  const handleCreateReviewList = async (value: ReqCreateReviewList) => {
    try {
      await createReviewList(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Записи успешно импортировались",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось добавить записи из файла",
      });
    }
  };

  return {
    handleCreateReview,
    handleCreateReviewList,
  };
};
