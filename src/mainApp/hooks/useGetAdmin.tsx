import { getAdmin } from "../../request";
import { setListOfAdmin } from "../context/action";
import { useDispatch } from "../context/hooks";
import { openNotificationWithIcon } from "../../utils/notification";

export const useGetAdmin = () => {

  const dispatch = useDispatch();

  const handleGetAdmin = async () => {
    try {
      const response = await getAdmin();
      dispatch(setListOfAdmin(response.data.result));
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить админов",
      });
    }
  };

  return {
    handleGetAdmin
  };
};
