import { useState } from "react";
import { openNotificationWithIcon, tokenService } from "../../utils";
import { ReqLogin } from "../../types";
import { useNavigate } from "react-router-dom";
import { login } from "../../request";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (value: ReqLogin) => {
    try {
      setIsLoading(true);
      const response = await login(value);
      tokenService.setJwtToken(response.data);

      response.data.role?.toLowerCase() === "client"
        ? navigate(`/app/client/projects`)
        : navigate(`/app/admin/projects`);

      /* navigate(`/app/${response.data.role?.toLowerCase()}/projects`); */
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Неверный email или пароль",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    tokenService.removeJwtToken();
    navigate("/app/login");
  };

  return { handleLogin, handleLogout, isLoading };
};
