/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styled from "styled-components";
import { Badge, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Client, ClientProject } from "../../types";
import { useNavigate } from "react-router-dom";
import { tokenService, getRangeDate } from "../../utils";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { getAmountAutoPay } from "../../utils/amountAutoPay";

type TableItem = Client & {
  key: string;
};

type Props = {
  allClient: TableItem[] | undefined;
  isLoading: boolean;
};

const Project = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 4px;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

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
        title: "id",
        width: "6%",
        render: (record: ClientProject) => <>{`[${record.id}]`}</>,
      },
      {
        title: "Название проекта",
        render: (record: ClientProject) => (
          <div style={{ display: "inline" }}>
            <a onClick={() => navigation(`/app/${role}/project/${record.id}`)}>
              <Project>
                {record.autopay ? (
                  <CheckCircleFilled style={{ color: "#1BBD3F" }} />
                ) : (
                  <CloseCircleFilled style={{ color: "#FF1E1E" }} />
                )}
                <>{record.name}</>
              </Project>
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

  const amountAutoPay = getAmountAutoPay(allClient || []);

  const footerInfo = (
    <FooterInfo>
      <div>
        {`Потрачено клиентами: `}
        <b>{`${allSum}`}</b>
      </div>
      <div>
        {`Активных подписок: `}
        <b>{`${amountAutoPay.active}`}</b>
      </div>
      <div>
        {`Неактивных подписок: `}
        <b>{`${amountAutoPay.notActive}`}</b>
      </div>
    </FooterInfo>
  );

  const columns: ColumnsType<TableItem> = [
    {
      width: "18%",
      title: "Имя",
      dataIndex: "name",
      filters: filtersName,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value: any, record) => record.name.startsWith(value),
    },
    {
      width: "18%",
      title: "Почта",
      render: (record: TableItem) => {
        return (
          <>
            [{record.id}] {record.email}
          </>
        );
      },
    },
    { width: "10%", title: "Телефон", dataIndex: "phone" },
    { width: "10%", title: "Telegram", dataIndex: "tg" },
    {
      title: "Проекты",
      render: (record: TableItem) => {
        return (
          <>
            {record.projects.map((item, index) => (
              <Project key={index}>
                {item.autopay ? (
                  <CheckCircleFilled style={{ color: "#1BBD3F" }} />
                ) : (
                  <CloseCircleFilled style={{ color: "#FF1E1E" }} />
                )}
                <>
                  {`[${item.id}]`} {item.name}
                </>
              </Project>
            ))}
          </>
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
      footer={() => footerInfo}
    />
  );
};
