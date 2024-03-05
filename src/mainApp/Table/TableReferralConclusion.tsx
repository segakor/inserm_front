import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getDate } from "../../utils";

type Order = {
  date: number;
  price: number;
  status: string;
  id: number;
};

type TableItem = Order;

type Props = {
  isLoading: boolean;
  orders: Order[];
};

export const TableReferralConclusion = ({ orders, isLoading }: Props) => {
  const columns: ColumnsType<TableItem> = [
    {
      title: "Сумма вывода",
      render: (record: TableItem) => {
        return <>{record.price}</>;
      },
    },
    {
      title: "Дата запроса",
      render: (record: TableItem) => {
        return <>{getDate({ date: record.date })}</>;
      },
    },
    {
      title: "Статус",
      render: (record: TableItem) => {
        return (
          <div
            style={{ color: record.status === "wait" ? "#1680ee" : "#1bbd3f" }}
          >
            {record.status === "wait" ? "В процессе" : "Выплачено"}
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      bordered
      pagination={false}
      tableLayout={"fixed"}
      locale={{ emptyText: "Нет данных" }}
      scroll={{ x: 900 }}
      loading={isLoading}
    />
  );
};
