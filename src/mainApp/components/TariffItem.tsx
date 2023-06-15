import React from "react";
import styled from "styled-components";
import { Button, Switch } from "antd";
import { Title } from "../../common/Typography";
import { getRangeDate } from "../../utils";

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
    padding: 8px 18px 8px 18px;
    grid-gap: 10px;
    width: 100px;
    height: 85px;
    h1 {
      font-size: 10px !important;
    }
    h4 {
      font-size: 14px !important;
    }
  }
`;
const Card1 = styled(Card)<{ color: string }>`
  background: ${(props) => props.color};
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
const SwitchWrapper = styled.div`
  display: flex;
  grid-gap: 12px;
`;

type Props = {
  amount?: number;
  id?: number;
  name?: string;
  price?: number;
  period?: number;
  start?: number;
  end?: number;
  forOne?: number;
  disabled?: boolean;
  onSelectTarif?: (tariff: {
    period: number;
    price: number;
    id: number;
  }) => void;
  onChangeAutoPay?: (e: boolean) => void;
  autoPay?: boolean;
};

export const TariffItem = ({
  amount,
  id,
  name,
  price,
  period,
  start,
  forOne,
  end,
  disabled,
  onSelectTarif,
  onChangeAutoPay,
  autoPay,
}: Props) => {
  const colorCard =
    name === "S" ? "#2CAE97" : name === "M" ? "#ECA843" : " #EF5479";

  const setPeriod = (period?: number) => {
    switch (true) {
      case period === 1:
        return "1 месяц";
      case period === 3:
        return "3 месяца";
      case period === 6 || period === 12:
        return `${period} месяцев`;
      default:
        return `нет данных`;
    }
  };

  const handleClick = () => {
    if (onSelectTarif) {
      onSelectTarif({ period: period || 0, price: price || 0, id: id || 0 });
    }
  };

  return (
    <Wrapper>
      <Row style={{ marginBottom: 40 }}>
        <Title level={4} style={{ fontWeight: "800" }}>
          Тариф “{name}”
        </Title>
        <Title style={{ fontSize: 14, fontWeight: "400" }}>
          {period ? setPeriod(period) : getRangeDate({ start, end })}
        </Title>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Card1 color={colorCard}>
          <Title style={{ fontSize: 14, fontWeight: "400", color: "#FFFFFF" }}>
            Отзывов в месяц
          </Title>
          <Title level={4} style={{ color: "#FFFFFF", fontWeight: "800" }}>
            {amount}
          </Title>
        </Card1>
        <Card2>
          <Title style={{ fontSize: 14, fontWeight: "400", color: "#8E8E8E" }}>
            Стоимость за отзыв
          </Title>
          <Title level={4} style={{ fontWeight: "800" }}>
            {forOne} р
          </Title>
        </Card2>
        <Card3>
          <Title style={{ fontSize: 14, fontWeight: "400" }}>
            Общая стоимость
          </Title>
          <Title level={4} style={{ color: "#1579E9", fontWeight: "800" }}>
            {price?.toLocaleString()} р
          </Title>
        </Card3>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Title style={{ fontSize: 14, fontWeight: "400" }}>
          Яндекс, Яндекс Маркет, 2ГИС, Zoon, Avito, Яндекс Услуги, Yell, Яндекс
          Браузер
        </Title>
      </Row>
      {period ? (
        <StyledButton
          type="primary"
          disabled={disabled}
          block
          onClick={handleClick}
        >
          Выбрать тариф
        </StyledButton>
      ) : (
        <SwitchWrapper>
          <Switch
            checked={autoPay}
            onChange={onChangeAutoPay}
            disabled={!autoPay}
          />
          <Title level={4} style={{ fontWeight: "700", fontSize: 14 }}>
            Автопродление
          </Title>
        </SwitchWrapper>
      )}
    </Wrapper>
  );
};
