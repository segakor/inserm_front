import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Radio } from "antd";
import { useState } from "react";
import { optionsReferral } from "../../../constants";
import { OptionsReferral } from "../../../types";
import {
  InputReferral,
  ExportMoney,
  PaymentStatistics,
} from "../../components/Referral";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Referral = () => {
  const [option, setOption] = useState<OptionsReferral>("getLink");

  return (
    <Page>
      <Header>Партнерская программа</Header>
      <Radio.Group
        options={optionsReferral}
        onChange={(e) => setOption(e.target.value)}
        value={option}
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: "46px" }}
      />

      {option === "getLink" && <InputReferral />}
      {option === "paymentStatistics" && <PaymentStatistics />}
      {option === "exportMoney" && <>exportMoney</>}
    </Page>
  );
};

export default Referral;
