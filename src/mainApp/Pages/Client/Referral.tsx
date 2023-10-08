import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Radio } from "antd";
import { useState } from "react";
import { optionsReferral } from "../../../constants";
import { OptionsReferral } from "../../../types";
import { TableStatisticsReferral } from "../../Table/TableStatisticsReferral";
import { InputReferral, ExportMoney, Conditions } from "../../components/Referral";

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
      {option === "paymentStatistics" && <TableStatisticsReferral />}
      {option === "exportMoney" && <ExportMoney />}
      {option === "conditions" && <Conditions />}
    </Page>
  );
};

export default Referral;
