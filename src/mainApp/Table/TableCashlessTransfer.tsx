import { Divider, Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CashlessStatus, CashlessTransfer } from "../../types";
import { getDate } from "../../utils";
import { useGetCashlessTransfer } from "../hooks/useGetCashlessTransfer";
import { useState } from "react";
import styled from "styled-components";
import {
  CheckOutlined,
  CloseOutlined,
  FolderAddOutlined,
  FolderOutlined,
} from "@ant-design/icons";

type TableItem = CashlessTransfer & {
  key: string;
};

const WrapperAction = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    margin-right: 4px;
  }
`;

export const TableCashlessTransfer = () => {
  const [status, setStatus] = useState<CashlessStatus>("wait");

  const {
    cashlessTransfer,
    isLoading,
    handleApproveTransfer,
    handleArchiveTransfer,
  } = useGetCashlessTransfer(status);

  const columns: ColumnsType<TableItem> = [
    { title: "id", dataIndex: "campaignId", width: 60 },
    {
      title: "Дата",
      dataIndex: "date",
      width: 100,
      render: (record: number) => {
        return <>{getDate({ date: record })}</>;
      },
    },
    {
      title: "Данные клиента",
      width: "40%",
      render: (record: CashlessTransfer) => {
        return (
          <ul style={{ margin: 0 }}>
            <li>ИНН: {record.inn}</li>
            <li>ОГРН: {record.ogrn}</li>
            <li>Юр. лицо: {record.company}</li>
            <li>Адрес юр. лица: {record.address}</li>
          </ul>
        );
      },
    },
    {
      title: "Данные заявки",
      width: "20%",
      render: (record: CashlessTransfer) => {
        return (
          <ul>
            <li>Цена: {record.price}</li>
            <li>Колличество: {record.amount}</li>
          </ul>
        );
      },
    },
    {
      title: "",
      width: "16%",
      render: (record: CashlessTransfer) => {
        const { id: transferId, isApproved, isActive } = record;
        return (
          <WrapperAction>
            {isActive && (
              <a
                onClick={() =>
                  handleApproveTransfer({ transferId, isApproved: !isApproved })
                }
              >
                {!isApproved ? <CheckOutlined /> : <CloseOutlined />}
                {!isApproved ? "Оплачен" : "Не оплачен"}
              </a>
            )}
            {!isApproved && (
              <a
                onClick={() =>
                  handleArchiveTransfer({ transferId, isActive: !isActive })
                }
              >
                {isActive ? <FolderAddOutlined /> : <FolderOutlined />}
                {isActive ? "В архив" : "Из архива"}
              </a>
            )}
          </WrapperAction>
        );
      },
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
        <Radio value="wait">Активные</Radio>
        <Radio value="approved">Оплаченные</Radio>
        <Radio value="archive">Архивные</Radio>
      </Radio.Group>
      <Divider />
      <Table
        columns={columns}
        dataSource={cashlessTransfer}
        bordered
        pagination={false}
        loading={isLoading}
        tableLayout={"fixed"}
        locale={{ emptyText: "Нет данных" }}
        scroll={{ x: 900 }}
      />
    </div>
  );
};
