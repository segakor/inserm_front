import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { optionsRefferal } from "../../../constants";
import { TableReferralListAdmin } from "../../Table/TableReferralListAdmin";
import { TableReferralConclusionAdmin } from "../../Table/TableReferralConclusionAdmin";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Referral = () => {
  const [activeTab, setActiveTab] = useState<"base" | "conclusion">("base");

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setActiveTab(value);
  };

  return (
    <Page>
      <Header>Реферальная программа</Header>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionsRefferal}
        onChange={onChange}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      {activeTab === "base" && <TableReferralListAdmin />}
      {activeTab === "conclusion" && <TableReferralConclusionAdmin />}
    </Page>
  );
};

export default Referral;
