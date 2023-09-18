import { AxiosError } from "axios";
import { changeLink } from "../../request";
import { openNotificationWithIcon } from "../../utils";

export const useChangeLink = () => {
  const handleChangeLink = async ({
    link,
    cardId,
  }: {
    link: string;
    cardId: number;
  }) => {
    try {
      await changeLink({ link, cardId });
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Сохранено",
      });
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось изменить ссылку",
        status: typedError.status,
      });
    }
  };

  return {
    handleChangeLink,
  };
};
