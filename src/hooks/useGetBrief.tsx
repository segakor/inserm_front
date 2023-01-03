import { useEffect, useState } from "react";
import { getBrief } from "../request";
import { Brief } from "../type";
import { openNotificationWithIcon } from "../utils/notification";

export const useGetBrief = (projectId: string) => {
  const [brief, setBrief] = useState<Brief | undefined>(undefined);

  const handleGetBrief = async (projectId: string) => {
    try {
      const response = await getBrief(projectId);
      setBrief(response.data.brief)
    } catch {
      setBrief(undefined)
    }
  };

  useEffect(() => {
    handleGetBrief(projectId);
  }, [projectId]);

  return {
    brief,
    handleGetBrief
  };
};
