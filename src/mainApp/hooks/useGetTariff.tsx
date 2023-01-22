import { useEffect, useState } from "react";
import { getAllTariff } from "../../request";
import { ReqGetTariff } from "../../type";
import { openNotificationWithIcon } from "../../utils/notification";

export const useGetTariff = () => {
  const [tariffs, setTariffs] = useState<ReqGetTariff | undefined>(undefined)

  const handleGetTariff = async () => {
    try {
      const response = await getAllTariff();
      setTariffs(response.data)
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

  return { tariffs };
};
