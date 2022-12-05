import React from "react";
import styled from "styled-components";
import "./AntSelectCustomStyle.css";
import { TariffItem } from "./TariffItem";
import { Title } from "./Typography";
import { TariffIndividual } from "./TariffIndividual";
import { TariffPeriod } from "./TariffPeriod";

const SectionItem = styled.div`
  display: grid;
  grid-template-columns: 460px 460px;
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ChangeTariffBlock = () => {

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <Title level={5} style={{ fontWeight: "400" }}>
          Сменить тариф
        </Title>
      </div>
      <TariffPeriod />
      <SectionItem>
        <TariffItem />
        <TariffItem />
        <TariffItem />
        <TariffIndividual />
      </SectionItem>
    </>
  );
};
