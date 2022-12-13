import React, { useState } from "react";
import { Table, Modal, Form, Input, ConfigProvider, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import useBreakpoint from "use-breakpoint";
import { StatusComponent } from "./StatusComponent";
import { Title } from "./Typography";
import { Reviews } from "../type";
import { createDataTable } from "../utils/createDataTable";

const { TextArea } = Input;

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

interface DataType {
  id: string;
  href: string;
  text: string;
  status: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
    width: 30,
  },
  {
    title: "Ссылка на отзыв",
    dataIndex: "href",
    key: "href",
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a onClick={() => window.open(text, "_blank")}>{text}</a>,
    width: 230,
    ellipsis: true,
  },
  {
    title: "Текст отзыва",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "Статус отзыва",
    dataIndex: "status",
    key: "status",
    render: (status: string) => <StatusComponent status={status} />,
    width: 150,
  },
  {
    title: "Дата размещения",
    dataIndex: "date",
    key: "date",
    width: 150,
  },
];

type Props = {
  reviews: Reviews[] | undefined;
  isLoading: boolean;
};

export const TableProject = ({ reviews, isLoading }: Props) => {
  const [form] = Form.useForm();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataType | undefined>();

  const handleOpen = (row: any) => {
    setIsModalOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedRow(undefined);
  };

  const mobileColumns: ColumnsType<DataType> = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: 30,
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "href",
      key: "href",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text) => (
        <a onClick={() => window.open(text, "_blank")}>{text}</a>
      ),
      width: 200,
      ellipsis: true,
    },
    {
      title: "Детали",
      key: "details",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (row) => <a onClick={() => handleOpen(row)}>Смотреть</a>,
    },
  ];

  return (
    <>
      <ConfigProvider renderEmpty={() => <Empty description="Нет данных" />}>
        <Table
          columns={breakpoint === "mobile" ? mobileColumns : columns}
          dataSource={createDataTable(reviews)}
          size="small"
          bordered
          pagination={false}
          style={{ marginBottom: 30 }}
          loading={isLoading}
        /* locale={{ emptyText: 'Нет данных' }} */
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
        <Form layout={"vertical"} form={form}>
          <Form.Item label={<Title level={5}>Детали</Title>}>
            <TextArea
              autoSize
              value={selectedRow?.text}
              style={{ minHeight: 200 }}
            />
          </Form.Item>
        </Form>
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
