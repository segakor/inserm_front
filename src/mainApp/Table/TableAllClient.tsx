/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import { Badge, Divider, Radio, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Client, ClientProject } from "../../types";
import { useNavigate } from "react-router-dom";
import { getRangeDate } from "../../utils";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { getAmountAutoPay } from "../../utils/amountAutoPay";
import { useGetAllClient } from "../hooks/useGetAllClient";
import { useState } from "react";

type TableItem = Client & {
  key: string;
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

export const TableAllClient = () => {
  const navigation = useNavigate();

  const [status, setStatus] = useState("buyer");

  const { isLoading, allClient } = useGetAllClient(status);

  const onNavigate = (
    e: React.MouseEvent<HTMLElement>,
    type: string,
    id: number
  ) => {
    if (e.ctrlKey) {
      window.open(
        `/app/admin/${type}/${id}`,
        "_blank",
        "rel=noopener noreferrer"
      );
      return;
    }
    navigation(`/app/admin/${type}/${id}`);
  };

  const TableAllProjects = ({
    projects,
    showHeader,
    type,
  }: {
    projects: ClientProject[];
    showHeader: boolean;
    type: "project" | "campaign";
  }) => {
    const projectWithKey = projects?.map((item, index) => ({
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
            <a onClick={(e) => onNavigate(e, type, record.id)}>
              <Project>
                <>
                  {record.autopay ? (
                    <CheckCircleFilled style={{ color: "#1BBD3F" }} />
                  ) : (
                    <CloseCircleFilled style={{ color: "#FF1E1E" }} />
                  )}
                </>
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

    if (!projects?.length) {
      return null;
    }

    return (
      <Table
        columns={columns}
        dataSource={projectWithKey}
        pagination={false}
        tableLayout={"fixed"}
        showHeader={showHeader}
      />
    );
  };

  const filtersName = allClient?.map((item) => ({
    text: item.name,
    value: item.name,
  }));

  const allSum = allClient
    ?.map((item) => item.totalPrice)
    .reduce((a, b) => a + b) || 0;

  const amountAutoPay = getAmountAutoPay(allClient || []);

  const footerInfo = (
    <FooterInfo>
      <div>
        {`Всего клиентов: `}
        <b>{`${allClient?.length}`}</b>
      </div>
      <div>
        {`Потрачено клиентами: `}
        <b>{`${allSum?.toLocaleString()}`}</b>
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
            {record.projects?.map((item, index) => (
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
            {record.campaigns?.map((item, index) => (
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
    {
      width: "15%",
      title: "Всего потрачено",
      dataIndex: "totalPrice",
      sortDirections: ["descend"],
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
  ];

  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setStatus(value);
        }}
        value={status}
      >
        <Radio value="buyer">С проектами</Radio>
        <Radio value="beggar">Без проектов</Radio>
      </Radio.Group>
      <Divider />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ border: "2px dashed#32a1ce" }}>
              <TableAllProjects
                projects={record.projects}
                showHeader={true}
                type={"project"}
              />
              <TableAllProjects
                projects={record.campaigns}
                showHeader={!record.projects?.length ? true : false}
                type={"campaign"}
              />
            </div>
          ),
          rowExpandable: (record) =>
            !!record.projects?.length || !!record.campaigns?.length,
        }}
        dataSource={allClient}
        bordered
        pagination={false}
        loading={isLoading}
        tableLayout={"fixed"}
        scroll={{ x: 1000 }}
        locale={{ emptyText: "Нет данных" }}
        showSorterTooltip={false}
        footer={() => (isLoading ? "" : footerInfo)}
      />
    </div>
  );
};
