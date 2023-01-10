import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { FlatCardProject } from "../../FlatCardProject";
import { Header } from "../../Typography";
import { useGetAllProject } from "../../../hooks/useGetAllProject";
import { Input, Spin } from "antd";
import { SearchOutlined } from '@ant-design/icons';

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

export const ListOfProject = () => {
  const [inputText, setInputText] = useState("");

  const { allProject, isLoading } = useGetAllProject();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const filteredData = allProject?.filter((item) => {
    if (inputText) {
      return item.name.toLowerCase().includes(inputText);
    }
    return item;
  });

  return (
    <Page>
      <Header>Список проектов</Header>
      <Box>
        <SearchPanel suffix={<SearchOutlined />} placeholder="Поиск проектов" onChange={handleSearch} />
        {!isLoading &&
          filteredData?.map((item) => <FlatCardProject {...item} />)}
        {isLoading && <Spin />}
      </Box>
    </Page>
  );
};
