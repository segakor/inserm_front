import { useEffect, useState } from "react";
import { getRooms } from "../../request";
import { Room } from "../../type";
import { openNotificationWithIcon } from "../../utils/notification";

export const useGetRoomChat = () => {
  const [rooms, setRooms] = useState<Room[]>();

  const handleGetRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data.result);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить чаты",
      });
    }
  };

  useEffect(() => {
    handleGetRooms();
  }, []);

  return {
    rooms,
  };
};
