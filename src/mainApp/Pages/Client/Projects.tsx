import styled from "styled-components";
import { useDispatch, useLocalState } from "../../context/hooks";
import { ButtonCreateNewProject } from "../../Button/ButtonCreateNewProject";
import { Header } from "../../../common/Typography";
import { ProjectCard } from "../../components/Projects/ProjectCard";
import { CampaignCard } from "../../components/Projects/CampaignCard";
import { Radio, RadioChangeEvent, Spin } from "antd";
import { optionsStatusProject } from "../../../constants";
import { setIsActive } from "../../context/action";

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
    gap: 0;
  }
`;

const Projects = () => {
  const state = useLocalState();

  const dispatch = useDispatch();

  const {
    clientProject,
    clientCampaign,
    isLoadingProject,
    filterProject: { isActive },
  } = state;

  const onChangeStatusProject = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setIsActive(value));
  };

  return (
    <Page>
      <HeaderFlex>
        <Header>Мои проекты</Header>
        <ButtonCreateNewProject />
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
        <div>{isLoadingProject && <Spin />}</div>
      </div>
      {clientCampaign?.map((item, index) => (
        <CampaignCard {...item} key={index} />
      ))}
      {clientProject?.map((item, index) => (
        <ProjectCard {...item} key={index} />
      ))}
    </Page>
  );
};

export default Projects;
