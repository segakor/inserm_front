import { AxiosError } from "axios";
import { getCampaign } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useEffect, useState } from "react";
import { Campaign } from "../../types";
import { useDispatch } from "../context/hooks";
import { setPages } from "../context/action";

export const useGetAllCampaign = (
  isActive: boolean,
  sortOrder: string,
  sortKey: string
) => {
  const [allCampaign, setAllCampaign] = useState<Campaign[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleGetCampaign = async () => {
    try {
      setIsLoading(true);
      const response = await getCampaign(isActive, sortOrder, sortKey);
      const campaignArray = response.data.result.map((item) => ({
        ...item,
        type: "campaign",
      }));
      setAllCampaign(campaignArray);
      dispatch(
        setPages({
          pages: response.data.result.map((item) => item.id),
          type: "campaign",
        })
      );
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить проекты",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { allCampaign, isLoading, handleGetCampaign };
};
