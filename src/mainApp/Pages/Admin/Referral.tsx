import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { optionsRefferal } from "../../../constants";
import { TableReferralList } from "../../Table/TableReferralList";
import { TableReferralConclusion } from "../../Table/TableReferralConclusion";

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
      {activeTab === "base" && <TableReferralList />}
      {activeTab === "conclusion" && <TableReferralConclusion />}
    </Page>
  );
};

export default Referral;
