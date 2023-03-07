import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { getDate } from "../../utils/getDate";
import { Input as InputComponent, Button, Spin } from "antd";
import { useScroll } from "../hooks/useScroll";
import { useIOSocket } from "../hooks/useIOSocket";
import { useCreateRoomChat } from "../hooks/useCreateRoomChat";

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0 0 0;
  width: 100%;
`;
const Input = styled.div`
  border: 1px solid #1579e9;
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
  height: 70vh;
`;
const InputMessage = styled.div`
  padding: 12px 20px 12px 20px;
  background: #ffffff;
  border-radius: 10px 10px 10px 0px;
  width: 80%;
`;
const InputMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const OutputMessage = styled.div`
  padding: 12px 20px 12px 20px;
  background: #1579e9;
  border-radius: 10px 10px 10px 0px;
  & div,
  h1,
  h5 {
    color: white !important;
  }
  max-width: 80%;
`;
const MessageTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChatClient = () => {
   //TODO: объединить с ChatSupport
  const [messages, setMessages] = useState<any>([]);

  const [value, setValue] = useState("");

  const { roomId } = useCreateRoomChat();

  const { element } = useScroll();

  const handleMessageGet = (data: any) => {
    setMessages(data);
  };
  const handleMessageNew = (data: any) => {
    setMessages((prev: any) => [...prev, data]);
  };

  const { socketClientRef, isLoading } = useIOSocket({
    onMessageNew: handleMessageNew,
    onMessageGet: handleMessageGet,
    roomId: roomId,
  });

  const sendMessage = async () => {
    socketClientRef.current.emit("message:send", value);
    setValue("");
  };

  return (
    <>
      <Chat>
        <MessageBox ref={element}>
          {isLoading && <Spin size="large" />}
          {messages.map((item: any) => (
            <div key={item.id}>
              {item.isClient ? (
                <InputMessageWrapper>
                  <InputMessage>
                    <MessageTitle>
                      <Title
                        style={{
                          fontSize: 14,
                          color: "#8E8E8E",
                          fontWeight: 400,
                        }}
                      >
                        Вы
                      </Title>
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
                </InputMessageWrapper>
              ) : (
                <OutputMessage>
                  <MessageTitle>
                    <Title
                      style={{
                        fontSize: 14,
                        color: "#8E8E8E",
                        fontWeight: 400,
                      }}
                    >
                      Техподдержка
                    </Title>
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
                </OutputMessage>
              )}
            </div>
          ))}
        </MessageBox>
        <Input>
          <InputComponent
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="напишите свой вопрос"
            style={{ width: "100%" }}
          />
          <Button onClick={sendMessage} type="primary" disabled={!value}>
            Отправить
          </Button>
        </Input>
      </Chat>
    </>
  );
};
