import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetAllProject } from "../../hooks/useGetAllProject";
import { Input, Radio, RadioChangeEvent, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FlatCardProject } from "../../components/FlatCardProject";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SearchPanel = styled(Input)`
  background: #ffffff;
  border-radius: 10px;
  height: 40px;
  padding: 12px 20px 12px 20px;
  display: flex;
  margin-bottom: 50px;
`;

const Box = styled.div`
  padding-right: 40px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const optionsWithDisabled = [
  { label: "Активные", value: true },
  { label: "Архивные", value: false },
];

export const ListOfProject = () => {
  const [inputText, setInputText] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { allProject, isLoading, handleUpdate } = useGetAllProject(isActive);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const filteredData = allProject?.filter((item) => {
    if (inputText) {
      return item.name.toLowerCase().includes(inputText);
    }
    return item;
  });

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setIsActive(value);
  };

  return (
    <Page>
      <Header>Список проектов</Header>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionsWithDisabled}
        onChange={onChange}
        value={isActive}
        optionType="button"
        buttonStyle="solid"
      />
      <Box>
        <SearchPanel
          suffix={<SearchOutlined />}
          placeholder="Поиск проектов"
          onChange={handleSearch}
        />
        {!isLoading &&
          filteredData?.map((item, index) => (
            <FlatCardProject
              key={index}
              project={item}
              isActive={isActive}
              onUpdate={handleUpdate}
            />
          ))}
        {isLoading && <Spin />}
      </Box>
    </Page>
  );
};
