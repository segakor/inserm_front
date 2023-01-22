import React from "react";
import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ClientQuestions = () => {
  return (
    <Page>
      <Header>Вопросы клиентов</Header>
      <Title level={5}>В работе</Title>
    </Page>
  );
};
