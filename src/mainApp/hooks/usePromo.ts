import { useState } from "react";
import {
  archivePromo,
  createPromo,
  getPromo,
  getPromoStatistics,
  promoCheck,
} from "../../request";
import { openNotificationWithIcon } from "../../utils";
import {
  CreatePromo,
  Promo,
  PromoCheck,
  PromoStatistics,
  ResultCodePromo,
} from "../../types";

export const usePromo = () => {
  const [allPromo, setAllPromo] = useState<Promo[] | null>(null);
  const [promoStat, setPromoState] = useState<PromoStatistics[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultCode, setResultCode] = useState<ResultCodePromo | null>(null);
  const [giftCount, setGiftCount] = useState(0);

  const handleCreatePromo = async (value: CreatePromo) => {
    try {
      setIsLoading(true);
      await createPromo(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Промокод добавлен",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось добавить промокод",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetPromo = async () => {
    try {
      const res = await getPromo();
      setAllPromo(res.data.result);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить промокоды",
      });
    }
  };

  const handleArchivePromo = async (id: number) => {
    try {
      await archivePromo(id);
      await handleGetPromo();
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось добавить в архив",
      });
    }
  };

  const handleCheckPromo = async (value: PromoCheck) => {
    try {
      setIsLoading(true);
      const res = await promoCheck(value);
      setResultCode("success");
      setGiftCount(res.data.result.giftCount);
    } catch (err) {
      const typedError = err as any;
      setResultCode(typedError?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStatisticsPromo = async () => {
    try {
      setIsLoading(true);
      const res = await getPromoStatistics();
      setPromoState(res.data.result);
    } catch (err) {
      const typedError = err as any;
      setResultCode(typedError?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreatePromo,
    handleGetPromo,
    handleArchivePromo,
    handleCheckPromo,
    allPromo: allPromo?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    promoStat: promoStat?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    isLoading,
    resultCode,
    giftCount,
    handleGetStatisticsPromo,
  };
};
