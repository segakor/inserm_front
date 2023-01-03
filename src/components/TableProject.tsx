import React, { useState } from "react";
import { Table, Modal, Input, ConfigProvider, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import useBreakpoint from "use-breakpoint";
import { StatusComponent } from "./StatusComponent";
import { Title } from "./Typography";
import { Reviews } from "../type";
import { getDate } from "../utils/getDate";

const { TextArea } = Input;

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

type ReviewsTableItem = Reviews & {
  key: string;
};

const columns: ColumnsType<ReviewsTableItem> = [
  {
    title: "№",
    dataIndex: "key",
    width: 30,
    render: (record: string) => {
      return (
        <>{Number(record) + 1}</>
      )
    }
  },
  {
    title: "Ссылка на отзыв",
    dataIndex: "link",
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a onClick={() => window.open(text, "_blank")}>{text}</a>,
    width: 230,
    ellipsis: true,
  },
  {
    title: "Текст отзыва",
    dataIndex: "text",
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
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ReviewsTableItem | undefined>();

  const handleOpen = (row: any) => {
    setIsModalOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedRow(undefined);
  };

  const mobileColumns: ColumnsType<ReviewsTableItem> = [
    {
      title: "№",
      dataIndex: "key",
      width: 30,
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "link",
      render: (text) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => window.open(text, "_blank")}>{text}</a>
      ),
      width: 200,
      ellipsis: true,
    },
    {
      title: "Детали",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (row) => <a onClick={() => handleOpen(row)}>Смотреть</a>,
    },
  ];

  return (
    <>
      <ConfigProvider renderEmpty={() => <Empty description="Нет данных" />}>
        <Table
          columns={breakpoint === "mobile" ? mobileColumns : columns}
          dataSource={reviews}
          size="small"
          bordered
          pagination={false}
          style={{ marginBottom: 30 }}
          loading={isLoading}
        />
      </ConfigProvider>
      <Modal
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
        width={1000}
        bodyStyle={{ overflowY: "auto" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <Title level={5}>Текст отзыва</Title>
          <TextArea
            autoSize
            value={selectedRow?.text}
            style={{ minHeight: 200 }}
            disabled
          />
        </div>
        <div style={{ marginBottom: "24px" }}>
          <Title level={5}>Статус отзыва</Title>
          <StatusComponent status={selectedRow?.status || ""} />
        </div>
        <div>
          <Title level={5}>Дата размещения</Title>
          <p>{selectedRow?.date}</p>
        </div>
      </Modal>
    </>
  );
};
