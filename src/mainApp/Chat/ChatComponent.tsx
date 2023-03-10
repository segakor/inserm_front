import React from "react";
import { Empty } from "antd";
import { Chat } from "./Chat";

type Props = {
  chatType: "client" | "support";
  roomId: number | null;
};

export const ChatComponent = ({ ...props }: Props) => {
  if (!props.roomId && props.chatType === "support") {
    return (
      <>
        <Empty
          description={"Выберите чат"}
          style={{ width: "100%", marginTop: 100 }}
        />
      </>
    );
  }
  return <Chat {...props} />;
};
