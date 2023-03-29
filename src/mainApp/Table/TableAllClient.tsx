/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Badge, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Client, ClientProject } from "../../type";
import { getRangeDate } from "../../utils/getDate";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../../utils/tokenService";

type TableItem = Client & {
  key: string;
};

type Props = {
  allClient: TableItem[] | undefined;
  isLoading: boolean;
};

export const TableAllClient = ({ allClient, isLoading }: Props) => {
  const navigation = useNavigate();
  const role = tokenService.getRole();

  const TableAllProjects = ({ projects }: { projects: ClientProject[] }) => {
    const projectWithKey = projects.map((item, index) => ({
      ...item,
      key: index.toString(),
    }));

    const columns = [
      {
        title: "Название проекта",
        dataIndex: "name",
        render: (name: string, record: ClientProject) => (
          <div style={{ display: "inline" }}>
            <a onClick={() => navigation(`/app/${role}/project/${record.id}`)}>
              {name}
            </a>
          </div>
        ),
      },
      {
        title: "Тариф",
        dataIndex: "tariffName",
        render: (record: string) => {
          return (
            <Tag
              color={
                record === "S"
                  ? "#2CAE97"
                  : record === "M"
                  ? "#ECA843"
                  : " #EF5479"
              }
            >
              {`Тариф ${record}`}
            </Tag>
          );
        },
      },
      {
        title: "Период",
        render: (record: any) => {
          return (
            <>
              {getRangeDate({ start: record.startDate, end: record.endDate })}
            </>
          );
        },
      },
      {
        title: "Статус",
        dataIndex: "is_active",
        render: (record: boolean) => {
          return (
            <Badge
              status={record ? "success" : "warning"}
              text={record ? "Активный" : "Архивный"}
            />
          );
        },
      },
      { title: "Потрачено", dataIndex: "price" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={projectWithKey}
        pagination={false}
        tableLayout={"fixed"}
      />
    );
  };

  const filtersName = allClient?.map((item) => ({
    text: item.name,
    value: item.name,
  }));

  const allSum = allClient
    ?.map((item) => item.totalPrice)
    .reduce((a, b) => a + b);

  const columns: ColumnsType<TableItem> = [
    {
      width: "16%",
      title: "Имя",
      dataIndex: "name",
      filters: filtersName,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value: any, record) => record.name.startsWith(value),
    },
    { width: "16%", title: "Почта", dataIndex: "email" },
    { width: "12%", title: "Телефон", dataIndex: "phone" },
    { width: "16%", title: "Имя в telegram", dataIndex: "tg" },
    {
      title: "Проекты",
      render: (record: TableItem) => {
        return (
          <ul style={{ margin: 0 }}>
            {record.projects.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        );
      },
    },
    { width: "15%", title: "Всего потрачено", dataIndex: "totalPrice" },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ border: "2px dashed#32a1ce" }}>
            <TableAllProjects projects={record.projects} />
          </div>
        ),
        rowExpandable: (record) => !!record.projects.length,
      }}
      dataSource={allClient}
      bordered
      pagination={false}
      loading={isLoading}
      tableLayout={"fixed"}
      scroll={{ x: 1000 }}
      locale={{ emptyText: "нет данных" }}
      footer={() => `Итого ${allSum}`}
    />
  );
};
