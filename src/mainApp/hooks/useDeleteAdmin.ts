import { deleteAdmin } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useGetAdmin } from "./useGetAdmin";

export const useDeleteAdmin = () => {
  const { handleGetAdmin } = useGetAdmin();
  const handleDeleteAdmin = async (value: {
    email: string;
  }) => {
    try {
      await deleteAdmin(value);
      await handleGetAdmin();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: `${value.email} успешно удален`,
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось удалить пользователя",
      });
    }
  };

  return {
    handleDeleteAdmin,
  };
};
