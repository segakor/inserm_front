import { useState } from "react";
import { AxiosError } from "axios";
import { changeStatusProject } from "../../request";
import { openNotificationWithIcon } from "../../utils";

export const useChangeProjectStatus = (type: "project" | "campaign") => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeProjectStatus = async ({
    id,
    isActive,
  }: {
    id: number;
    isActive: boolean;
  }) => {
    try {
      setIsLoading(true);
      await changeStatusProject({ id, isActive }, type);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось изменить статус",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleChangeProjectStatus,
    isLoading,
  };
};
