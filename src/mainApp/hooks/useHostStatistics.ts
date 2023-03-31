import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getHostStatistics } from "../../request";
import { HostStatistics } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useHostStatistics = () => {
  const [statistics, setStatistics] = useState<HostStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetHostStatistics = async (params?: {
    start: number;
    end: number;
  }) => {
    try {
      setIsLoading(true);
      const response = await getHostStatistics(params);
      setStatistics(response.data.result);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить статистику",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetHostStatistics();
  }, []);

  return {
    handleGetHostStatistics,
    isLoading,
    statistics: {
      delete: statistics?.delete,
      left: statistics?.left,
      moderate: statistics?.moderate,
      reject: statistics?.reject,
      wait: statistics?.wait,
      success: statistics?.success,
      hosts: statistics?.hosts.map((item, index) => ({
        ...item,
        key: index.toString(),
      })),
    },
  };
};
