import { useState } from "react";
import { getActTempalte } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { InvoiceTemplate } from "../../types";

export const useActTemplate = () => {
  const [tempalate, setTemplate] = useState<InvoiceTemplate | null>(null);

  const handleGet = async (id: number) => {
    try {
      if (!tempalate) {
        const res = await getActTempalte(id);
        setTemplate(res.data);
      }
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить акт",
      });
    }
  };
  return { handleGet, tempalate };
};
