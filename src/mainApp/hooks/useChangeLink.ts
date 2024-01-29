import { AxiosError } from "axios";
import { changeLink, createCardRating } from "../../request";
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

  const handleChangeRate = async ({
    start,
    current,
    cardId,
  }: {
    start: number;
    current: number;
    cardId: number;
  }) => {
    try {
      await createCardRating({ start, current, cardId });
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
        description: "Не удалось изменить рейтинг",
        status: typedError.status,
      });
    }
  };

  return {
    handleChangeLink,
    handleChangeRate
  };
};
