import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetWarmClient } from "../../hooks/useGetWarmClient";
import { TableWarmClient } from "../../Table/TableWarmClient";
import { Radio, RadioChangeEvent } from "antd";
import { DatePicker } from "../../components/DatePicker";
import { TableCashlessTransfer } from "../../Table/TableCashlessTransfer";
import { TableClientIdea } from "../../Table/TableClientIdea";
import { optionsClientBase } from "../../../constants";
import { OptionsClientBase } from "../../../types";
import { TableAllClientNew } from "../../Table/TableAllClientNew";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ClientBase = () => {
  const [activeTab, setActiveTab] = useState<OptionsClientBase>("allClient");

  const {
    isLoading: isLoadingWarm,
    warmClient,
    handleGetWarmClient,
  } = useGetWarmClient();

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setActiveTab(value);
  };

  return (
    <Page>
      <Header>База клиентов</Header>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionsClientBase}
        onChange={onChange}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      {activeTab === "allClient" && (
        <TableAllClientNew />
      )}
      {activeTab === "cashless" && <TableCashlessTransfer />}
      {activeTab === "warmClient" && (
        <>
          <DatePicker onGetRange={(e) => handleGetWarmClient(e)} />
          <TableWarmClient warmClient={warmClient} isLoading={isLoadingWarm} />
        </>
      )}
      {activeTab === "idea" && (
        <>
          <TableClientIdea />
        </>
      )}
    </Page>
  );
};

export default ClientBase;
