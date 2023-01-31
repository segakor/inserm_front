import { getAdmin } from "../../request";
import { setListOfAdmin } from "../context/action";
import { useDispatch } from "../context/hooks";
import { openNotificationWithIcon } from "../../utils/notification";
import { AxiosError } from "axios";

export const useGetAdmin = () => {

  const dispatch = useDispatch();

  const handleGetAdmin = async () => {
    try {
      const response = await getAdmin();
      dispatch(setListOfAdmin(response.data.result));
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить админов",
        status: typedError.status
      });
    }
  };

  return {
    handleGetAdmin
  };
};
