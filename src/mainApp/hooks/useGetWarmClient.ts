import { useEffect, useState } from "react";
import { getWarmClient } from "../../request";
import { WarmClient } from "../../types";

export const useGetWarmClient = () => {
  const [warmClient, setWarmClient] = useState<WarmClient[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const handleGetWarmClient = async (params?: {
    start: number;
    end: number;
  }) => {
    try {
      setIsLoading(true);
      const response = await getWarmClient(params);
      setWarmClient(response.data.result);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetWarmClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    warmClient: warmClient?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    isLoading,
    handleGetWarmClient
  };
};
