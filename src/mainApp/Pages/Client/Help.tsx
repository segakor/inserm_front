import React from "react";
import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";
import { ChatClient } from "../../components/ChatClient";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Help = () => {
  return (
    <Page>
      <Header>Нужна помощь?</Header>
      <Title level={5} style={{ fontWeight: 400 }}>
        Задайте свой вопрос и мы ответим в течение 40 минут в рабочие часы
        (пн-пт 9-18). Для более быстрого ответа используйте Telegram
      </Title>
      <ChatClient />
    </Page>
  );
};
