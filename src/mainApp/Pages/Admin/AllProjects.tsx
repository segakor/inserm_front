import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Input, Radio, RadioChangeEvent, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ListOfProject } from "../../components/ListOfProject";
import { ListOfCampaign } from "../../components/ListOfCamaign";
import {
  optionsKey,
  optionsSort,
  optionsStatusProject,
  optionsTypeProject,
} from "../../../constants";
import { useDispatch, useLocalState } from "../../context/hooks";
import {
  setActiveTab,
  setIsActive,
  setSortKey,
  setSortOrder,
} from "../../context/action";
import { SearchPanel } from "../../components/SearchPanel";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WrapperPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  grid-gap: 16px;
  flex-wrap: wrap;
`;

const AllProjects = () => {
  const {
    filterProject: { activeTab, isActive, sortKey, sortOrder },
  } = useLocalState();
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const onChangeTypeProject = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setActiveTab(value));
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const onChangeActive = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setIsActive(value));
  };

  const hendleChagneSortKey = (e: string) => {
    dispatch(setSortKey(e));
  };
  const hendleChagneSortOrder = (e: string) => {
    dispatch(setSortOrder(e));
  };

  return (
    <Page>
      <Header>Список проектов</Header>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionsTypeProject}
        onChange={onChangeTypeProject}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      <SearchPanel placeholder="Поиск проектов" onChange={onChangeInput} />
      <WrapperPanel>
        <Radio.Group
          options={optionsStatusProject}
          onChange={onChangeActive}
          value={isActive}
          optionType="button"
          buttonStyle="solid"
        />
        <div>
          <Select
            style={{ width: 150 }}
            defaultValue={"success"}
            options={optionsKey}
            onChange={hendleChagneSortKey}
            value={sortKey}
          />
        </div>
        <div>
          <Select
            style={{ width: 160 }}
            defaultValue="asc"
            options={optionsSort}
            onChange={hendleChagneSortOrder}
            value={sortOrder}
          />
        </div>
      </WrapperPanel>
      {activeTab === "project" && <ListOfProject inputSearch={inputText} />}
      {activeTab === "campaign" && <ListOfCampaign inputSearch={inputText} />}
    </Page>
  );
};

export default AllProjects;
