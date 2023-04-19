import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { tokenService } from "../../utils";
import { useDispatch } from "../context/hooks";
import { setListOfNotify, setNotifyRef } from "../context/action";
import { Notify } from "../../types";

const URL = import.meta.env.VITE_BASE_URL;

export const useIOSocketNotify = () => {
  const socketClientRef = useRef<any>(null);
  const socketNotifyRef = useRef<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const socketClient = io(URL, {
      path: "",
      extraHeaders: {
        Authorization: `Bearer ${tokenService.getJwtToken()}`,
      },
      forceNew: true,
    });

    const socketNotify = io(`${URL}/notification`, {
      extraHeaders: {
        Authorization: `Bearer ${tokenService.getJwtToken()}`,
      },
      forceNew: true,
    });

    socketNotify.on("connect", () => {
      console.log("Connect socketNotify");
    });

    socketClient.on("connect", () => {
      console.log("Connect socketClient");
    });

    socketClient.on("disconnect", () => {
      console.log("Disconnected socketClient from server");
    });

    socketNotify.on("disconnect", () => {
      console.log("Disconnected socketNotify from server");
    });

    socketNotify.emit("notification:get", (data: Notify[]) => {
      console.log("notification:get", data);
      dispatch(setListOfNotify(data));
    });

    socketNotify.on("notification:new", (data) => {
      console.log("notification:new", data);

      socketNotify.emit("notification:get", (data: Notify[]) => {
        console.log("notification:get", data);
        dispatch(setListOfNotify(data));
      });
    });

    socketNotifyRef.current = socketNotify;
    socketClientRef.current = socketClient;

    dispatch(setNotifyRef(socketNotifyRef));

    return () => {
      socketNotifyRef.current.disconnect();
      socketClientRef.current.disconnect();
      dispatch(setNotifyRef(null));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { socketNotifyRef };
};
