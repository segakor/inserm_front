import React, { useEffect } from "react";
import styled from "styled-components";
import { Title, Header } from "../../Typography";
import { CurrentTariff } from "../../CurrentTariff";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


export const Tariff = () => {

  return (
    <Page>
      <Header>Управление тарифами</Header>
      <Title level={5} style={{ fontWeight: "400" }}>Ваш текущий тариф по проекту</Title>
      <CurrentTariff />
    </Page>
  );
};
