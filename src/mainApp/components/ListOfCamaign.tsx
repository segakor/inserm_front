import { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Select, Spin } from "antd";
import { FlatCardCampaign } from "./Card";
import { useGetAllCampaign } from "../hooks/useGetAllCampaign";
import { optionsKey, optionsSort, optionsWithDisabled } from "../../constants";
import styled from "styled-components";

const WrapperPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  grid-gap: 16px;
  flex-wrap: wrap;
`;

export const ListOfCampaign = ({ inputSearch }: { inputSearch?: string }) => {
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState("success");

  //TODO:зарефакторить!!!

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

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setIsActive(value);
  };

  const hendleChagneSortKey = (e: string) => {
    setSortKey(e);
  };
  const hendleChagneSortOrder = (e: string) => {
    setSortOrder(e);
  };

  useEffect(() => {
    handleGetCampaign();
  }, [sortOrder, sortKey, isActive]);

  return (
    <>
      <WrapperPanel>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange}
          value={isActive}
          optionType="button"
          buttonStyle="solid"
        />
        <div>
          <Select
            style={{ width: 140 }}
            defaultValue={"success"}
            options={optionsKey}
            onChange={hendleChagneSortKey}
          />
        </div>
        <div>
          <Select
            style={{ width: 150 }}
            defaultValue="asc"
            options={optionsSort}
            onChange={hendleChagneSortOrder}
          />
        </div>
      </WrapperPanel>
      {
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
      }
      {isLoading && <Spin />}
    </>
  );
};
