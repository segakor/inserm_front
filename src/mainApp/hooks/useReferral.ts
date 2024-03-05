import { useState } from "react";
import {
  createPartnerPayment,
  createСonclusion,
  getConclusionOrder,
  getPartnerOrderList,
  getPartnerPayment,
  getReferralLink,
  getReferralList,
  getReferralListAdmin,
  referralUpdate,
  updateOrderPartner,
} from "../../request";
import {
  ConclusionOrder,
  PartnerOrderList,
  PartnerPayment,
  ReferralList,
  ReferralListAdmin,
} from "../../types";
import { openNotificationWithIcon } from "../../utils";
import { AxiosError } from "axios";

export const useReferral = () => {
  const [referralLink, setReferralLink] = useState("");
  const [referralListAdmin, setReferralListAdmin] = useState<
    ReferralListAdmin[]
  >([]);
  const [referralList, setReferralList] = useState<ReferralList[]>([]);
  const [orderList, setOrderList] = useState<PartnerOrderList>();
  const [conclusionOrder, setConclusionOrder] = useState<ConclusionOrder[]>([]);
  const [isLoading, setIsLoading] = useState({
    table: false,
    button: false,
    form: false,
  });
  const [partnerPayment, setPartnerPayment] = useState<
    (PartnerPayment & { id: number }) | null
  >(null);

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
      setIsLoading((prev) => ({ ...prev, button: false }));
    }
  };

  const handleGetConclusionOrder = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, table: true }));
      const response = await getConclusionOrder();
      setConclusionOrder(response.data.result);
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

  const handelCreatePartnerPayment = async (value: PartnerPayment) => {
    try {
      setIsLoading((prev) => ({ ...prev, form: true }));
      await createPartnerPayment(value);
      await getPartnerPayment(0);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Данные сохранены",
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось сохранить данные",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, form: false }));
    }
  };

  const handelGetPartnerPayment = async (id: number) => {
    try {
      setIsLoading((prev) => ({ ...prev, form: true }));
      const response = await getPartnerPayment(id);
      setPartnerPayment(response.data.result);
    } catch (error) {
    } finally {
      setIsLoading((prev) => ({ ...prev, form: false }));
    }
  };

  const handleUpdateOrderPartner = async (value: {
    orderId: number;
    isPaid: boolean;
  }) => {
    try {
      await updateOrderPartner(value);
      await handleGetConclusionOrder();
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось обновить статус",
      });
    }
  };

  return {
    handleGetLink,
    handleGetReferralListAdmin,
    handleGetReferralList,
    handleGetPartnerOrderList,
    handleCreateСonclusion,
    handleGetConclusionOrder,
    handelCreatePartnerPayment,
    handelGetPartnerPayment,
    handleUpdateOrderPartner,
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
    conclusionOrder: conclusionOrder?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    partnerPayment,
    isLoading,
  };
};
