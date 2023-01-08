import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useLocalState } from "../../../context/hooks";
import { ProjectCard } from "../../ProjectCard";
import { Header } from "../../Typography";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledButton = styled(Button)`
  border-radius: 10px;
  width: 180px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
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

  const navigation = useNavigate();

  return (
    <Page>
      <HeaderFlex>
        <Header>Мои проекты</Header>
        <StyledButton onClick={() => navigation(`/client/createproject`)}>
          Создать новый проект
        </StyledButton>
      </HeaderFlex>
      {clientProject?.map((item) => (
        <ProjectCard {...item} key={item.id} />
      ))}
    </Page>
  );
};
