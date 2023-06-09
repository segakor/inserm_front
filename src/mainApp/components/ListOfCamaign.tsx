import { useState } from "react";
import { Radio, RadioChangeEvent, Spin } from "antd";
import { FlatCardCampaign } from "./Card";
import { useGetAllCampaign } from "../hooks/useGetAllCampaign";
import { optionsWithDisabled } from "../../constants";

export const ListOfCampaign = ({ inputSearch }: { inputSearch?: string }) => {
  const [isActive, setIsActive] = useState(true);

  const { allCampaign, isLoading, handleUpdate } = useGetAllCampaign(isActive);

  const filteredData = allCampaign?.filter((item) => {
    if (inputSearch) {
      return item.name.toLowerCase().includes(inputSearch);
    }
    return item;
  });

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setIsActive(value);
  };

  return (
    <>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionsWithDisabled}
        onChange={onChange}
        value={isActive}
        optionType="button"
        buttonStyle="solid"
      />
      {
        <>
          {filteredData?.map((item, index) => (
            <FlatCardCampaign
              key={index}
              campaign={item}
              isActive={isActive}
              onUpdate={handleUpdate}
            />
          ))}
        </>
      }
      {isLoading && <Spin />}
    </>
  );
};
