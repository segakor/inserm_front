import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  getCashlessTransfer,
  changeTransferStatus,
  changeTransferStatusArchive,
} from "../../request";
import { CashlessStatus, CashlessTransfer } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useGetCashlessTransfer = (status: CashlessStatus) => {
  const [cashlessTransfer, setCashlessTransfer] = useState<
    CashlessTransfer[] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const handleGetCashlessTransfer = async () => {
    try {
      setIsLoading(true);
      const response = await getCashlessTransfer({ status });
      setCashlessTransfer(response.data.result);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить список безналичных заявок",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCashlessTransfer();
  }, [status]);

  const handleApproveTransfer = async (value: {
    transferId: number;
    isApproved: boolean;
  }) => {
    try {
      setIsLoading(true);
      await changeTransferStatus(value);
      await handleGetCashlessTransfer();
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось изменить статус",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchiveTransfer = async (value: {
    transferId: number;
    isActive: boolean;
  }) => {
    try {
      setIsLoading(true);
      await changeTransferStatusArchive(value);
      await handleGetCashlessTransfer();
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось изменить статус",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cashlessTransfer: cashlessTransfer?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    isLoading,
    handleApproveTransfer,
    handleArchiveTransfer,
  };
};
