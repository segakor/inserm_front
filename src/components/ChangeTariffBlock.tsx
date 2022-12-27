import React, { useState } from "react";
import styled from "styled-components";
import "./AntSelectCustomStyle.css";
import { TariffItem } from "./TariffItem";
import { Title } from "./Typography";
import { TariffIndividual } from "./TariffIndividual";
import { TariffPeriod } from "./TariffPeriod";
import { useGetTariff } from "../hooks/useGetTariff";
import { Switch } from "antd";

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
const SwitchTariff = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
`;

export const ChangeTariffBlock = () => {
  const [tariffPeriod, setTariffPeriod] = useState(1);
  const [isSwitchTariff, setIsSwitchTariff] = useState(false);

  const { tariffs } = useGetTariff();

  const selectedTariffs = tariffs?.tariffs[tariffPeriod];

  const handleChangePeriod = (key: number) => {
    setTariffPeriod(key);
  };

  return (
    <>
      <SwitchTariff>
        <Title level={5} style={{ fontWeight: "400" }}>
          Сменить тариф
        </Title>
        <Switch onChange={() => setIsSwitchTariff(!isSwitchTariff)} />
      </SwitchTariff>
      {isSwitchTariff && (
        <>
          <TariffPeriod onClickPeriod={handleChangePeriod} />
          <SectionItem>
            {selectedTariffs?.map((item, index) => (
              <TariffItem {...item} key={index} period={tariffPeriod} />
            ))}
            <TariffIndividual />
          </SectionItem>
        </>
      )}
    </>
  );
};
