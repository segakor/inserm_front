import { createReview } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";

export const useCreateReview = () => {
  const handleCreateReview = async (value: {
    text: string;
    link: string;
    projectId: number;
  }) => {
    try {
      await createReview(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось добавить запись",
      });
    }
  };

  return {
    handleCreateReview,
  };
};
