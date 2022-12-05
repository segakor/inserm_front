import { useEffect } from "react";
import { getProject } from "../request";
import { openNotificationWithIcon } from "../utils/notification";

export const useGetTariff = () => {

  const handleGetTariff = async () => {
    try {
      const response = await getProject();
      console.log(response.data);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить тарифы",
      });
    }
  };
  useEffect(() => {
    handleGetTariff();
  }, []);

  return {};
};
