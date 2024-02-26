import styled from "styled-components";
import { Header } from "../../common/Typography";
import { ButtonCreateNewProjectDemo } from "../components/Button/ButtonCreateNewProjectDemo";
import { demoCampaign, demoCampaignArhvie } from "../constants";
import { CampaignCardDemo } from "../components/CampaignCardDemo";
import { Radio, RadioChangeEvent } from "antd";
import { optionsStatusProject } from "../../constants";
import { useState } from "react";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderFlex = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProjectsDemo = () => {
  const [isActive, setIsActive] = useState(true);

  const onChangeStatusProject = ({ target: { value } }: RadioChangeEvent) => {
    setIsActive(value);
  };

  return (
    <Page>
      <HeaderFlex>
        <Header>Мои проекты</Header>
        <ButtonCreateNewProjectDemo />
      </HeaderFlex>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Radio.Group
          size="large"
          options={optionsStatusProject}
          onChange={onChangeStatusProject}
          value={isActive}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      {isActive && demoCampaign?.map((item, index) => (
        <CampaignCardDemo {...item} key={index} />
      ))}
      {!isActive && demoCampaignArhvie?.map((item, index) => (
        <CampaignCardDemo {...item} key={index} />
      ))}
    </Page>
  );
};
