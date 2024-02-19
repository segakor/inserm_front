import { TableReferralStatistics } from "../../Table/TableReferralStatistics";
import { DatePicker } from "../DatePicker";

export const PaymentStatistics = () => {
  return (
    <>
      <DatePicker onGetRange={(e) => console.log(e)} />
      <TableReferralStatistics/>
    </>
  );
};
