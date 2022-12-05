import React, { useEffect } from "react";
import { getPerson, changePerson } from "../request";
import { openNotificationWithIcon } from "../utils/notification";
import { setPersonInfo } from "../context/action";
import { useDispatch, useLocalState } from "../context/hooks";
import { ReqPersonChange } from "../type";

export const usePerson = (nowUpdate?: boolean) => {
  const dispatch = useDispatch();
  const state = useLocalState();

  const handleGetPerson = async () => {
    try {
      const response = await getPerson();
      /* console.log(response.data); */
      dispatch(setPersonInfo(response.data));
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить данные клиента",
      });
    }
  };
  const handleChangePerson = async (value: ReqPersonChange) => {
    try {
      await changePerson(value);
      await handleGetPerson();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Данные успешно изменены",
      });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось обновить данные клиента",
      });
    }
  };
  useEffect(() => {
    if (!state.personInfo && !nowUpdate) {
      handleGetPerson();
    }
  }, []);

  return { handleChangePerson, handleGetPerson };
};
