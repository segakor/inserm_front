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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const res = await getReferralList();
      setReferralList(res.data.result);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить данные",
      });
    } finally {
      setIsLoading(false);
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
    isLoading
  };
};
