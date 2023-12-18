import styled from "styled-components";
import { DatePicker as DatePickerAntd } from "antd";
import { Title } from "../../common/Typography";
import { toUnixDate } from "../../utils";
import moment from "moment";

import "dayjs/locale/ru";
import locale from "antd/es/locale/ru_RU";

const RangeWrapper = styled.div`
  display: flex;
  grid-gap: 12px;
  margin-bottom: 16px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`;

const StyledRangePickerContainer = styled.div`
  @media (max-width: 576px) {
    .ant-picker-panels {
      flex-direction: column !important;
    }
  }
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
      <Title level={5}>Выберете период</Title>
      <RangePicker
        panelRender={(panelNode) => (
          <StyledRangePickerContainer>{panelNode}</StyledRangePickerContainer>
        )}
        format={"DD-MM-YYYY"}
        locale={locale.DatePicker}
        size="large"
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
