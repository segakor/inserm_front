import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAllTariff } from "../../request";
import { ReqGetTariff } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useGetTariff = () => {
  const [tariffs, setTariffs] = useState<ReqGetTariff | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetTariff = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTariff();
      setTariffs(response.data);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить тарифы",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetTariff();
  }, []);

  return { tariffs, isLoading };
};
