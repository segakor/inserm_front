import styled from "styled-components";
import { Switch } from "antd";
import { Title } from "../../common/Typography";

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
const SwitchWrapper = styled.div`
  display: flex;
  grid-gap: 12px;
`;

type Props = {
  onChangeAutoPay?: (e: boolean) => void;
  autoPay?: boolean;
};

export const TariffItemCampaign = ({ onChangeAutoPay, autoPay }: Props) => {
  return (
    <Wrapper>
      <Row style={{ marginBottom: 40 }}>
        <Title level={4} style={{ fontWeight: "800" }}>
          Тариф “Поштучный”
        </Title>
      </Row>
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
    </Wrapper>
  );
};
