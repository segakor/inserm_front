import React, { useEffect } from "react";
import { getProject, changePerson } from "../request";
import { openNotificationWithIcon } from "../utils/notification";
import { setPersonInfo } from "../context/action";
import { useDispatch, useLocalState } from "../context/hooks";
import { ReqPersonChange } from "../type";

export const useGetTariff = () => {
  const dispatch = useDispatch();
  const state = useLocalState();

  const handleGetTariff = async () => {
    try {
      const response = await getProject();
      console.log(response.data);
      /* dispatch(setPersonInfo(response.data)); */
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить тарифы",
      });
    }
  };
  useEffect(() => {
    handleGetTariff();
  }, []);

  return {};
};
