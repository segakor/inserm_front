import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetAllClient } from "../../hooks/useGetAllClient";
import { TableAllClient } from "../../Table/TableAllClient";
import { useGetWarmClient } from "../../hooks/useGetWarmClient";
import { TableWarmClient } from "../../Table/TableWarmClient";
import { Radio, RadioChangeEvent } from "antd";
import { DatePicker } from "../../components/DatePicker";
import { TableCashlessTransfer } from "../../Table/TableCashlessTransfer";
import { TableClientIdea } from "../../Table/TableClientIdea";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const optionsWithDisabled = [
  { label: "Все клиенты", value: "allClient" },
  { label: "Заявки безнала", value: "cashless" },
  { label: "Неоплаченные заявки", value: "warmClient" },
  { label: "Идеи", value: "idea" },
];

const ClientBase = () => {
  const [activeTab, setActiveTab] = useState<
    "allClient" | "warmClient" | "cashless" | "idea"
  >("allClient");
  const { isLoading, allClient } = useGetAllClient();

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
        options={optionsWithDisabled}
        onChange={onChange}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      {activeTab === "allClient" && (
        <TableAllClient allClient={allClient} isLoading={isLoading} />
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
