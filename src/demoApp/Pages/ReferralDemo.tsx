import styled from "styled-components";

import { Radio } from "antd";
import { useState } from "react";
import { OptionsReferral } from "../../types";
import { Header } from "../../common/Typography";
import { optionsReferral } from "../../constants";
import { InputReferral } from "../../mainApp/components/Referral/InputReferral";
import { TableReferralList } from "../../mainApp/Table/TableReferralList";
import { ExportMoney } from "../../mainApp/components/Referral";
import { referralData } from "../constants";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const { referralList, isLoading, orderList } = referralData;

export const ReferralDemo = () => {
  const [option, setOption] = useState<OptionsReferral>("paymentStatistics");

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

      {option === "getLink" && (
        <InputReferral referralLink={"https://inserm.ru?referral=123123"} />
      )}
      {option === "paymentStatistics" && (
        <TableReferralList referralList={referralList} isLoading={isLoading} />
      )}
      {option === "exportMoney" && (
        <ExportMoney
          orderList={orderList}
          isLoading={isLoading}
          onCreateСonclusion={() => console.log()}
          onCreatePartnerPayment={() => console.log()}
          partnerPayment={null}
        />
      )}
    </Page>
  );
};
