import { createUserFromSite } from "../request";
import { ReqSiteRegistration } from "../type";
import { openNotificationWithIcon } from "../utils/notification";

export const useCreateFromSite = () => {
  const handleCreateFromSite = async (value: ReqSiteRegistration) => {
    try {
      await createUserFromSite(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Данные для входа отправлены на почту",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось создать пользователя",
      });
    }
  };

  return {
    handleCreateFromSite,
  };
};
