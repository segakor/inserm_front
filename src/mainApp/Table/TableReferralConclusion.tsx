import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Idea } from "../../types";

type TableItem = Idea & {
  key: string;
};

export const TableReferralConclusion = () => {

  const columns: ColumnsType<TableItem> = [
    {
      title: "Email партнера",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Реквизиты",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Сумма выплаты",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Статус",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      /* dataSource={data} */
      bordered
      pagination={false}
      tableLayout={"fixed"}
      locale={{ emptyText: "Нет данных" }}
      scroll={{ x: 900 }}
    />
  );
};
