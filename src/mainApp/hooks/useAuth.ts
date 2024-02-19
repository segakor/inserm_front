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

      switch (true) {
        case response.data.role?.toLowerCase() === "client":
          navigate(`/app/client/projects`);
          break;
        case response.data.role?.toLowerCase() === "partner":
          navigate(`/app/partner/main`);
          break;
        default:
          navigate(`/app/admin/projects`);
          break;
      }

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
