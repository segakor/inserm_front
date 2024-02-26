/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReferralHistories, ReferralListAdmin, Referrals } from "../../types";
import { getDate } from "../../utils";
import { useEffect } from "react";
import { useReferral } from "../hooks/useReferral";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

type TableItem = ReferralListAdmin & {
  key: string;
};

export const TableReferralListAdmin = () => {
  const { handleGetReferralListAdmin, referralListAdmin, isLoading } =
    useReferral();

  useEffect(() => {
    handleGetReferralListAdmin();
  }, []);

  const TableReferralHistories = ({
    referralHistories,
  }: {
    referralHistories: ReferralHistories[];
  }) => {
    const historyWithKey = referralHistories?.map((item, index) => ({
      ...item,
      key: index.toString(),
    }));

    const columns: ColumnsType<ReferralHistories & { key: string }> = [
      {
        title: "Название проекта",
        render: (record: ReferralHistories) => {
          return <>{record.name}</>;
        },
      },
      {
        title: "Ресурсы",
        render: (record: ReferralHistories) => {
          return (
            <>
              {record.platforms?.map((item, index) => (
                <Tag key={index} color="blue">
                  {item}
                </Tag>
              ))}
            </>
          );
        },
      },
      {
        title: "Кол-во",
        render: (record: ReferralHistories) => {
          return <>{record.amount}</>;
        },
      },
      {
        title: "Дата оплаты",
        render: (record: ReferralHistories) => {
          return <>{getDate({ date: record.date })}</>;
        },
      },
      {
        title: "Сумма привлечения",
        render: (record: ReferralHistories) => {
          return <> {record.price}</>;
        },
      },
      {
        title: "Комиссия реферала",
        render: (record: ReferralHistories) => {
          return <> {record.commission}</>;
        },
      },
      {
        title: "Статус",
        align: "center",
        render: (record: ReferralHistories) => {
          return (
            <>
              {record.isPaid ? (
                <CheckCircleFilled style={{ color: "#1BBD3F" }} />
              ) : (
                <CloseCircleFilled style={{ color: "#FF1E1E" }} />
              )}
            </>
          );
        },
      },
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

  const TableReferrals = ({ referrals }: { referrals: Referrals[] }) => {
    const dataWithKey = referrals?.map((item, index) => ({
      ...item,
      key: index.toString(),
    }));

    const columns = [
      {
        title: "Email клиента",
        render: (record: Referrals) => <>{record.email}</>,
      },
      {
        title: "Дата регистрации",
        render: (record: Referrals) => {
          return <> {getDate({ date: record.date })}</>;
        },
      },
      {
        title: "Проекты",
        render: (record: Referrals) => <>{record.campaignCount}</>,
      },
      {
        title: "Сумма привлечения",
        render: (record: Referrals) => <>{record.total}</>,
      },
      {
        title: "Комиссия реферала",
        render: (record: Referrals) => <>{record.commission}</>,
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={dataWithKey}
        pagination={false}
        tableLayout={"fixed"}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ border: "2px dashed#32a1ce" }}>
              <TableReferralHistories referralHistories={record.histories} />
            </div>
          ),
          rowExpandable: (record) => !!record.histories,
        }}
      />
    );
  };

  const columns: ColumnsType<TableItem> = [
    {
      title: "Email партнера",
      render: (record: TableItem) => {
        return <>{record.email}</>;
      },
    },
    {
      title: "Дата регистрации",
      render: (record: TableItem) => {
        return <> {getDate({ date: record.date })}</>;
      },
    },
    {
      title: "Проекты",
      render: (record: TableItem) => {
        return <>{record.campaignCount}</>;
      },
    },
    {
      width: "15%",
      title: "Сумма привлечения",
      render: (record: TableItem) => {
        return <>{record.total}</>;
      },
    },
    {
      width: "15%",
      title: "Комиссия реферала",
      render: (record: TableItem) => {
        return <>{record.commission}</>;
      },
    },
    {
      width: "15%",
      title: "Выплачено комисии",
      render: (record: TableItem) => {
        return <>{record.commissionPaid}</>;
      },
    },
    {
      width: "15%",
      title: "Наш долг",
      render: (record: TableItem) => {
        return <>{record.commissionDifference}</>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ border: "2px dashed#32a1ce" }}>
            <TableReferrals referrals={record.referrals} />
          </div>
        ),
        rowExpandable: (record) => !!record.campaignCount,
      }}
      dataSource={referralListAdmin}
      bordered
      pagination={false}
      loading={isLoading.table}
      tableLayout={"fixed"}
      scroll={{ x: 1000 }}
      locale={{ emptyText: "Нет данных" }}
      showSorterTooltip={false}
    />
  );
};
