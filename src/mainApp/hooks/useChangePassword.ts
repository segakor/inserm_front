import { openNotificationWithIcon } from "../../utils";
import { ReqChangePassword } from "../../types";
import { changePassword } from "../../request";

export const useChangePassword = () => {
  const handleChangePassword = async (value: ReqChangePassword) => {
    return new Promise((resolve, reject) => {
      changePassword(value)
        .then(() => {
          openNotificationWithIcon({
            type: "success",
            message: "",
            description: "Пароль успешно изменен",
          });
          resolve(true);
        })
        .catch((err) => {
          openNotificationWithIcon({
            type: "error",
            message: "",
            description: err.response.data.message,
          });
          reject();
        });
    });
  };
  return { handleChangePassword };
};
