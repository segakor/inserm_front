import React from "react";
import styled from "styled-components";
import { Title, Header } from "../../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Help = () => {
  return (
    <Page>
      <Header>Нужна помощь?</Header>
      <Title level={5}>Чат временно недоступен. Пожалуйста, воспользуйтесь Telegram</Title>
    </Page>
  );
};
