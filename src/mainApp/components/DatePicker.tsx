import styled from "styled-components";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/ru_RU";
import { DatePicker as DatePickerAntd } from "antd";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { Title } from "../../common/Typography";
import { toUnixDate } from "../../utils";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const RangeWrapper = styled.div`
  display: flex;
  grid-gap: 12px;
  margin-bottom: 16px;
  align-items: center;
`;

const { RangePicker } = DatePickerAntd;

type Props = {
  onGetRange: (e: { start: number; end: number }) => void;
};

export const DatePicker = ({ onGetRange }: Props) => {
  const onChangeCalendar = (e: any) => {
    if (e) {
      onGetRange({
        start: toUnixDate(e[0].$d),
        end: toUnixDate(e[1].$d),
      });
    }
  };

  return (
    <RangeWrapper>
      <Title level={5}>Выбрать период</Title>
      <RangePicker locale={locale} onChange={(e) => onChangeCalendar(e)} />
    </RangeWrapper>
  );
};
