import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { DetailsCardHostStatistics } from "../../components/Card";
import { useHostStatistics } from "../../hooks/useHostStatistics";
import { TableHostStatistics } from "../../Table/TableHostStatistics";
import { DatePicker } from "../../components/DatePicker";
import { Radio, RadioChangeEvent } from "antd";
import { optionsStatistics } from "../../../constants";
import { useState } from "react";
import { DetailsCardFinanceStatistics } from "../../components/Card/DetailsCardFinanceStatistics";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Statistics = () => {
  const {
    isLoading,
    isLoadingF,
    statistics,
    handleGetHostStatistics,
    handleGetFinanceStatistics,
    finance,
  } = useHostStatistics();

  const [activeTab, setActiveTab] = useState<"host" | "finance">("host");

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setActiveTab(value);
  };

  const onChangePeriod = (e: any) => {
    handleGetHostStatistics(e);
    handleGetFinanceStatistics(e);
  };

  return (
    <Page>
      <Header>Статистика</Header>
      <Radio.Group
        style={{ marginBottom: 16 }}
        options={optionsStatistics}
        onChange={onChange}
        value={activeTab}
        optionType="button"
        buttonStyle="solid"
      />
      <DatePicker
        onGetRange={onChangePeriod}
        isLoading={isLoading || isLoadingF}
      />
      {activeTab === "host" && (
        <>
          <DetailsCardHostStatistics {...statistics} isLoading={isLoading} />
          <TableHostStatistics
            hosts={statistics?.hosts}
            isLoading={isLoading}
          />
        </>
      )}
      {activeTab === "finance" && (
        <DetailsCardFinanceStatistics
          revenue={finance?.revenue}
          totalPrice={finance?.totalPrice}
          isLoading={isLoadingF}
        />
      )}
    </Page>
  );
};

export default Statistics;
