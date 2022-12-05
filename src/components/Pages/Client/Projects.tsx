import React from "react";
import styled from "styled-components";
import { useLocalState } from "../../../context/hooks";
import { ProjectCard } from "../../ProjectCard";
import { Header } from "../../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Projects = () => {
  const state = useLocalState();

  const { clientProject } = state;

  return (
    <Page>
      <Header>Мои проекты</Header>
      {clientProject?.map((item) => (
        <ProjectCard {...item} key={item.id} />
      ))}
    </Page>
  );
};
