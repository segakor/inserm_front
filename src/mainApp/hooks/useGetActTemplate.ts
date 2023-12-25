import { useState } from "react";
import { getActTempalte, getInvoiceTemplate } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { InvoiceTemplate } from "../../types";

export const useActTemplate = () => {
  const [tempalate, setTemplate] = useState<InvoiceTemplate | null>(null);
  const [typeTemplate, setTypeTemplate] = useState("");

  const handleGetAct = async (id: number) => {
    try {
      setTypeTemplate("act");
      const res = await getActTempalte(id);
      setTemplate(res.data);
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить акт",
      });
    }
  };

  const handleGetInvoice = async (id: number) => {
    try {
      setTypeTemplate("payment");
      const res = await getInvoiceTemplate(id);
      setTemplate(res.data);
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить счет",
      });
    }
  };

  return { handleGetAct, handleGetInvoice, tempalate, typeTemplate };
};
