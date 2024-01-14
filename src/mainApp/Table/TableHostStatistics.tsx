import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Host } from "../../types";

type TableItem = Host & {
  key: string;
};

type Props = {
  hosts: TableItem[] | undefined;
  isLoading: boolean;
};

export const TableHostStatistics = ({ hosts, isLoading }: Props) => {
  const columns: ColumnsType<TableItem> = [
    { title: "Имя сотрудника", dataIndex: "name" },
    { title: "Количество отзывов", dataIndex: "publicated" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={hosts}
      bordered
      pagination={false}
      loading={isLoading}
      tableLayout={"fixed"}
      locale={{ emptyText: "Нет данных" }}
    />
  );
};
