import React from "react";
import { Select } from "antd";

export const StatusSelect = ({ defaultValue, onSelect }: { defaultValue: string; onSelect: (e: string) => void }) => {

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
  ]

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 115 }}
      onChange={onSelect}
      options={items.map((item) => ({ label: item.label, value: item.status }))}
    />
  );
};
