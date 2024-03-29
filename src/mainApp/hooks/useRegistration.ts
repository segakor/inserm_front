import { useState } from "react";
import { registration } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { useAuth } from "./useAuth";

export const useRegistartion = (
  type: "clientRegistration" | "partnerRegistration"
) => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleLogin } = useAuth();

  const handleRegistartion = async (value: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await registration({ ...value, type });
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
            ? type === "clientRegistration"
              ? `Пользователь с почтой ${value.email} уже зарегистрирован`
              : `На почте ${value.email} есть существующий аккаунт, необходимо зарегистрировать партнерский аккаунт на новую почту.`
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
