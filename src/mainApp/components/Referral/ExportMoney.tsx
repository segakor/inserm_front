import styled from "styled-components";
import { Title } from "../../../common/Typography";
import { Button } from "antd";
import { TableReferralConclusion } from "../../Table/TableReferralConclusion";
import { FormPartnerPayment } from "../../Form/FormPartnerPayment";
import { PartnerOrderList, PartnerPayment } from "../../../types";

const CardBalance = styled.div`
  height: 50px;
  border-radius: 10px;
  padding: 8px 20px 20px 20px;
  background: #1579e9;
  min-width: 180px;
  color: white;
  @media (max-width: 768px) {
    width: auto;
  }
  background-color: transparent;
  border: 2px solid #1579e9;
`;

const StyledButton = styled(Button)`
  background: #1579e9;
  border-radius: 10px;
  height: 50px;
  min-width: 360px;
  @media (max-width: 1200px) {
    width: 100%;
    min-width: auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  grid-gap: 16px;
  margin-bottom: 30px;
  margin-top: 28px;
  @media (max-width: 1200px) {
    grid-gap: 10px;
    flex-direction: column;
  }
`;

type Props = {
  isLoading: {
    table: boolean;
    button: boolean;
    form: boolean;
  };
  orderList?: PartnerOrderList;
  onCreateСonclusion: () => void;
  onCreatePartnerPayment: (value: PartnerPayment) => void;
  partnerPayment: (PartnerPayment & { id: number }) | null;
};

export const ExportMoney = ({
  isLoading,
  orderList,
  partnerPayment,
  onCreateСonclusion,
  onCreatePartnerPayment,
}: Props) => {
  
  const disabledButton =
    orderList?.orders.find((item) => item.status === "wait") ||
    !partnerPayment?.id ||
    !orderList?.balance;

  return (
    <>
      <div style={{ margin: "0 0 28px 0" }}>
        Чтобы вывести денежные средства, заполните форму с реквизитами и нажмите
        на кнопку <b>Вывод денежных средств.</b>
      </div>
      <FormPartnerPayment
        onCreatePartnerPayment={onCreatePartnerPayment}
        isLoading={isLoading.form}
        partnerPayment={partnerPayment}
      />
      <Wrapper>
        <CardBalance>
          <Title level={5} style={{ color: "black", fontSize: 10 }}>
            Баланс:
          </Title>
          <Title level={5} style={{ color: "black" }}>
            {orderList?.balance?.toLocaleString()} ₽
          </Title>
        </CardBalance>
        <StyledButton onClick={onCreateСonclusion} disabled={!!disabledButton}>
          <div style={{ color: "white" }}>Вывод денежных средств</div>
        </StyledButton>
      </Wrapper>
      <div style={{ marginBottom: "16px" }}>История выводов</div>
      <TableReferralConclusion
        orders={orderList?.orders || []}
        isLoading={isLoading.table}
      />
    </>
  );
};
