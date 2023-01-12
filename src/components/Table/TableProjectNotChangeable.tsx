/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Form, Table, Checkbox, ConfigProvider, Empty } from "antd";
import { StatusComponent } from "../StatusComponent";
import { Reviews } from "../../type";
import { getDate } from "../../utils/getDate";
import { ButtonCopy } from "../Button/ButtonCopy";
import { cliapbord } from "../../utils/cliapbord";

type Props = {
  reviews: ReviewsTableItem[] | undefined;
  isLoading: boolean;
};

type ReviewsTableItem = Reviews & {
  key: string;
};

export const TableProjectNotChangeable = ({ reviews, isLoading }: Props) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(reviews);

  const columns = [
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
      width: "12%",
      render: (text: string) => (
        <div style={{ display: "inline" }}>
          <a onClick={() => window.open(text, "_blank")}>{text}</a>
          <ButtonCopy onClick={() => cliapbord(text)} />
        </div>
      ),
    },
    {
      title: "Текст отзыва",
      dataIndex: "text",
      width: "20%",
      render: (text: string) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <div>
          <span>{text}</span>
          <ButtonCopy onClick={() => cliapbord(text)} />
        </div>
      ),
    },
    {
      title: "Статус отзыва",
      dataIndex: "status",
      width: "15%",
      ellipsis: true,
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
      width: "6%",
      render: (_: any, record: ReviewsTableItem) => {
        return <Checkbox disabled {...(record.in_work && { checked: true })} />;
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
          tableLayout={"fixed"}
        />
      </ConfigProvider>
    </Form>
  );
};
