import { useState, useEffect } from "react";
import { openNotificationWithIcon } from "../utils/notification";
import { ReqLogin } from "../type";
import { useNavigate } from "react-router-dom";
import { login } from "../request";
import { useAuthCheck } from "./useAuthCheck";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { auth } = useAuthCheck();

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

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return { handleLogin, handleLogout, isLoading };
};
