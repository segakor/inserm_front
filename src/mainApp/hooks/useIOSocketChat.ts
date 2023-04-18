import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { tokenService } from "../../utils";
import { useDispatch } from "../context/hooks";
import { removeItemListOfNotify } from "../context/action";

type Props = {
  onMessageNew: (data: any) => void;
  onMessageGet: (data: any) => void;
  roomId: number | null;
};

const URL = import.meta.env.VITE_BASE_URL;

export const useIOSocketChat = ({
  onMessageNew,
  onMessageGet,
  roomId,
}: Props) => {
  const socketChatRef = useRef<any>(null);
  const [isConnect, setIsConnect] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (roomId) {
      const socketChat = io(`${URL}/chat`, {
        query: {
          roomId: roomId,
        },
        extraHeaders: {
          Authorization: `Bearer ${tokenService.getJwtToken()}`,
        },
        forceNew: true,
      });

      socketChat.on("connect", () => {
        console.log("Connect socketChat");
        setIsConnect(true);
        dispatch(removeItemListOfNotify(roomId));
      });

      socketChat.on("disconnect", () => {
        console.log("Disconnected socketChat from server");
        onMessageGet([]);
      });

      //слушаем и ловим все сообщения в чате
      socketChat.on("message:new", (data) => {
        onMessageNew(data);
      });
      
      //показываем все сообщения при заходе
      socketChat.emit("message:get", (data: any) => {
        onMessageGet(data);
      });

      socketChatRef.current = socketChat;

      return () => {
        socketChatRef.current.disconnect();
        setIsConnect(false);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return { socketChatRef, isConnect };
};
