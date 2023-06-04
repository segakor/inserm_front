import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetAllProject } from "../../hooks/useGetAllProject";
import { Button, Input, Radio, RadioChangeEvent, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FlatCardProject, FlatCardCampaign } from "../../components/Card";
import { ModalCreateProjectByAdmin } from "../../components/ModalCreateProjectByAdmin";
import { useGetCampaign } from "../../hooks/useGetCampaign";
import { useGetAllCampaign } from "../../hooks/useGetAllCampaign";
import { useDispatch } from "../../context/hooks";
import { setPages } from "../../context/action";

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

const optionTypeProject = [
  { label: "Проекты", value: "project" },
  { label: "Проекты штучные", value: "campaign" },
];

const ListOfProject = () => {
  const [inputText, setInputText] = useState("");
  const [typeProject, setTypeProject] = useState<"project" | "campaign">(
    "project"
  );
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { allProject, isLoading, handleUpdate } = useGetAllProject(isActive);

  const { allCampaign } = useGetAllCampaign();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const filteredData = allProject?.filter((item) => {
    if (inputText) {
      return item.name.toLowerCase().includes(inputText);
    }
    return item;
  });

  const filteredData2 = allCampaign?.filter((item) => {
    if (inputText) {
      return item.name.toLowerCase().includes(inputText);
    }
    return item;
  });

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setIsActive(value);
  };

  const onChangeTypeProject = ({ target: { value } }: RadioChangeEvent) => {
    setTypeProject(value);
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
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionTypeProject}
        onChange={onChangeTypeProject}
        value={typeProject}
        optionType="button"
        buttonStyle="solid"
      />
      <SearchPanel
        suffix={<SearchOutlined />}
        placeholder="Поиск проектов"
        onChange={handleSearch}
      />
      {typeProject === "project" && (
        <>
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
          {filteredData?.map((item, index) => (
            <FlatCardProject
              key={index}
              project={item}
              isActive={isActive}
              onUpdate={handleUpdate}
            />
          ))}
        </>
      )}
      {typeProject === "campaign" && (
        <>
          {filteredData2?.map((item, index) => (
            <FlatCardCampaign key={index} campaign={item} />
          ))}
        </>
      )}
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

export default ListOfProject;
