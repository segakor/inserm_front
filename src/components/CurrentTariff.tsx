import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select, Button } from "antd";
import "./AntSelectCustomStyle.css";
import { TariffItem } from "./TariffItem";
import { Title } from "./Typography";
import { useLocalState } from "../context/hooks";
import { ChangeTariffBlock } from "./ChangeTariffBlock";

const Wrapper = styled.div`
  display: flex;
  /* align-items: center; */
  grid-gap: 20px;
  margin: 20px 0 30px 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const StyledButton = styled(Button)`
  border-radius: 5px;
  width: 220px;
  height: 40px;
  background: #1579e9;
  color: #ffffff;
`;
const CurrentTariffSection = styled.div`
  width: 460px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: auto;
    display: flex;
    flex-direction: column;
  }
`;

export const CurrentTariff = () => {
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    setValue(value);
  };

  const state = useLocalState();

  const { clientProject } = state;

  const listOfProject = clientProject?.map((item) => ({
    value: item.name,
  }));

  useEffect(() => {
    if (listOfProject) {
      setValue(listOfProject[0].value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientProject])

  const currentTariff = clientProject?.find(item => item.name === value)?.tariff_name;
  console.log('currentTariff', currentTariff)

  return (
    <>
      {!!listOfProject?.length ? (
        <>
          <Title level={5} style={{ fontWeight: "400" }}>
            Ваш текущий тариф по проекту
          </Title>
          <Wrapper>
            <Select
              onChange={handleChange}
              options={listOfProject}
              value={value}
            />
            <StyledButton>Добавить новый проект</StyledButton>
          </Wrapper>
        </>
      ) : (
        <Wrapper>
          <Title level={5} style={{ fontWeight: "400" }}>
            У вас нет проектов, создайте его
          </Title>
          <StyledButton>Добавить новый проект</StyledButton>
        </Wrapper>
      )}
      <CurrentTariffSection>
        <TariffItem />
      </CurrentTariffSection>
      <ChangeTariffBlock />
    </>
  );
};
