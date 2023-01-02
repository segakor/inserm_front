import { updateReview } from "../request";
import { Reviews } from "../type";
import { openNotificationWithIcon } from "../utils/notification";

export const useUpdateReview = () => {

  const handleUpdateReview = async (value: Reviews) => {
    try {
      await updateReview(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось сохранить запись",
      });
    }
  };

  return {
    handleUpdateReview
  };
};
