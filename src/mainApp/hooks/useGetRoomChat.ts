import { useEffect, useState } from "react";
import { getRooms } from "../../request";
import { Room } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useGetRoomChat = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRooms = async () => {
    try {
      setIsLoading(true);
      const response = await getRooms();
      setRooms(response.data.result);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить чаты",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetRooms();
  }, []);

  return {
    rooms: rooms?.map((item) => ({ ...item, unread: 0 })),
    isLoading,
  };
};
