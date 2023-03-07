import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { tokenService } from "../../utils/tokenService";

type Props = {
  onMessageNew: (data: any) => void;
  onMessageGet: (data: any) => void;
  roomId: number | null;
};

export const useIOSocket = ({ onMessageNew, onMessageGet, roomId }: Props) => {
  const socketClientRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (roomId) {
      const socketclient = io("https://lol.inserm.ru:5001", {
        path: "/chat",
        query: {
          roomId: roomId,
        },
        extraHeaders: {
          Authorization: `Bearer ${tokenService.getJwtToken()}`,
        },
      });

      //слушаем и ловим все сообщения в чате
      socketclient.on("message:new", (data) => {
        console.log("message:new", data);
        onMessageNew(data);
        /* setMessages((prev: any) => [...prev, data]); */
      });
      //показываем все сообщения при заходе
      socketclient.emit("message:get", (data: any) => {
        console.log("message:get", data);
        onMessageGet(data);
        setIsLoading(false)
        /* setMessages(data); */
      });
      socketclient.on("disconnect", () => {
        console.log("Disconnected from server");
      });
      socketclient.on("reconnect", (attemptNumber) => {
        console.log(`Reconnected to server after ${attemptNumber} attempts`);
      });

      socketClientRef.current = socketclient;
      console.log("IO");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return { socketClientRef,isLoading };
};
