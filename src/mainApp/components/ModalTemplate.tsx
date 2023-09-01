import styled from "styled-components";
import { Button, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { InvoiceTemplate } from "../../types";
import { saveDocumentByLink } from "../../utils";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../pdfMake/vfs_fonts";
import { templateModal } from "../../constants";

pdfMake.vfs = pdfFonts;

type Props = {
  onClose: () => void;
  invoiceTemplate: InvoiceTemplate | null;
  type: "payment" | "act";
};

const PdfViewer = styled.embed`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const StyledSpin = styled(Spin)`
  margin-top: 200px;
`;

export const ModalTemplate = ({ onClose, invoiceTemplate, type }: Props) => {
  const [blob, setBlob] = useState<any>();

  useEffect(() => {
    if (invoiceTemplate) {
      const pdfGenerator = pdfMake.createPdf(invoiceTemplate);
      pdfGenerator.getBlob((blob) => {
        setBlob(URL.createObjectURL(blob));
      });
    }
  }, [invoiceTemplate]);

  const titleDoc =
    "Inserm " +
    invoiceTemplate?.content?.find((item: any) => item.style === "header")
      ?.text;

  return (
    <Modal
      title={
        type === "payment"
          ? templateModal.titleModalPayment
          : templateModal.titleModalAct
      }
      open
      onOk={onClose}
      onCancel={onClose}
      width={1000}
      bodyStyle={{ height: 500 }}
      footer={
        blob ? (
          <>
            <Button
              type={"primary"}
              onClick={() =>
                saveDocumentByLink({
                  link: blob,
                  name: titleDoc,
                  format: "pdf",
                })
              }
            >
              Скачать документ
            </Button>
            <Button onClick={onClose}>Закрыть</Button>
          </>
        ) : null
      }
    >
      {!blob ? (
        <StyledSpin tip="Загружаем счета на оплату">
          <div className="content" />
        </StyledSpin>
      ) : (
        <>
          <PdfViewer
            type="application/pdf"
            src={blob + "#toolbar=0"}
          ></PdfViewer>
        </>
      )}
    </Modal>
  );
};
