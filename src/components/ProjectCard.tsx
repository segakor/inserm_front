import React from "react";
import styled from "styled-components";
import { Title } from "./Typography";
import { Button } from "antd";
import { DetailsCard } from "./DetailsCard";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;
const CardBlock = styled.div`
  width: 600px;
  border-radius: 10px;
  background: #1579e9;
  padding: 20px 20px 20px 20px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  @media (max-width: 768px) {
    width: auto;
    margin: 0 0 40px 0;
  }
`;
const TariffBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const TariffCard = styled.div`
  width: 267px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 15px 20px 15px;
`;
const TitleDate = styled.div`
  padding: 5px 10px 5px 10px;
  background: #1579e9;
  border-radius: 5px;
  color: #ffffff;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  width: 180px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

export const ProjectCard = () => {
  return (
    <Flex>
      <CardBlock>
        <Header>
          <Title level={5} style={{ color: "white" }}>
            Коты на гагарина
          </Title>
          <Title
            level={5}
            style={{ fontSize: "14px", color: "white", fontWeight: "400" }}
          >
            01.09.22-01.10.22
          </Title>
        </Header>
        <DetailsCard />
        <Title
          level={5}
          style={{
            fontWeight: "500",
            color: "#FFFFFF",
            fontSize: "14px",
            textDecorationLine: "underline",
            cursor: "pointer",
          }}
        >
          Смотреть отчет
        </Title>
      </CardBlock>
      <TariffBlock>
        <StyledButton>Открыть бриф</StyledButton>
        <TariffCard>
          <Header>
            <Title level={5} style={{ fontWeight: "800" }}>
              Тариф “S”
            </Title>
            <TitleDate>01.09.22-01.12.22</TitleDate>
          </Header>
          <Title
            level={5}
            style={{
              fontWeight: "500",
              color: "#8E8E8E",
              fontSize: "14px",
              textDecorationLine: "underline",
              cursor: "pointer",
            }}
          >
            Изменить тариф
          </Title>
        </TariffCard>
      </TariffBlock>
    </Flex>
  );
};
