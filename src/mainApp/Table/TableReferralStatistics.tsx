import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Idea } from "../../types";

type TableItem = Idea & {
  key: string;
};

export const TableReferralStatistics = () => {

  const columns: ColumnsType<TableItem> = [
    {
      title: "ID клиента",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Дата регистрации",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Список ID проектов",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Сумма, которую привлек клиент",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Комиссия реферала",
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
