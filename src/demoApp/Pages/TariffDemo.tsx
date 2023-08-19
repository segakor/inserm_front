import React from "react";
import styled from "styled-components";
import { CurrentTariff } from "../../mainApp/components/CurrentTariff";
import { Header } from "../../common/Typography";
import { ButtonCreateNewProjectDemo } from "../components/Button/ButtonCreateNewProjectDemo";
import { demoProject } from "../constants";

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

export const TariffDemo = () => {
  return (
    <Page>
      <HeaderFlex>
        <Header>Управление тарифами</Header>
        <ButtonCreateNewProjectDemo />
      </HeaderFlex>
      <CurrentTariff clientProject={demoProject} clientCampaign={[]}/>
    </Page>
  );
};
