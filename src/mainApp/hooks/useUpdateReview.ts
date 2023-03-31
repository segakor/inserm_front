import { updateReview } from "../../request";
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

  return {
    handleUpdateReview,
  };
};
