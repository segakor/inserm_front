import { getSubscription } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useState } from "react";
import { TariffList } from "../../types";
import { AxiosError } from "axios";

export const useGetClientTariff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TariffList | undefined>(undefined);

  const handleGetClientTariff = async () => {
    try {
      setIsLoading(true);
      const response = await getSubscription();
      setData(response.data.result);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить подписки",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    data,
    handleGetClientTariff,
  };
};
