import { updateAdmin } from "../../request";
import { Admin } from "../../type";
import { openNotificationWithIcon } from "../../utils/notification";
import { useGetAdmin } from "./useGetAdmin";

export const useUpdateAdmin = () => {
  const { handleGetAdmin } = useGetAdmin();

  const handleUpdateAdmin = async (value: Admin) => {
    try {
      await updateAdmin(value);
      await handleGetAdmin();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Пользователь изменен",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось изменить пользователя",
      });
    }
  };

  return {
    handleUpdateAdmin,
  };
};
