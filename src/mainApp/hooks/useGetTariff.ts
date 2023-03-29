import { AxiosError } from "axios";
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
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить тарифы",
        status: typedError.status
      });
    }
  };
  useEffect(() => {
    handleGetTariff();
  }, []);

  return { tariffs };
};
