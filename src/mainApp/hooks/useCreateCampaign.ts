import { useState } from "react";
import {
  createCampaign,
  savePrice,
  createCashlessTransfer,
  getInvoiceTemplate,
} from "../../request";
import {
  ReqCreateCampaign,
  ReqCreateCashlessTransfer,
  InvoiceTemplate,
} from "../../types";
import { goToAinoxPageCampaign, openNotificationWithIcon } from "../../utils";

export const useCreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceTemplate, setInvoiceTemplate] =
    useState<InvoiceTemplate | null>(null);

  const handleCreateCampaign = async (
    value: ReqCreateCampaign,
    price: number,
    cashlessData: Omit<ReqCreateCashlessTransfer, "campaignId"> | null
  ) => {
    try {
      setIsLoading(true);
      const {
        data: {
          result: { id: campaignId },
        },
      } = await createCampaign(value);
      await savePrice({
        email: value.email,
        name: value.name,
        price: price,
      });
      if (cashlessData) {
        const {
          data: {
            result: { id: transferId },
          },
        } = await createCashlessTransfer({ ...cashlessData, campaignId });
        const { data } = await getInvoiceTemplate(transferId);
        setInvoiceTemplate(data);
        return;
      }
      goToAinoxPageCampaign({
        email: value.email,
        projectName: value.name,
        price: price,
      });
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: `Не удалось создать проект`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateCampaign,
    isLoading,
    invoiceTemplate
  };
};
