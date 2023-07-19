import { Empty } from "antd";
import { Chat } from "./Chat";
import styled from "styled-components";

type Props = {
  chatType: "client" | "support";
  roomId: number | null;
  isMobile?: boolean;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
`;

export const ChatComponent = ({ ...props }: Props) => {
  
  if (!props.roomId && props.chatType === "support" && props.isMobile) {
    return null
  }

  if (!props.roomId && props.chatType === "support") {
    return (
      <Wrapper>
        <Empty description={"Выберите чат"} />
      </Wrapper>
    );
  }
  return <Chat {...props} />;
};
