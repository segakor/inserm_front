import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Input, Radio, RadioChangeEvent, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ListOfProject } from "../../components/ListOfProject";
import { ListOfCampaign } from "../../components/ListOfCamaign";
import { optionTypeProject } from "../../../constants";
import { useDispatch, useLocalState } from "../../context/hooks";
import { setActiveTab } from "../../context/action";

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

const AllProjects = () => {
  const { activeTab } = useLocalState();
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const onChangeTypeProject = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setActiveTab(value));
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  return (
    <Page>
      <Header>Список проектов</Header>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionTypeProject}
        onChange={onChangeTypeProject}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      <SearchPanel
        suffix={<SearchOutlined />}
        placeholder="Поиск проектов"
        onChange={handleChangeInput}
      />
      {activeTab === "project" && <ListOfProject inputSearch={inputText} />}
      {activeTab === "campaign" && <ListOfCampaign inputSearch={inputText} />}
    </Page>
  );
};

export default AllProjects;