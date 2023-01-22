import React from "react";
import styled from "styled-components";
import { useLocalState } from "../../context/hooks";
import { ButtonCreateNewProject } from "../../Button/ButtonCreateNewProject";
import { Header } from "../../../common/Typography";
import { ProjectCard } from "../../components/ProjectCard";

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

export const Projects = () => {
  const state = useLocalState();

  const { clientProject } = state;

  return (
    <Page>
      <HeaderFlex>
        <Header>Мои проекты</Header>
        <ButtonCreateNewProject />
      </HeaderFlex>
      {clientProject?.map((item) => (
        <ProjectCard {...item} key={item.id} />
      ))}
    </Page>
  );
};
