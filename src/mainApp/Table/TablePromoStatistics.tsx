import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Campaign, PromoStatistics } from "../../types";
import { getDate } from "../../utils";
import { useEffect } from "react";
import { usePromo } from "../hooks/usePromo";
import { useNavigate } from "react-router-dom";

type TableItem = PromoStatistics & {
  key: string;
};

export const TablePromoStatistics = () => {
  const { handleGetStatisticsPromo, promoStat, isLoading } = usePromo();

  useEffect(() => {
    handleGetStatisticsPromo();
  }, []);

  const navigation = useNavigate();

  const onNavigate = (e: React.MouseEvent<HTMLElement>, id: number) => {
    if (e.ctrlKey) {
      window.open(
        `/app/admin/campaign/${id}`,
        "_blank",
        "rel=noopener noreferrer"
      );
      return;
    }
    navigation(`/app/admin/campaign/${id}`);
  };

  const columns: ColumnsType<TableItem> = [
    {
      title: "Промокод",
      dataIndex: "name",
      width: "15%",
      render: (record: string) => {
        return (
          <>
            <Tag color="green">{record}</Tag>
          </>
        );
      },
    },
    {
      title: "Дата с",
      dataIndex: "start",
      width: 60,
      render: (record: number) => {
        return <>{getDate({ date: record })}</>;
      },
    },
    {
      title: "Дата по",
      dataIndex: "end",
      width: 60,
      render: (record: number) => {
        return <>{getDate({ date: record })}</>;
      },
    },
    {
      title: "Проекты",
      dataIndex: "campaigns",
      width: 150,
      render: (record: Campaign[]) => {
        return (
          <div>
            {record.map((item, index) => (
              <ul>
                <li>
                  <a key={index} onClick={(e) => onNavigate(e, item.id)}>
                    {`[${item.id}]`} {item.name}
                  </a>
                </li>
              </ul>
            ))}
          </div>
        );
      },
    },
    {
      title: "Всего получено",
      dataIndex: "totalPrice",
      width: 100,
      sortDirections: ["descend"],
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (record: number) => {
        return <>{record}</>;
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={promoStat}
        bordered
        pagination={false}
        loading={isLoading}
        tableLayout={"fixed"}
        locale={{ emptyText: "Нет данных" }}
        scroll={{ x: 900 }}
        showSorterTooltip={false}
      />
    </div>
  );
};
