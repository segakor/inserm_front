import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getDate } from "../../utils";
import { useReferral } from "../hooks/useReferral";
import { useEffect } from "react";
import styled from "styled-components";
import { FolderAddOutlined } from "@ant-design/icons";
import { ReferralList } from "../../types";

type TableItem = any & {
  key: string;
};

const WrapperAction = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    margin-right: 4px;
  }
`;

type Props = {
  isAdmin?: boolean;
};

export const TableStatisticsReferral = ({ isAdmin }: Props) => {
  const { handleGetReferralList, referralList, handleUpdateReferral } =
    useReferral();

  useEffect(() => {
    handleGetReferralList();
  }, []);

  const columns: ColumnsType<TableItem> = [
    {
      dataIndex: "isPaid",
      title: "Статус",
      width: "13%",
      render: (record: boolean) => {
        return (
          <Tag color={record ? "green" : "red"}>
            {record ? "Оплачен" : "Неоплачен"}
          </Tag>
        );
      },
    },
    {
      title: "Приведенный клиент",
      width: "35%",
      render: (record) => {
        return <>{record.campaign.name}</>;
      },
    },
    {
      title: "Стоимость заказа",
      render: (record) => {
        return <>{record.campaign.price}</>;
      },
    },
    {
      title: "Партнерская комиссия",
      render: (record) => {
        return <>{(record.campaign.price / 100) * 10}</>;
      },
    },
    {
      title: "Дата создания проекта",
      render: (record) => {
        return <>{getDate({ date: record.campaign.date })}</>;
      },
    },
    {
      title: "",
      width: "16%",
      key: "operation",
      render: (record: ReferralList) => {
        const { isPaid, id: referralId } = record;
        return (
          <WrapperAction>
            <a
              onClick={() =>
                handleUpdateReferral({ referralId, isPaid: !isPaid })
              }
            >
              {!isPaid ? "Оплачен" : "Не оплачен"}
            </a>
          </WrapperAction>
        );
      },
    },
  ];

  const filteredColumns = isAdmin
    ? columns
    : columns.filter((item) => item.key !== "operation");

  return (
    <div>
      <Table
        columns={filteredColumns}
        dataSource={referralList}
        bordered
        pagination={false}
        tableLayout={"fixed"}
        locale={{ emptyText: "Нет данных" }}
        scroll={{ x: 900 }}
      />
    </div>
  );
};
