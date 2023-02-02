import { useState } from "react";
import { openNotificationWithIcon } from "../../utils/notification";
import { ReqLogin } from "../../type";
import { useNavigate } from "react-router-dom";
import { login } from "../../request";
import { tokenService } from "../../utils/tokenService";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();

  const handleLogin = async (value: ReqLogin) => {
    try {
      setIsLoading(true);
      const response = await login(value);
      tokenService.setJwtToken(response.data)
      navigation(`/app/${response.data.role?.toLowerCase()}/projects`);
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
    navigation("/app/login");
  };

  return { handleLogin, handleLogout, isLoading };
};