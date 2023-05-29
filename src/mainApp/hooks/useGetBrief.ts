import { useEffect, useState } from "react";
import { getBrief } from "../../request";
import { Brief } from "../../types";

export const useGetBrief = (
  projectId: string,
  mode?: "prjoect" | "campaign"
) => {
  const [brief, setBrief] = useState<Brief | undefined>(undefined);

  const handleGetBrief = async () => {
    try {
      const response = await getBrief(projectId, mode);
      setBrief(response.data.brief);
    } catch {
      setBrief(undefined);
    }
  };

  useEffect(() => {
    handleGetBrief();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    brief,
    handleGetBrief,
  };
};
