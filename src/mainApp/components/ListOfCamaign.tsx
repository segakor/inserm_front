import { useEffect } from "react";
import { Spin } from "antd";
import { FlatCardCampaign } from "./Card";
import { useGetAllCampaign } from "../hooks/useGetAllCampaign";

import { useLocalState } from "../context/hooks";

export const ListOfCampaign = ({ inputSearch }: { inputSearch?: string }) => {
  const {
    filterProject: { isActive, sortKey, sortOrder },
  } = useLocalState();

  const { allCampaign, isLoading, handleGetCampaign } = useGetAllCampaign(
    isActive,
    sortOrder,
    sortKey
  );

  const filteredData = allCampaign?.filter((item) => {
    if (inputSearch) {
      return item.name.toLowerCase().includes(inputSearch);
    }
    return item;
  });

  useEffect(() => {
    handleGetCampaign();
  }, [sortOrder, sortKey, isActive]);

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          {filteredData?.map((item, index) => (
            <FlatCardCampaign
              key={index}
              campaign={item}
              isActive={isActive}
              onUpdate={handleGetCampaign}
            />
          ))}
        </>
      )}
    </>
  );
};
