import { useEffect } from "react";
import { getPerson, changePerson } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";
import { setPersonInfo } from "../context/action";
import { useDispatch, useLocalState } from "../context/hooks";
import { ReqPersonChange } from "../../type";
import { AxiosError } from "axios";

export const usePerson = (nowUpdate?: boolean) => {
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
        status: typedError.status
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
        status: typedError.status
      });
    }
  };
  useEffect(() => {
    if (!state.personInfo && !nowUpdate) {
      handleGetPerson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleChangePerson, handleGetPerson };
};
