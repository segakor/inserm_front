import styled from "styled-components";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/ru_RU";
import { DatePicker as DatePickerAntd } from "antd";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { Title } from "../../common/Typography";
import { toUnixDate } from "../../utils";
import moment from "moment";

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
      const start = toUnixDate(moment(e[0].$d).startOf("day").toDate());
      const end = toUnixDate(moment(e[1].$d).endOf("day").toDate());

      onGetRange({
        start,
        end,
      });
    }
  };

  return (
    <RangeWrapper>
      <Title level={5}>Выбрать период</Title>
      <RangePicker
        format={"DD-MM-YYYY"}
        locale={locale}
        onChange={(e) => onChangeCalendar(e)}
        disabledDate={(current) => {
          let customDate = moment().format("DD-MM-YYYY");
          return (
            current && current > moment(customDate, "DD-MM-YYYY").add(1, "day")
          );
        }}
      />
    </RangeWrapper>
  );
};
