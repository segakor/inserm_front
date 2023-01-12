import React from "react";
import { Table, ConfigProvider, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StatusComponent } from "../StatusComponent";
import { Reviews } from "../../type";
import { getDate } from "../../utils/getDate";

type ReviewsTableItem = Reviews & {
  key: string;
};

const columns: ColumnsType<ReviewsTableItem> = [
  {
    title: "№",
    dataIndex: "key",
    width: "4%",
    render: (record: string) => {
      return <>{Number(record) + 1}</>;
    },
  },
  {
    title: "Ссылка на отзыв",
    dataIndex: "link",
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a onClick={() => window.open(text, "_blank")}>{text}</a>,
    width: "20%",
  },
  {
    title: "Текст отзыва",
    dataIndex: "text",
    width: "40%",
  },
  {
    title: "Статус отзыва",
    dataIndex: "status",
    render: (status: string) => <StatusComponent status={status} />,
    width: 150,
  },
  {
    title: "Дата размещения",
    dataIndex: "date",
    width: 150,
    render: (record: string | number) => {
      return (
        <>{typeof record === "number" ? getDate({ date: record }) : record}</>
      );
    },
  },
];

type Props = {
  reviews: ReviewsTableItem[] | undefined;
  isLoading: boolean;
};

export const TableProject = ({ reviews, isLoading }: Props) => {
  return (
    <>
      <ConfigProvider renderEmpty={() => <Empty description="Нет данных" />}>
        <Table
          columns={columns}
          dataSource={reviews}
          size="small"
          bordered
          pagination={false}
          style={{ marginBottom: 30 }}
          loading={isLoading}
          tableLayout={"fixed"}
        />
      </ConfigProvider>
    </>
  );
};
