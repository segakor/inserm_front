import { useEffect, useState } from "react";
import { createRoom } from "../../request";
import { openNotificationWithIcon } from "../../utils/notification";

export const useCreateRoomChat = () => {
  const [roomId, setRoomId] = useState<number|null>(null);

  const handleCreateRoom = async () => {
    try {
      const response = await createRoom();
      setRoomId(response.data.roomId);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Что-то пошло не так",
      });
    }
  };

  useEffect(() => {
    handleCreateRoom();
  }, []);

  return {
    roomId,
  };
};
