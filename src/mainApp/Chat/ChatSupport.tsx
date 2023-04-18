import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { useGetRoomChat } from "../hooks/useGetRoomChat";
import { UserItemChat } from "./UserItemChat";
import { UserItemHeader } from "./UserItemHeader";
import { ChatComponent } from "./ChatComponent";
import { useLocalState } from "../context/hooks";

const WrapT = styled.div`
  background-color: white;
  width: 970px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const HeaderT = styled.div`
  height: 65px;
  background: #1579e9;
  border-radius: 10px 10px 0px 0px;
  padding: 20px;
  & h5,
  div {
    color: white !important;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const BodyT = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 200px);
`;
const RoomsT = styled.div`
  border-right: 2px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;
  width: 450px;
`;

export const ChatSupport = () => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const { rooms } = useGetRoomChat();

  const handleClickRoom = (roomId: number) => {
    setSelectedRoom(roomId);
  };

  const headerItemChat = rooms?.find((item) => item.id === selectedRoom);

  const state = useLocalState();
  const listOfNotify = state.listOfNotify;

  return (
    <WrapT>
      <HeaderT>
        <Title level={5} style={{ fontSize: 18, width: 280 }}>
          Список чатов
        </Title>
        {headerItemChat && (
          <UserItemHeader
            email={headerItemChat.email}
            userName={headerItemChat.name}
          />
        )}
      </HeaderT>
      <BodyT>
        <RoomsT>
          {rooms?.map((item, index) => (
            <UserItemChat
              key={index}
              roomId={item.id}
              email={item.email}
              userName={item.name}
              onClickItem={handleClickRoom}
              isActive={selectedRoom === item.id ? true : false}
              listOfNotify={listOfNotify}
            />
          ))}
        </RoomsT>
        <ChatComponent roomId={selectedRoom} chatType={"support"} />
      </BodyT>
    </WrapT>
  );
};
