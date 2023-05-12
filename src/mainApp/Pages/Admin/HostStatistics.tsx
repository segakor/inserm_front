import React from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { DetailsCardHostStatistics } from "../../components/DetailsCardHostStatistics";
import { useHostStatistics } from "../../hooks/useHostStatistics";
import { TableHostStatistics } from "../../Table/TableHostStatistics";
import { DatePicker } from "../../components/DatePicker";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HostStatistics = () => {
  const { isLoading, statistics, handleGetHostStatistics } =
    useHostStatistics();

  return (
    <Page>
      <Header>Статистика по сотрудникам</Header>
      <DatePicker onGetRange={(e) => handleGetHostStatistics(e)} />
      <DetailsCardHostStatistics {...statistics} />
      <TableHostStatistics hosts={statistics?.hosts} isLoading={isLoading} />
    </Page>
  );
};
