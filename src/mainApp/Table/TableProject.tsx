import React from "react";
import { Table, ConfigProvider, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Reviews } from "../../type";
import { getDate } from "../../utils/getDate";
import { StatusComponent } from "../components/StatusComponent";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

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
    width: "18%",
  },
  {
    title: "Текст отзыва",
    dataIndex: "text",
    width: "45%",
  },
  {
    title: "Статус отзыва",
    dataIndex: "status",
    render: (status: string) => <StatusComponent status={status} />,
    width: 130,
  },
  {
    title: "Дата размещения",
    dataIndex: "date",
    width: 120,
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
  const { xs } = useBreakpoint();

  const isMobile = xs;

  return (
    <>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description="Отзывы в процессе написания, скоро они будут готовы" />
        )}
      >
        <Table
          columns={columns}
          dataSource={reviews}
          size="small"
          bordered
          pagination={false}
          style={{ marginBottom: 30 }}
          loading={isLoading}
          {...(isMobile && { scroll: { x: 800, y: 1000 } })}
          tableLayout={"fixed"}
        />
      </ConfigProvider>
    </>
  );
};
