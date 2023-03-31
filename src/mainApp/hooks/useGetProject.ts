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
      dispatch(setClientProject(response.data.projectsArray));
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить проекты клиента",
        status: typedError.status
      });
    }
  };

  return { handleGetClientProject };
};
