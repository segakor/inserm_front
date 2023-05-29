import { AxiosError } from "axios";
import { getProject } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { setClientProject } from "../context/action";
import { useDispatch } from "../context/hooks";

export const useGetProject = () => {
  const dispatch = useDispatch();

  const handleGetClientProject = async () => {
    try {
      const response = await getProject();
      const projectsArray = response.data.projectsArray.map((item) => ({
        ...item,
        type: "project",
      }));
      dispatch(setClientProject(projectsArray));
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить проекты",
        status: typedError.status,
      });
    }
  };

  return { handleGetClientProject };
};
