import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CashlessTransfer } from "../../types";
import { getDate } from "../../utils";
import { useGetCashlessTransfer } from "../hooks/useGetCashlessTransfer";

type TableItem = CashlessTransfer & {
  key: string;
};

export const TableCashlessTransfer = () => {

  const { cashlessTransfer, isLoading, handleApproveTransfer } =
  useGetCashlessTransfer();

  
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
      width: '40%',
      render: (record: CashlessTransfer) => {
        return (
          <ul style={{ margin: 0 }}>
            <li>ИНН: {record.inn}</li>
            <li>ОГРН: {record.ogrn}</li>
            <li>Адрес юр. лица: {record.address}</li>
          </ul>
        );
      },
    },
    {
      title: "Данные заявки",
      width: '30%',
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
      align:'center',
      render: (record: CashlessTransfer) => {
        const { id: transferId, isApproved } = record;
        return (
          <Button
            onClick={() =>
              handleApproveTransfer({ transferId, isApproved: !isApproved })
            }
          >
            Оплачен
          </Button>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={cashlessTransfer}
      bordered
      pagination={false}
      loading={isLoading}
      tableLayout={"fixed"}
      locale={{ emptyText: "нет данных" }}
      scroll={{ x: 900 }}
    />
  );
};
