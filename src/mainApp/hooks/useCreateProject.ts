import { useNavigate } from "react-router-dom";
import { createProject } from "../../request";
import { ReqProjectCreate } from "../../types";
import { openNotificationWithIcon } from "../../utils";
import { useGetProject } from "./useGetProject";

export const useCreateProject = () => {
  const navigation = useNavigate();
  const { handleGetClientProject } = useGetProject();

  const handleCreateProject = async (value: ReqProjectCreate) => {
    try {
      await createProject(value);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Проект успешно создан",
      });
      await handleGetClientProject()
      navigation(`app/client/projects/`);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось создать проект",
      });
    }
  };

  return {
    handleCreateProject,
  };
};
