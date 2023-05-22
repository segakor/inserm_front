import styled from "styled-components";
import { useLocalState } from "../../context/hooks";
import { ButtonCreateNewProject } from "../../Button/ButtonCreateNewProject";
import { Header } from "../../../common/Typography";
import { ProjectCard } from "../../components/Projects/ProjectCard";
import { CampaignCard } from "../../components/Projects/CampaignCard";

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

const Projects = () => {
  const state = useLocalState();

  const { clientProject, clientCampaign } = state;

  return (
    <Page>
      <HeaderFlex>
        <Header>Мои проекты</Header>
        <ButtonCreateNewProject />
      </HeaderFlex>
      {clientCampaign?.map((item, index) => (
        <CampaignCard {...item} key={index} />
      ))}
      {clientProject?.map((item, index) => (
        <ProjectCard {...item} key={index} />
      ))}
    </Page>
  );
};

export default Projects