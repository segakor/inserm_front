import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAllClient } from "../../request";
import { Client } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useGetAllClient = () => {
  const [allClient, setAllClient] = useState<Client[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllClient = async () => {
    try {
      setIsLoading(true);
      const response = await getAllClient();
      setAllClient(response.data.result);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить список клиентов",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    allClient: allClient?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    isLoading,
  };
};
