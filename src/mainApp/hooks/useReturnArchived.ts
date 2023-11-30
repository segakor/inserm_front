import { returnArchived } from "../../request";
import { openNotificationWithIcon } from "../../utils";

export const useReturnArchived = () => {
  const handleReturnArchived = async (value: { id: number }) => {
    try {
      await returnArchived(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Последнее продление удалено",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось удалить последнее продление",
      });
    }
  };
  return {
    handleReturnArchived,
  };
};
