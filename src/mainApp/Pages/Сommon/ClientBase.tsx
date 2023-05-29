import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetAllClient } from "../../hooks/useGetAllClient";
import { TableAllClient } from "../../Table/TableAllClient";
import { useGetWarmClient } from "../../hooks/useGetWarmClient";
import { TableWarmClient } from "../../Table/TableWarmClient";
import { Radio, RadioChangeEvent } from "antd";
import { DatePicker } from "../../components/DatePicker";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const optionsWithDisabled = [
  { label: "Все клиенты", value: "allClient" },
  { label: "Неоплаченные заявки", value: "warmClient" },
];

const ClientBase = () => {
  const [activeTab, setActiveTab] = useState<"allClient" | "warmClient">(
    "allClient"
  );
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
      {activeTab === "warmClient" && (
        <>
          <DatePicker onGetRange={(e) => handleGetWarmClient(e)} />
          <TableWarmClient warmClient={warmClient} isLoading={isLoadingWarm} />
        </>
      )}
    </Page>
  );
};

export default ClientBase;