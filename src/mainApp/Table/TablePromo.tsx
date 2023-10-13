import { Button, Divider, Radio, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Promo } from "../../types";
import { cliapbord, getDate } from "../../utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FolderAddOutlined } from "@ant-design/icons";
import { usePromo } from "../hooks/usePromo";
import { ButtonCopy } from "../Button/ButtonCopy";
import { ModalCreatePromo } from "../components/Modal";

type TableItem = Promo & {
  key: string;
};

const WrapperAction = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    margin-right: 4px;
  }
`;

export const TablePromo = () => {
  const [status, setStatus] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleGetPromo, allPromo, isLoading, handleArchivePromo } =
    usePromo();

  useEffect(() => {
    handleGetPromo();
  }, []);

  const onCopyPromo = (text: string) => {
    cliapbord(text);
  };

  const columns: ColumnsType<TableItem> = [
    {
      title: "Промокод",
      dataIndex: "name",
      width: "20%",
      render: (record: string) => {
        return (
          <>
            <Tag color="green">{record}</Tag>
            <ButtonCopy onClick={() => onCopyPromo(record)} />
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
      title: "Отзывов в подарок",
      dataIndex: "giftCount",
      width: 80,
      render: (giftCount: number) => {
        return <>{giftCount}</>;
      },
    },
    {
      title: "Условие",
      dataIndex: "minCount",
      width: 100,
      render: (minCount: number) => {
        return <>от {minCount} шт.</>;
      },
    },
    {
      title: "",
      width: "16%",
      render: (record: Promo) => {
        const { id, isArchived } = record;
        return (
          <WrapperAction>
            <a onClick={() => handleArchivePromo(id)}>
              {!isArchived && (
                <>
                  <FolderAddOutlined /> В архив
                </>
              )}
            </a>
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
        <Radio value="active">Активные</Radio>
        <Radio disabled value="archive">
          Архивные
        </Radio>
      </Radio.Group>
      <Divider />
      <Button
        onClick={() => setIsModalOpen((prev) => !prev)}
        type="primary"
        style={{ marginBottom: 16, background: "black" }}
      >
        Добавить промокод
      </Button>
      <Table
        columns={columns}
        dataSource={allPromo}
        bordered
        pagination={false}
        loading={isLoading}
        tableLayout={"fixed"}
        locale={{ emptyText: "Нет данных" }}
        scroll={{ x: 900 }}
      />
      {isModalOpen && (
        <ModalCreatePromo
          onClose={() => setIsModalOpen((prev) => !prev)}
          onUpdate={handleGetPromo}
        />
      )}
    </div>
  );
};
