import { createAdmin } from "../../request";
import { ReqCreateAdmin } from "../../type";
import { openNotificationWithIcon } from "../../utils/notification";
import { useGetAdmin } from "./useGetAdmin";

export const useCreateAdmin = () => {
  const { handleGetAdmin } = useGetAdmin();

  const handleCreateAdmin = async (value: ReqCreateAdmin) => {
    try {
      await createAdmin(value);
      await handleGetAdmin();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Пользователь создан",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось создать пользователя",
      });
    }
  };

  return {
    handleCreateAdmin,
  };
};
