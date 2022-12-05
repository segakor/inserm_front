import React from "react";
import styled from "styled-components";
import { Header } from "../../Typography";
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
      <CurrentTariff />
    </Page>
  );
};
