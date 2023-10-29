import { useEffect, useState } from "react";
import { getRooms, setMarkOnChat } from "../../request";
import { Room } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useGetRoomChat = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRooms = async (value?: { withoutLoader: boolean }) => {
    try {
      !value?.withoutLoader && setIsLoading(true);
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

  const handleSetMarkOnChat = async (value: {
    isMark: boolean;
    roomId: number;
  }) => {
    try {
      await setMarkOnChat(value);
      await handleGetRooms({ withoutLoader: true });
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось поставить метку",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetRooms();
  }, []);

  return {
    handleSetMarkOnChat,
    rooms: rooms?.map((item) => ({ ...item, unread: 0 })),
    isLoading,
  };
};
