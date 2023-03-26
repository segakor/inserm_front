import React from "react";
import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";
import { DetailsCardHostStatistics } from "../../components/DetailsCardHostStatistics";
import { useHostStatistics } from "../../hooks/useHostStatistics";
import { TableHostStatistics } from "../../Table/TableHostStatistics";
import { DatePicker } from "antd";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/ru_RU";
import { toUnixDate } from "../../../utils/getDate";

const { RangePicker } = DatePicker;

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const RangeWrapper = styled.div`
  display: flex;
  grid-gap: 12px;
  margin-bottom: 16px;
  align-items: center;
`;

export const HostStatistics = () => {
  const { isLoading, statistics, handleGetHostStatistics } =
    useHostStatistics();

  const onChangeCalendar = (e: any) => {
    if (e) {
      handleGetHostStatistics({
        start: toUnixDate(e[0].$d),
        end: toUnixDate(e[1].$d),
      });
    }
  };

  return (
    <Page>
      <Header>Статистика по сотрудникам</Header>
      <RangeWrapper>
        <Title level={5}>Выбрать период</Title>
        <RangePicker locale={locale} onChange={(e) => onChangeCalendar(e)} />
      </RangeWrapper>
      <DetailsCardHostStatistics {...statistics} />
      <TableHostStatistics hosts={statistics?.hosts} isLoading={isLoading} />
    </Page>
  );
};
