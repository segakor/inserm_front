import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { TableAllClient } from "../../Table/TableAllClient";
import { useGetWarmClient } from "../../hooks/useGetWarmClient";
import { TableWarmClient } from "../../Table/TableWarmClient";
import { Radio, RadioChangeEvent } from "antd";
import { DatePicker } from "../../components/DatePicker";
import { TableCashlessTransfer } from "../../Table/TableCashlessTransfer";
import { TableClientIdea } from "../../Table/TableClientIdea";
import { optionsClientBase } from "../../../constants";
import { OptionsClientBase } from "../../../types";
import { TableStatisticsReferral } from "../../Table/TableStatisticsReferral";
import { useReferral } from "../../hooks/useReferral";
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

  const { handleGetReferralList, referralList } = useReferral();

  useEffect(() => {
    handleGetReferralList();
  }, []);

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
        <TableAllClient />
      )}
      {activeTab === "allClientNew" && (
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
      {activeTab === "referral" && (
        <>
          <TableStatisticsReferral isAdmin/>
        </>
      )}
    </Page>
  );
};

export default ClientBase;
