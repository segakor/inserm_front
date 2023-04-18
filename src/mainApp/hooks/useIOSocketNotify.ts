import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { tokenService } from "../../utils";
import { useDispatch } from "../context/hooks";
import { setListOfNotify, setNotifyRef } from "../context/action";
import { Notify } from "../../types";

const URL = import.meta.env.VITE_BASE_URL;

export const useIOSocketNotify = () => {
  const socketNotifyRef = useRef<any>(null);

  const dispatch = useDispatch();

  const auth = tokenService.getIsAuth()

  useEffect(() => {
    if(auth) {
    io(URL, {
      path: "",
      extraHeaders: {
        Authorization: `Bearer ${tokenService.getJwtToken()}`,
      },
    });

    const socketNotify = io(`${URL}/notification`);


    socketNotify.on("connect", () => {
      console.log("Connect socketNotify");
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

    dispatch(setNotifyRef(socketNotifyRef));

    return () => {
      socketNotifyRef.current.disconnect();
      dispatch(setNotifyRef(null));
    };
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return { socketNotifyRef };
};
