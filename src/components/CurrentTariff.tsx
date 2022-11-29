import React, { useEffect } from "react";
import styled from "styled-components";
import { Select, Button } from "antd";
import "./AntSelectCustomStyle.css";
import { TariffItem } from "./TariffItem";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 20px;
  margin: 20px 0 30px 0;
`;
const StyledButton = styled(Button)`
  border-radius: 5px;
  width: 220px;
  height: 40px;
  background: #1579e9;
  color: #ffffff;
`;
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

export const CurrentTariff = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Wrapper>
        <Select
          defaultValue="lucy"
          onChange={handleChange}
          options={[
            {
              value: "jack",
              label: "коты",
            },
            {
              value: "lucy",
              label: "собаки",
            },
          ]}
        />
        <StyledButton>Добавить новый проект</StyledButton>
      </Wrapper>
      <SectionItem>
        <TariffItem />
        <TariffItem />
        <TariffItem />
        <TariffItem />
      </SectionItem>
    </>
  );
};
