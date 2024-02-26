import { useState } from "react";
import {
  createСonclusion,
  getPartnerOrderList,
  getReferralLink,
  getReferralList,
  getReferralListAdmin,
  referralUpdate,
} from "../../request";
import { PartnerOrderList, ReferralList, ReferralListAdmin } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useReferral = () => {
  const [referralLink, setReferralLink] = useState("");
  const [referralListAdmin, setReferralListAdmin] = useState<
    ReferralListAdmin[]
  >([]);
  const [referralList, setReferralList] = useState<ReferralList[]>([]);
  const [orderList, setOrderList] = useState<PartnerOrderList>();
  const [isLoading, setIsLoading] = useState({ table: false, button: false });

  const handleGetLink = async () => {
    try {
      const res = await getReferralLink();
      setReferralLink(res.data.result);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить ссылку",
      });
    }
  };

  const handleGetReferralListAdmin = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, table: true }));
      const res = await getReferralListAdmin();
      setReferralListAdmin(res.data.result);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить данные",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, table: false }));
    }
  };

  const handleGetReferralList = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, table: true }));
      const res = await getReferralList();
      setReferralList(res.data.result);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить данные",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, table: false }));
    }
  };

  const handleGetPartnerOrderList = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, table: true }));
      const res = await getPartnerOrderList();
      (res.data.orders = res.data.orders.map((item, index) => ({
        ...item,
        key: index.toString(),
      }))),
        setOrderList(res.data);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить данные",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, table: false }));
    }
  };

  const handleCreateСonclusion = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, button: true }));
      await createСonclusion();
      await handleGetPartnerOrderList();
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Ошибка при выводе средств",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, button: true }));
    }
  };

  return {
    handleGetLink,
    handleGetReferralListAdmin,
    handleGetReferralList,
    handleGetPartnerOrderList,
    handleCreateСonclusion,
    referralLink,
    referralListAdmin: referralListAdmin?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    referralList: referralList?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    orderList,
    isLoading,
  };
};
