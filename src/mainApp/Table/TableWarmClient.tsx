import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { WarmClient } from "../../types";
import { getDate } from "../../utils";

type TableItem = WarmClient & {
  key: string;
};

type Props = {
  warmClient: TableItem[] | undefined;
  isLoading: boolean;
};

export const TableWarmClient = ({ warmClient, isLoading }: Props) => {
  const columns: ColumnsType<TableItem> = [
    { title: "Почта", dataIndex: "email" },
    { title: "Проект", dataIndex: "projectName" },
    { title: "Цена", dataIndex: "price" },
    {
      title: "Дата",
      dataIndex: "date",
      render: (record: number) => {
        return <>{getDate({ date: record })}</>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={warmClient}
      bordered
      pagination={false}
      loading={isLoading}
      tableLayout={"fixed"}
      locale={{ emptyText: "Нет данных" }}
    />
  );
};
