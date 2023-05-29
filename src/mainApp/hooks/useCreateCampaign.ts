import { useState } from "react";
import { createCampaign } from "../../request";
import { ReqCreateCampaign } from "../../types";
import { goToAinoxPagePiece, openNotificationWithIcon } from "../../utils";

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
      goToAinoxPagePiece({
        email: value.email,
        projectName: value.name,
        price: price,
        formId: "5eeffdfc498f606",
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
