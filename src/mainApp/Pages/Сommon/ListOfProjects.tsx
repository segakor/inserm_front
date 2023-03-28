import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetAllProject } from "../../hooks/useGetAllProject";
import { Button, Input, Radio, RadioChangeEvent, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FlatCardProject } from "../../components/FlatCardProject";
import { ModalCreateProjectByAdmin } from "../../components/ModalCreateProjectByAdmin";

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
  margin-bottom: 24px;
`;

const optionsWithDisabled = [
  { label: "Активные", value: true },
  { label: "Архивные", value: false },
];

export const ListOfProject = () => {
  const [inputText, setInputText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Page>
      <Header>Список проектов</Header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Radio.Group
          style={{ marginBottom: 16 }}
          options={optionsWithDisabled}
          onChange={onChange}
          value={isActive}
          optionType="button"
          buttonStyle="solid"
        />
        <Button onClick={handleOpen}>Добавить проект</Button>
      </div>
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
      {isModalOpen && (
        <ModalCreateProjectByAdmin
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}
    </Page>
  );
};
