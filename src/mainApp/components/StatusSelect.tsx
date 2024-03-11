import { Select } from "antd";
import { statusReviews, statusRemovedReviews } from "../../constants";

export const StatusSelect = ({
  defaultValue,
  onSelect,
  isRemoved,
}: {
  defaultValue: string;
  onSelect: (e: string) => void;
  isRemoved?: boolean;
}) => {
  const option = statusReviews.map((item) => ({
    label: item.label,
    value: item.status,
  }));

  const optionRemoved = statusRemovedReviews
    .map((item) => ({
      label: item.label,
      value: item.status,
    }))
    .filter((item) => item.value !== "not");

  return (
    <Select
      defaultValue={defaultValue}
      onChange={onSelect}
      options={!isRemoved ? option : optionRemoved}
    />
  );
};
