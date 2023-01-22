import React from "react";
import { Select } from "antd";

export const StatusSelect = ({
  defaultValue,
  onSelect,
  onlyModerate,
}: {
  defaultValue: string;
  onSelect: (e: string) => void;
  onlyModerate?: boolean;
}) => {
  const items = [
    {
      status: "success",
      label: "Опубликовано",
    },
    {
      status: "moderate",
      label: "На модерации",
    },
    {
      status: "delete",
      label: "Удалено",
    },
    {
      status: "reject",
      label: "Не прошло",
    },
    {
      status: "wait",
      label: "В очереди",
    },
  ];

  const itemOnlyModerate = [
    {
      status: "moderate",
      label: "На модерации",

    },
    {
      status: "wait",
      label: "В очереди",
    },
  ];

  const option = !onlyModerate
    ? items.map((item) => ({ label: item.label, value: item.status }))
    : itemOnlyModerate.map((item) => ({
      label: item.label,
      value: item.status,
    }));

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 115 }}
      onChange={onSelect}
      options={option}
    />
  );
};
