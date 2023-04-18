import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { getDate } from "../../utils";
import { Input as InputComponent, Button, Spin } from "antd";
import { useScroll } from "../hooks/useScroll";
import { useIOSocketChat } from "../hooks/useIOSocketChat";
import { useDispatch, useLocalState } from "../context/hooks";
import { removeItemListOfNotify } from "../context/action";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled.div`
  padding: 15px;
  border-radius: 10px;
  display: flex;
  margin-top: 10px;
  grid-gap: 16px;
`;
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 20px;
  overflow: auto;
  height: 100vh;
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

type Props = {
  chatType: "client" | "support";
  roomId: number | null;
};

export const Chat = ({ chatType, roomId }: Props) => {
  const [messages, setMessages] = useState<any>([]);

  const [value, setValue] = useState("");

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

  const sendMessage = async () => {
    socketChatRef.current.emit("message:send", value);
    socketNotify.current.emit("notification:send", roomId);
    setValue("");
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

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && value) {
      sendMessage();
    }
  };

  return (
    <Wrapper>
      <MessageBox ref={element}>
        {isConnect && <Spin size="large" />}
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
                      {getDate({ date: item.date })}
                    </Title>
                  </MessageTitle>
                  <Title level={5} style={{ fontWeight: 400 }}>
                    {item.text}
                  </Title>
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
                    {getDate({ date: item.date })}
                  </Title>
                </MessageTitle>
                <Title level={5} style={{ fontWeight: 400 }}>
                  {item.text}
                </Title>
              </InputMessage>
            )}
          </div>
        ))}
      </MessageBox>
      <Input>
        <InputComponent
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Напишите сообщение..."
          style={{ width: "100%" }}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={sendMessage} type="primary" disabled={!value}>
          Отправить
        </Button>
      </Input>
    </Wrapper>
  );
};
