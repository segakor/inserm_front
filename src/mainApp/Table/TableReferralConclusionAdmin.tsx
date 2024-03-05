import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ConclusionOrder } from "../../types";
import { useReferral } from "../hooks/useReferral";
import { useEffect, useState } from "react";
import { ModalPartnerPayment } from "../components/Modal";

type TableItem = ConclusionOrder & {
  key: string;
};

export const TableReferralConclusionAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpen = (id: number) => {
    handelGetPartnerPayment(id).then(()=>setIsModalOpen(true));
   /*  setTimeout(()=>{
      setIsModalOpen(true);
    },200) */
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    handleGetConclusionOrder,
    conclusionOrder,
    isLoading,
    handleUpdateOrderPartner,
    handelGetPartnerPayment,
    partnerPayment,
  } = useReferral();

  useEffect(() => {
    handleGetConclusionOrder();
  }, []);

  const columns: ColumnsType<TableItem> = [
    {
      title: "Email партнера",
      render: (record: ConclusionOrder) => {
        return <>{record.email}</>;
      },
    },
    {
      title: "Реквизиты",
      render: (record: ConclusionOrder) => {
        return (
          <a onClick={() => onModalOpen(record.paymentId)}>
            {record.type === "individualPerson" ? "Физ лицо" : "Юр лицо"}
            {", "}
            {record.company || record.name}
          </a>
        );
      },
    },
    {
      title: "Сумма выплаты",
      render: (record: ConclusionOrder) => {
        return <>{record.price}</>;
      },
    },
    {
      title: "",
      render: (record: ConclusionOrder) => {
        return (
          <>
            <a
              onClick={() =>
                handleUpdateOrderPartner({
                  orderId: record.paymentId,
                  isPaid: true,
                })
              }
            >
              Оплачен
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={conclusionOrder}
        bordered
        pagination={false}
        tableLayout={"fixed"}
        locale={{ emptyText: "Нет данных" }}
        scroll={{ x: 900 }}
        loading={isLoading.table}
      />
      {isModalOpen && (
        <ModalPartnerPayment
          onClose={onModalClose}
          partnerPayment={partnerPayment}
          isLoading={isLoading.form}
        />
      )}
    </>
  );
};
