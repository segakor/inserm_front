import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { CreateCampaignPlatform } from "../../components/CreateCampaign";
import {
  headerCreateProjectPage,
  isReviewsMonthEnabled,
  optionsCreateProject,
} from "../../../constants";
import { CreateProjectPlatform } from "../../components/CreateProject";
import { Radio, RadioChangeEvent } from "antd";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Payment = () => {
  const [activeTab, setActiveTab] = useState<"piece" | "month">("piece");

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setActiveTab(value);
  };

  return (
    <Page>
      <Header>{headerCreateProjectPage}</Header>
      {isReviewsMonthEnabled && (
        <Radio.Group
          style={{ marginBottom: 24 }}
          options={optionsCreateProject}
          onChange={onChange}
          value={activeTab}
          optionType="button"
          buttonStyle="solid"
        />
      )}
      {activeTab === "piece" && <CreateCampaignPlatform />}
      {activeTab === "month" && isReviewsMonthEnabled && (
        <CreateProjectPlatform />
      )}
    </Page>
  );
};

export default Payment;
