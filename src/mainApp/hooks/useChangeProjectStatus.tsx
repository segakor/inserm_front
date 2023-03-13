import { AxiosError } from "axios";
import { changeStatusProject } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";

export const useChangeProjectStatus = () => {
  const handleChangeProjectStatus = async ({
    id,
    isActive,
  }: {
    id: number;
    isActive: boolean;
  }) => {
    try {
      await changeStatusProject({ id, isActive });
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось изменить статус",
        status: typedError.status,
      });
    }
  };

  return {
    handleChangeProjectStatus,
  };
};
