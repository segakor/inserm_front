import { useState } from "react";
import { createProjectByAdmin } from "../../request";
import { openNotificationWithIcon } from "../../utils";

export const useCreateProjectByAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateProjectByAdmin = async (value: {
    email: string;
    name: string;
    tariffId: number;
    price: number;
    period: number;
  }) => {
    try {
      setIsLoading(true);
      value.period = 1;
      await createProjectByAdmin(value);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось создать проект",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateProjectByAdmin,
    isLoading
  };
};
