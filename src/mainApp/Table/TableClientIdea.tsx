import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Idea } from "../../types";
import { getDate } from "../../utils";
import { useIdea } from "../hooks/useIdea";
import { useEffect } from "react";

type TableItem = Idea & {
  key: string;
};

export const TableClientIdea = () => {
  const { handleGetIdea, data } = useIdea();

  useEffect(() => {
    handleGetIdea();
  }, []);

  const columns: ColumnsType<TableItem> = [
    {
      title: "Дата",
      dataIndex: "date",
      width: '10%',
      render: (record: number) => {
        return <>{getDate({ date: record })}</>;
      },
    },
    {
      title: "Клиент",
      width: "30%",
      dataIndex: "user",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
    {
      title: "Идея",
      width: "50%",
      dataIndex: "text",
      render: (record: string) => {
        return <>{record}</>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}
      tableLayout={"fixed"}
      locale={{ emptyText: "Нет данных" }}
      scroll={{ x: 900 }}
    />
  );
};
