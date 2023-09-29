import styled from "styled-components";
import { Switch } from "antd";
import { Title } from "../../common/Typography";
import { getRangeDate } from "../../utils";

const Wrapper = styled.div`
  width: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SwitchWrapper = styled.div`
  display: flex;
  grid-gap: 12px;
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

type Props = {
  autoPay: boolean;
  name: string;
  period?: number;
  id: number;
  price: number;
  count: number;
  start?: number;
  end?: number;
  onChangeAutoPay: ({ id, type }: { id: number; type: string }) => void;
};

export const TariffItemCampaign = ({
  onChangeAutoPay,
  autoPay,
  name,
  period,
  price,
  count,
  id,
  start,
  end,
}: Props) => {
  const handleChangeAutoPay = () => {
    onChangeAutoPay({ id, type: "campaign" });
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
            maxWidth: "300px",
          }}
        >
          {name}
        </Title>
        <Title style={{ fontSize: 14, fontWeight: "400" }}>
          {!period ? getRangeDate({ start, end }) : <>~ {period} мес.</>}
        </Title>
      </Row>
      {
        <Row style={{ marginBottom: 20 }}>
          <Card1>
            <Title
              style={{ fontSize: 14, fontWeight: "400", color: "#FFFFFF" }}
            >
              Количество отзывов
            </Title>
            <Title level={4} style={{ color: "#FFFFFF", fontWeight: "800" }}>
              {count}
            </Title>
          </Card1>
          <Card2>
            <Title
              style={{ fontSize: 14, fontWeight: "400", color: "#8E8E8E" }}
            >
              Стоимость за отзыв
            </Title>
            <Title level={4} style={{ fontWeight: "800" }}>
              {price} р
            </Title>
          </Card2>
          <Card3>
            <Title style={{ fontSize: 14, fontWeight: "400" }}>
              Общая стоимость
            </Title>
            <Title level={4} style={{ color: "#1579E9", fontWeight: "800" }}>
              {price * count}
            </Title>
          </Card3>
        </Row>
      }
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
