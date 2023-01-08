import React, { useState } from "react";
import { Divider, Input } from "antd";
import styled from "styled-components";
import { useCreateProject } from "../../../hooks/useCreateProject";
import { Header, Title } from "../../Typography";
import { TariffSelectionBlock } from "../../TariffSelectionBlock";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 10px !important;
`;

export const CreateProject = () => {
  const [projectName, setProjectName] = useState("");

  const { handleCreateProject } = useCreateProject();

  return (
    <Page>
      <Header>Создание проекта</Header>
      <StyledTitle level={5}>1. Введите название проекта</StyledTitle>
      <Input
        placeholder="Название проекта"
        style={{ width: "300px", height: "40px" }}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Divider />
      <StyledTitle level={5}>2. Выберете период и тариф</StyledTitle>
      <TariffSelectionBlock
        createdProjectName={projectName}
        onCreateProject={handleCreateProject}
        disabled={!projectName ? true : false}
      />
    </Page>
  );
};
