import { useState } from "react";
import { registration } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useAuth } from "./useAuth";

export const useRegistartion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleLogin } = useAuth();

  const handleRegistartion = async (value: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await registration(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Вы успешно зарегистрировались!",
      });
      await handleLogin(value);
    } catch (err: any) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description:
          err?.data?.message === "email is duplicate!"
            ? `Пользователь с почтой ${value.email} уже зарегистрирован`
            : "Что-то пошло не так",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleRegistartion,
    isLoading,
  };
};
