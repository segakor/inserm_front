import React from "react";
import styled from "styled-components";
import { Header } from "../../Typography";
import { CurrentTariff } from "../../CurrentTariff";
import { ButtonCreateNewProject } from "../../Button/ButtonCreateNewProject";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderFlex = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Tariff = () => {
  return (
    <Page>
      <HeaderFlex>
        <Header>Управление тарифами</Header>
        <ButtonCreateNewProject />
      </HeaderFlex>
      <CurrentTariff />
    </Page>
  );
};
