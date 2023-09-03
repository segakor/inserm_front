import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { ReviewsPiece } from "../../components/CreateCampaign";
import { ReviewsMonth } from "../../components/CreateProject";
import { Radio, RadioChangeEvent } from "antd";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const optionsWithDisabled = [
  { label: "Оплата поштучно", value: "piece" },
  { label: "Оплата помесячно", value: "month" },
];

const CreateProject = () => {
  const [activeTab, setActiveTab] = useState<"piece" | "month">("piece");

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setActiveTab(value);
  };
  
  return (
    <Page>
      <Header>Выберите вариант оплаты</Header>
      <Radio.Group
        style={{ marginBottom: 24 }}
        options={optionsWithDisabled}
        onChange={onChange}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      {activeTab === 'piece' && <ReviewsPiece/>}
      {activeTab === 'month' && <ReviewsMonth />}
    </Page>
  );
};

export default CreateProject;