import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import { optionsReferral } from "../../../constants";
import { OptionsReferral } from "../../../types";
import { InputReferral, ExportMoney } from "../../components/Referral";
import { useReferral } from "../../hooks/useReferral";
import { TableReferralList } from "../../Table/TableReferralList";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Referral = () => {
  const [option, setOption] = useState<OptionsReferral>("getLink");

  const {
    referralLink,
    referralList,
    isLoading,
    orderList,
    partnerPayment,
    handleGetLink,
    handleGetReferralList,
    handleGetPartnerOrderList,
    handleCreateСonclusion,
    handelCreatePartnerPayment,
    handelGetPartnerPayment
  } = useReferral();

  useEffect(() => {
    handleGetLink();
    handleGetReferralList();
    handleGetPartnerOrderList();
    handelGetPartnerPayment(0);
  }, []);

  return (
    <Page>
      <Header>Партнерская программа</Header>
      <Radio.Group
        options={optionsReferral}
        onChange={(e) => setOption(e.target.value)}
        value={option}
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: "30px" }}
      />

      {option === "getLink" && <InputReferral referralLink={referralLink} />}
      {option === "paymentStatistics" && (
        <TableReferralList referralList={referralList} isLoading={isLoading} />
      )}
      {option === "exportMoney" && (
        <ExportMoney
          orderList={orderList}
          isLoading={isLoading}
          onCreateСonclusion={handleCreateСonclusion}
          onCreatePartnerPayment={handelCreatePartnerPayment}
          partnerPayment={partnerPayment}
        />
      )}
    </Page>
  );
};

export default Referral;
