import { useEffect, useState } from "react";
import { getListOfBrief } from "../../request";
import { BriefList } from "../../types";

export const useGetListOfBrief = () => {
  const [listOfBrief, setListOfBrief] = useState<BriefList[] | undefined>(
    undefined
  );

  const handleGetBrief = async () => {
    try {
      const response = await getListOfBrief();
      setListOfBrief(response.data.result);
    } catch {
      setListOfBrief(undefined);
    }
  };

  useEffect(() => {
    handleGetBrief();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    listOfBrief,
    handleGetBrief,
  };
};
