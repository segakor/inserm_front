import { useState } from "react";
import { createCampaign } from "../../request";
import { ReqCreateCampaign } from "../../types";
import { goToAinoxPageCampaign, openNotificationWithIcon } from "../../utils";

export const useCreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCampaign = async (
    value: ReqCreateCampaign,
    price: number
  ) => {
    try {
      setIsLoading(true);
      await createCampaign(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Проект успешно создан",
      });
      goToAinoxPageCampaign({
        email: value.email,
        projectName: value.name,
        price: price,
      });
    } catch (err) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: `Не удалось создать проект`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateCampaign,
    isLoading,
  };
};
