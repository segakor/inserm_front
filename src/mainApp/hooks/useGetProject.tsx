/* import { useEffect } from "react"; */
import { getProject } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";
import { setClientProject } from "../context/action";
import { useDispatch } from "../context/hooks";
/* import { useAuthCheck } from "./useAuthCheck"; */


export const useGetProject = () => {
  const dispatch = useDispatch();
  /* const { role } = useAuthCheck(); */

  const handleGetClientProject = async () => {
    try {
      const response = await getProject();
      dispatch(setClientProject(response.data.projectsArray));
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить проекты клиента",
      });
    }
  };
  /* useEffect(() => {
    if (role === 'CLIENT') {
      handleGetClientProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]); */

  return { handleGetClientProject };
};
