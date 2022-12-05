import React, { useState } from "react";
import { openNotificationWithIcon } from "../utils/notification";
import { ReqLogin } from "../type";
import { useNavigate } from "react-router-dom";
import { login } from "../request";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (value: ReqLogin) => {
    try {
      setIsLoading(true);
      const response = await login(value);
      localStorage.setItem("loginData", JSON.stringify(response.data));
      //TODO: сетить начальную страницу в зависимости от роли
      navigate(`/${response.data.role?.toLowerCase()}`);
    } catch (err) {
      console.log(err);
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Неверный emal или пароль",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    navigate("/login");
  };

  return { handleLogin, handleLogout, isLoading };
};
