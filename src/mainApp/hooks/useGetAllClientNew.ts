import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAllClientNew } from "../../request";
import { ClientNew } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useGetAllClientNew = (status: string) => {
  const [allClient, setAllClient] = useState<ClientNew[] | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllClient = async () => {
    try {
      setIsLoading(true);
      const response = await getAllClientNew({status});
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
  }, [status]);

  return {
    allClient: allClient?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    isLoading,
  };
};
