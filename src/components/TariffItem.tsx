import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Title } from "./Typography";

const Wrapper = styled.div`
  width: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Card = styled.div`
  width: 130px;
  height: 100px;
  border-radius: 10px;
  padding: 12px 20px 12px 20px;
  display: flex;
  flex-direction: column;
  grid-gap: 14px;
  @media (max-width: 768px) {
    grid-gap: 10px;
    width: 100px;
    height: 85px;
    h1{
      font-size: 10px !important;
    }
    h4{
      font-size: 14px !important;
    }
  }
`;
const Card1 = styled(Card)`
  background: #2cae97;
  color: #ffffff;
`;
const Card2 = styled(Card)`
  border: 1px solid #8e8e8e;
`;
const Card3 = styled(Card)`
  border: 2px solid #1579e9;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 40px;
  border: 2px solid #1579e9;
`;
/* 
type Props = {
  name: string;
  period: string;
  count: string;
  price: string;
  totalPrice: string;
  channel: string;
}; */

export const TariffItem =
  (/* { name, period, count, price, totalPrice, channel }: Props */) => {
    return (
      <Wrapper>
        <Row style={{ marginBottom: 40 }}>
          <Title level={4} style={{ fontWeight: "800" }}>
            Тариф “S”
          </Title>
          <Title style={{ fontSize: 14, fontWeight: "400" }}>12 месяцев</Title>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Card1>
            <Title
              style={{ fontSize: 14, fontWeight: "400", color: "#FFFFFF" }}
            >
              Отзывов в месяц
            </Title>
            <Title level={4} style={{ color: "#FFFFFF", fontWeight: "800" }}>
              5
            </Title>
          </Card1>
          <Card2>
            <Title
              style={{ fontSize: 14, fontWeight: "400", color: "#8E8E8E" }}
            >
              Стоимость за отзыв
            </Title>
            <Title level={4} style={{ fontWeight: "800" }}>
              750 р
            </Title>
          </Card2>
          <Card3>
            <Title style={{ fontSize: 14, fontWeight: "400" }}>
              Общая стоимость
            </Title>
            <Title level={4} style={{ color: "#1579E9", fontWeight: "800" }}>
              3 750 р
            </Title>
          </Card3>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Title style={{ fontSize: 14, fontWeight: "400" }}>
            Яндекс, Яндекс Маркет, 2ГИС, Zoon, Avito, Яндекс Услуги, Yell,
            Яндекс Браузер
          </Title>
        </Row>
        <StyledButton type="primary" block>
          Выбрать тариф
        </StyledButton>
      </Wrapper>
    );
  };
