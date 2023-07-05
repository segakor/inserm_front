import styled from "styled-components";
import { Header } from "../../common/Typography";
import { ButtonCreateNewProjectDemo } from "../components/Button/ButtonCreateNewProjectDemo";
import { ProjectCardDemo } from "../components/ProjectCardDemo";
import { demoProject, demoCampaign } from "../constants";
import { CampaignCardDemo } from "../components/CampaignCardDemo";

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
  return (
    <Page>
      <HeaderFlex>
        <Header>Мои проекты</Header>
        <ButtonCreateNewProjectDemo />
      </HeaderFlex>
      {demoProject?.map((item) => (
        <ProjectCardDemo {...item} key={item.id} />
      ))}
      {demoCampaign?.map((item, index) => (
        <CampaignCardDemo {...item} key={index} />
      ))}
    </Page>
  );
};
