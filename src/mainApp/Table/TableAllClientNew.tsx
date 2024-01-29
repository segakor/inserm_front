/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import { Badge, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ClientNew, ClientProjectNew } from "../../types";
import { useNavigate } from "react-router-dom";
import { getDate } from "../../utils";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { getAmountAutoPay } from "../../utils/amountAutoPay";
import { useGetAllClientNew } from "../hooks/useGetAllClientNew";

type TableItem = ClientNew & {
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

export const TableAllClientNew = () => {
  const navigation = useNavigate();

  const { isLoading, allClient } = useGetAllClientNew();

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

  const TableHistory = ({
    history,
  }: {
    history: { date: number; price: number }[];
  }) => {
    const historyWithKey = history?.map((item, index) => ({
      ...item,
      key: index.toString(),
    }));

    const columns = [
      {
        title: "№",
        dataIndex: "key",
        render: (record: string) => {
          return <>{Number(record) + 1}</>;
        },
        width: "10%",
      },
      {
        title: "Дата списания",
        dataIndex: "date",
        render: (record: number) => {
          return <>{record ? getDate({ date: record }) : ""}</>;
        },
      },
      { title: "Сумма", dataIndex: "price" },
    ];

    return (
      <Table
        columns={columns}
        dataSource={historyWithKey}
        pagination={false}
        tableLayout={"fixed"}
      />
    );
  };

  const TableAllProjects = ({
    projects,
    showHeader,
    type,
  }: {
    projects: ClientProjectNew[];
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
        width: "5%",
        render: (record: ClientProjectNew) => <>{`[${record.id}]`}</>,
      },
      {
        title: "Название проекта",
        width: "22%",
        render: (record: ClientProjectNew) => (
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
        title: "Ресуры",
        dataIndex: "platforms",
        width: "20%",
        render: (record: string[]) => {
          return (
            <>
              {record?.map((item, index) => (
                <Tag key={index} color="blue">
                  {item}
                </Tag>
              ))}
            </>
          );
        },
      },
      {
        title: "Бриф заполнен",
        width: "10%",
        dataIndex: "briefDate",
        render: (record: number) => {
          return <>{record ? getDate({ date: record }) : ""}</>;
        },
      },
      {
        title: "Кол-во",
        width: "10%",
        dataIndex: "amount",
      },
      {
        title: "Статус",
        dataIndex: "is_active",
        width: "10%",
        render: (record: boolean) => {
          return (
            <Tag color={record ? "green" : "orange"}>
              {record ? "Активный" : "Архивный"}
            </Tag>
          );
        },
      },
      {
        title: "Способ оплаты",
        dataIndex: "payType",
        width: "10%",
      },
      { title: "Потрачено", dataIndex: "price", width: "10%" },
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
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ border: "2px dashed#32a1ce" }}>
              <TableHistory history={record.history} />
            </div>
          ),
          rowExpandable: (record) => !!record.history,
        }}
      />
    );
  };

  const filtersName = allClient?.map((item) => ({
    text: item.name,
    value: item.name,
  }));

  const amountAutoPay = getAmountAutoPay(allClient || []);

  const footerInfo = (
    <FooterInfo>
      <div>
        {`Всего клиентов: `}
        <b>{`${allClient?.length}`}</b>
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
      title: "Клиент",
      filters: filtersName,
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value: any, record) => record.name.startsWith(value),
      render: (record: TableItem) => {
        return (
          <ul>
            <li>Имя: {record.name}</li>
            <li>ClientId: {record.id}</li>
            <li>Дата регистрации: {getDate({ date: record.date })}</li>
            <li>Email: {record.email}</li>
            {record.phone && <li>Телефон: {record.phone}</li>}
            {record.tg && <li>Tg: {record.tg}</li>}
            {record.tgId && <li>TgId: {record.tgId}</li>}
          </ul>
        );
      },
    },
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
