import React from "react";
import styled from "styled-components";
import { Header, Title } from "../../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


export const TariffClient = () => {
  return (
    <Page>
      <Header>Тарифы клиентов</Header>
      <Title level={5}>В работе</Title>
    </Page>
  );
};
