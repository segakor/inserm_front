import { useState } from "react";
import {
  getReferralLink,
  getReferralList,
  referralUpdate,
} from "../../request";
import { ReferralList } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useReferral = () => {
  const [referralLink, setReferralLink] = useState("");
  const [referralList, setReferralList] = useState<ReferralList[]>([]);

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

  const handleGetReferralList = async () => {
    try {
      const res = await getReferralList();
      setReferralList(res.data.result);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить данные",
      });
    }
  };

  const handleUpdateReferral = async (value: {
    referralId: number;
    isPaid: boolean;
  }) => {
    try {
      await referralUpdate(value);
      await handleGetReferralList();
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось обновить данные",
      });
    }
  };

  return {
    referralLink,
    handleGetLink,
    handleGetReferralList,
    referralList: referralList?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
    handleUpdateReferral,
  };
};
