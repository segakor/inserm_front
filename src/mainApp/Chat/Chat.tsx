import { useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { getDateWithTime } from "../../utils";
import { Spin } from "antd";
import { useScroll } from "../hooks/useScroll";
import { useIOSocketChat } from "../hooks/useIOSocketChat";
import { useDispatch, useLocalState } from "../context/hooks";
import { removeItemListOfNotify } from "../context/action";
import { ChatInput } from "./ChatInput";
import { deleteMessage } from "../../request";
import { DeleteFilled } from "@ant-design/icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 20px;
  overflow: auto;
  height: 100vh;
  h5 {
    font-size: 18px !important;
  }
  @media (max-width: 768px) {
    h5 {
      font-size: 16px !important;
    }
  }
`;
const OutputMessage = styled.div`
  padding: 12px 20px 12px 20px;
  background: #1579e9;
  border-radius: 10px 10px 10px 0px;
  width: 80%;
  h5 {
    color: #ffffff !important;
  }
`;
const OutputMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InputMessage = styled.div`
  padding: 12px 20px 12px 20px;
  background: #f0f0f0;
  border-radius: 10px 10px 10px 0px;
  & div,
  h1,
  h5 {
    color: #313131 !important;
  }
  max-width: 80%;
`;
const MessageTitle = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledSpin = styled(Spin)`
  margin-top: 150px;
`;

type Props = {
  chatType: "client" | "support";
  roomId: number | null;
  isMobile: boolean;
};

export const Chat = ({ chatType, roomId, isMobile }: Props) => {
  const [messages, setMessages] = useState<any>([]);

  const { element } = useScroll();

  const handleMessageGet = (data: any) => {
    setMessages(data);
  };
  const handleMessageNew = (data: any) => {
    setMessages((prev: any) => [...prev, data]);
  };

  const { socketChatRef, isConnect } = useIOSocketChat({
    onMessageNew: handleMessageNew,
    onMessageGet: handleMessageGet,
    roomId: roomId,
  });

  const state = useLocalState();
  const { socketNotify } = state;

  const dispatch = useDispatch();

  const sendMessage = async (value: string) => {
    socketChatRef.current.emit("message:send", value);
    socketNotify.current.emit("notification:send", roomId);
    dispatch(removeItemListOfNotify(roomId));
  };

  const checkTypeMsg = (isClient: boolean) => {
    if (isClient) {
      return chatType === "client" && isClient;
    }
    if (!isClient) {
      return chatType === "support" && !isClient;
    }
  };

  const onDeleteMessage = (messageId: number) => {
    deleteMessage({ messageId }).then(() => {
      const data = messages.filter((item: any) => item.id !== messageId);
      setMessages(data);
    });
  };

  return (
    <Wrapper>
      <MessageBox ref={element}>
        {!isConnect && <StyledSpin size="large" />}
        {messages.map((item: any) => (
          <div key={item.id}>
            {checkTypeMsg(item.isClient) ? (
              <OutputMessageWrapper>
                <OutputMessage>
                  <MessageTitle>
                    <Title
                      style={{
                        fontSize: 14,
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      {getDateWithTime({ date: item.date })}{" "}
                    </Title>
                  </MessageTitle>
                  <Title
                    level={5}
                    style={{ fontWeight: 400, whiteSpace: "pre-line" }}
                  >
                    {item.text}
                  </Title>
                  {!item.isClient && (
                    <DeleteFilled
                      onClick={() => onDeleteMessage(item.id)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        float: "right",
                      }}
                    />
                  )}
                </OutputMessage>
              </OutputMessageWrapper>
            ) : (
              <InputMessage>
                <MessageTitle>
                  <Title
                    style={{
                      fontSize: 14,
                      color: "#8E8E8E",
                      fontWeight: 400,
                    }}
                  >
                    {getDateWithTime({ date: item.date })}
                  </Title>
                </MessageTitle>
                <Title
                  level={5}
                  style={{ fontWeight: 400, whiteSpace: "pre-line" }}
                >
                  {item.text}
                </Title>
              </InputMessage>
            )}
          </div>
        ))}
      </MessageBox>
      <ChatInput onSendMessage={sendMessage} isMobile={isMobile} />
    </Wrapper>
  );
};
