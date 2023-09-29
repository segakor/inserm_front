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
      font-size: 8px !important;
    }
    h4 {
      font-size: 12px !important;
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
const SwitchWrapper = styled.div`
  display: flex;
  grid-gap: 12px;
`;

type Props = {
  amount: number;
  id: number;
  name: string;
  price: number;
  start: number;
  end: number;
  forOne?: number;
  autoPay: boolean;
  onChangeAutoPay: ({ id, type }: { id: number; type: string }) => void;
};

export const TariffItem = ({
  amount,
  name,
  price,
  start,
  forOne,
  end,
  onChangeAutoPay,
  autoPay,
  id,
}: Props) => {
  const handleChangeAutoPay = () => {
    onChangeAutoPay({ id, type: "project" });
  };
  return (
    <Wrapper>
      <Row style={{ marginBottom: 20 }}>
        <Title
          level={4}
          style={{
            fontWeight: "800",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: "350px",
          }}
        >
          {name}
        </Title>
        <Title style={{ fontSize: 14, fontWeight: "400" }}>
          {getRangeDate({ start, end })}
        </Title>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Card1>
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
      <SwitchWrapper>
        <Switch
          checked={autoPay}
          onChange={handleChangeAutoPay}
          disabled={!autoPay}
        />
        <Title level={4} style={{ fontWeight: "700", fontSize: 14 }}>
          Автопродление
        </Title>
      </SwitchWrapper>
    </Wrapper>
  );
};
