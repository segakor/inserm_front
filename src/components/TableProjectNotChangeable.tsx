import React, { useState, useEffect } from "react";
import {
  Form,
  Table,
  Checkbox,
  ConfigProvider,
  Empty,
  Tooltip,
} from "antd";
import { StatusComponent } from "./StatusComponent";
import { Reviews } from "../type";
import { getDate } from "../utils/getDate";

type Props = {
  reviews: ReviewsTableItem[] | undefined;
  isLoading: boolean;
};

type ReviewsTableItem = Reviews & {
  key: string;
};

export const TableProjectNotChangeable = ({
  reviews,
  isLoading,
}: Props) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(reviews);

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      width: "2%",
      render: (record: string) => {
        return <>{Number(record) + 1}</>;
      },
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "link",
      width: "15%",
      render: (text: string) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => window.open(text, "_blank")}>{text}</a>
      ),
    },
    {
      title: "Текст отзыва",
      dataIndex: "text",
      width: "200px",
      render: (text: string) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <div style={{ width: "200px" }}>{text}</div>
      ),
    },
    {
      title: "Статус отзыва",
      dataIndex: "status",
      width: "10%",
      render: (status: string) => {
        return <StatusComponent status={status} />;
      },
    },
    {
      title: "Дата размещения",
      dataIndex: "date",
      width: "10%",
      render: (record: string | number) => {
        return (
          <>{typeof record === "number" ? getDate({ date: record }) : record}</>
        );
      },
    },
    {
      title: "Кто отдал отзыв",
      dataIndex: "host",
      width: "10%",
    },
    {
      title: "Имя в телеграм",
      dataIndex: "tg",
      width: "10%",
    },
    {
      title: "В работе",
      dataIndex: "in_work",
      width: "8%",
      render: (_: any, record: ReviewsTableItem) => {
        return (
          <Tooltip title="В работу можно отдать только отзывы со статусом 'на модерации'">
            <Checkbox
              disabled
              {...(record.in_work && { checked: true })}
            />
          </Tooltip>
        );
      },
    },
  ];

  useEffect(() => {
    setDataSource(reviews);
  }, [reviews]);


  return (
    <Form form={form} component={false}>
      <ConfigProvider renderEmpty={() => <Empty description="Нет данных" />}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
          loading={isLoading}
        />
      </ConfigProvider>
    </Form>
  );
};
