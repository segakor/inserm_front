import { useEffect, useState } from "react";
import {
  getPerson,
  changePerson,
  changePersonTgId,
  getNotificationSettings,
  updateNotificationSettings,
} from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { setPersonInfo } from "../context/action";
import { useDispatch, useLocalState } from "../context/hooks";
import { NotificationSettings, ReqPersonChange } from "../../types";
import { AxiosError } from "axios";

export const usePerson = (nowUpdate?: boolean) => {
  const [notifySettings, setNotifySettings] = useState<NotificationSettings>();
  const dispatch = useDispatch();
  const state = useLocalState();

  const handleGetPerson = async () => {
    try {
      const response = await getPerson();
      dispatch(setPersonInfo(response.data));
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить данные клиента",
        status: typedError.status,
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
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось обновить данные клиента",
        status: typedError.status,
      });
    }
  };

  const handleAddTgKey = async (value: { tgId: string }) => {
    try {
      await changePersonTgId(value);
      await handleGetPerson();
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: `API key успешно ${value.tgId ? "добавлен" : "удален"}`,
      });
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось обновить данные клиента",
        status: typedError.status,
      });
    }
  };

  const handleGetNotificationSettings = async () => {
    try {
      const response = await getNotificationSettings();
      setNotifySettings(response.data);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить настройки",
      });
    }
  };

  const handleUpdateNotificationSettings = async (
    value: NotificationSettings
  ) => {
    try {
      await updateNotificationSettings(value);
      await handleGetNotificationSettings()
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Настройки сохранены",
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить настройки",
      });
    }
  };

  useEffect(() => {
    if (!state.personInfo && !nowUpdate) {
      handleGetPerson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleChangePerson,
    handleGetPerson,
    handleAddTgKey,
    handleGetNotificationSettings,
    handleUpdateNotificationSettings,
    notifySettings,
  };
};
