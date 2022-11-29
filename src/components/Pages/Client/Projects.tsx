import React from "react";
import styled from "styled-components";
import { ProjectCard } from "../../ProjectCard";
import { Header } from "../../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


export const Projects = () => {
  return (
    <Page>
      <Header>Мои проекты</Header>
      <ProjectCard />
    </Page>
  );
};
