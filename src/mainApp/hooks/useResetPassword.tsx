import { resetPassword } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";

export const useResetPassword = () => {
  const handleResetPassword = async (value: { email: string }) => {
    try {
      await resetPassword(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Новый пароль отправлен на почту",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось сбросить пароль",
      });
    }
  };

  return {
    handleResetPassword,
  };
};
