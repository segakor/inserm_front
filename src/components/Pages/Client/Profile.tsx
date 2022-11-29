import React from "react";
import styled from "styled-components";
import { Title, Header } from "../../Typography";
import { FormChangePassword } from "../../FormChangePassword";
import { FormChangeClientInfo } from "../../FormChangeClientInfo";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 860px;
  margin-top: 20px;
  grid-gap:20px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;

export const Profile = () => {
  return (
    <Page>
      <Header>Профиль</Header>
      <Title level={4} style={{ fontWeight: "700" }}>
        Иван Иванов
      </Title>
      <Title level={5} style={{ fontWeight: "400" }}>
        ivanov@yandex.ru
      </Title>
      <FlexBox>
        <FormChangeClientInfo />
        <FormChangePassword />
      </FlexBox>
    </Page>
  );
};
