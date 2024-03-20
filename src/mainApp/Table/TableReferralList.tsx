import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReferralHistories, ReferralList } from "../../types";
import { getDate } from "../../utils";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

type TableItem = ReferralList;

type Props = {
  referralList: ReferralList[];
  isLoading: {
    table: boolean;
    button: boolean;
  };
};

export const TableReferralList = ({ referralList, isLoading }: Props) => {
  const columns: ColumnsType<TableItem> = [
    {
      title: "ID клиента",
      render: (record: ReferralList) => {
        return <>{record.id}</>;
      },
      width:'10%'
    },
    {
      title: "Дата регистрации",
      render: (record: ReferralList) => {
        return <>{getDate({ date: record.date })}</>;
      },
    },
    {
      title: "Список ID проектов",
      render: (record: ReferralList) => {
        return (
          <ul>
            {record.campaignIds.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Сумма, которую привлек клиент",
      render: (record: ReferralList) => {
        return <>{record.total?.toLocaleString()}</>;
      },
    },
    {
      title: "Комиссия реферала",
      render: (record: ReferralList) => {
        return <>{record.commission?.toLocaleString()}</>;
      },
    },
  ];

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
          return <> {record.price?.toLocaleString()}</>;
        },
      },
      {
        title: "Комиссия реферала",
        render: (record: ReferralHistories) => {
          return <> {record.commission?.toLocaleString()}</>;
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

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ border: "2px dashed#32a1ce" }}>
            <TableReferralHistories referralHistories={record.histories} />
          </div>
        ),
        rowExpandable: (record) => !!record.histories,
      }}
      dataSource={referralList}
      bordered
      loading={isLoading.table}
      pagination={false}
      tableLayout={"fixed"}
      locale={{ emptyText: "Нет данных" }}
      scroll={{ x: 900 }}
    />
  );
};
