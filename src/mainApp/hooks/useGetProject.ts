import { AxiosError } from "axios";
import { getProject } from "../../request";
import { openNotificationWithIcon } from "../../utils";
import { setClientProject, setIsLoadingProject } from "../context/action";
import { useDispatch, useLocalState } from "../context/hooks";

export const useGetProject = () => {
  const dispatch = useDispatch();

  const state = useLocalState();

  const {
    filterProject: { isActive },
  } = state;
  

  const handleGetClientProject = async () => {
    try {
      dispatch(setIsLoadingProject(true));
      const response = await getProject(isActive);
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
    } finally {
      dispatch(setIsLoadingProject(false));
    }
  };

  return { handleGetClientProject };
};
