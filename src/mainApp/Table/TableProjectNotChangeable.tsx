/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Form, Table, ConfigProvider, Empty } from "antd";
import { Reviews } from "../../types";
import { ButtonCopy } from "../Button/ButtonCopy";
import { cliapbord, getDate } from "../../utils";
import { StatusComponent } from "../components/StatusComponent";

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
      width: "6%",
      render: (record: string) => {
        return <>{Number(record) + 1}</>;
      },
    },
    {
      title: "Ссылка на отзыв",
      dataIndex: "link",
      width: "20%",
      ellipsis: true,
      render: (text: string) => (
        <div style={{ display: "inline" }}>
          <a onClick={() => window.open(text, "_blank")}>{text}</a>
          <ButtonCopy onClick={() => cliapbord(text)} style={{marginLeft:10}}/>
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
          <ButtonCopy onClick={() => cliapbord(text)} style={{marginLeft:10}}/>
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
      width: "12%",
    },
    {
      title: "Ник в телеграм",
      dataIndex: "tg",
      width: "12%",
    },
  ];

  useEffect(() => {
    setDataSource(reviews);
  }, [reviews]);

  return (
    <Form form={form} component={false}>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description="Отзывы в процессе написания, скоро они будут готовы" />
        )}
      >
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
          loading={isLoading}
          tableLayout={"fixed"}
          scroll={{ x: 1000 }}
          style={{ whiteSpace: "pre-line" }}
        />
      </ConfigProvider>
    </Form>
  );
};
