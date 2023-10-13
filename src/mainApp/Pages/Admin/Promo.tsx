import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { TablePromo } from "../../Table/TablePromo";
import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { optionsPromo } from "../../../constants";
import { TablePromoStatistics } from "../../Table/TablePromoStatistics";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Promo = () => {
  const [activeTab, setActiveTab] = useState<"promo" | "promoStatistics">(
    "promo"
  );

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setActiveTab(value);
  };

  return (
    <Page>
      <Header>Промокоды</Header>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionsPromo}
        onChange={onChange}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      {activeTab === "promo" && <TablePromo />}
      {activeTab === 'promoStatistics' && <TablePromoStatistics/>}
    </Page>
  );
};

export default Promo;
