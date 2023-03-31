import { deleteReview } from "../../request";
import { openNotificationWithIcon } from "../../utils";

export const useDeleteReview = () => {
  const handleDeleteReview = async (value: { id: string }) => {
    try {
      await deleteReview(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось удалить запись",
      });
    }
  };

  return {
    handleDeleteReview,
  };
};
