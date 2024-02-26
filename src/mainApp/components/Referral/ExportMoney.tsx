import styled from "styled-components";
import { Title } from "../../../common/Typography";
import { Button } from "antd";
import { useEffect } from "react";
import { useReferral } from "../../hooks/useReferral";
import { TableReferralConclusion } from "../../Table/TableReferralConclusion";

const FooterCardAmount = styled.div`
  height: 50px;
  border-radius: 10px;
  padding: 8px 20px 20px 20px;
  background: #1579e9;
  min-width: 180px;
  color: white;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const FooterCardPrice = styled(FooterCardAmount)`
  background-color: transparent;
  border: 2px solid #1579e9;
`;

const FooterButton = styled(Button)`
  background: #1579e9;
  border-radius: 10px;
  height: 50px;
  min-width: 360px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  grid-gap: 16px;
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    grid-gap: 10px;
    flex-direction: column;
  }
`;

export const ExportMoney = () => {
  const {
    handleGetPartnerOrderList,
    orderList,
    handleCreateСonclusion,
    isLoading,
  } = useReferral();

  useEffect(() => {
    handleGetPartnerOrderList();
  }, []);

  const disabledButton = orderList?.orders.find(
    (item) => item.status === "wait"
  );

  return (
    <>
      <FooterWrapper>
        <FooterCardPrice>
          <Title level={5} style={{ color: "black", fontSize: 10 }}>
            Баланс:
          </Title>
          <Title level={5} style={{ color: "black" }}>
            {orderList?.balance} ₽
          </Title>
        </FooterCardPrice>
        <FooterButton
          onClick={() => handleCreateСonclusion()}
          disabled={!!disabledButton}
        >
          <div style={{ color: "white" }}>Вывод денежных средств</div>
        </FooterButton>
      </FooterWrapper>
      <div style={{ marginBottom: "16px" }}>Статистика</div>
      <TableReferralConclusion
        orders={orderList?.orders || []}
        isLoading={isLoading.table}
      />
    </>
  );
};
