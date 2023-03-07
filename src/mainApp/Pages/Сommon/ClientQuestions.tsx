import React, { useState } from "react";
import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";
import { useGetRoomChat } from "../../hooks/useGetRoomChat";
import { ChatSupport } from "../../components/ChatSupport";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ChatWrapper = styled.div`
  display: flex;
`;
const Room = styled.div`
/*   border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 500px;
`;
const RoomItem = styled.div<{ isActive: boolean }>`
  /* width: 250px; */
  display: inline-flex;
  margin: 8px;
  border-radius: 10px;
  padding: 4px;
  background-color: ${(props) => (props.isActive ? "#1579E9" : "white")};
  & h5 {
    color: ${(props) =>
      props.isActive ? "white !important" : "#8e8e8e !important"};
  }
`;
const Item = styled(Title)`
  width: 350px;
  font-size: 14px;
  margin-bottom: 5px;
  color: #8e8e8e !important;
  font-weight: 500 !important;
  cursor: pointer;
  border-radius: 10px;
`;

export const ClientQuestions = () => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const { rooms } = useGetRoomChat();

  const handleClickRoom = (roomId: number) => {
    setSelectedRoom(roomId);
  };

  return (
    <Page>
      <Header>Вопросы клиентов</Header>
      <ChatWrapper>
        <Room>
          <Title level={5}>Список чатов</Title>
          {rooms?.map((item, index) => (
            <RoomItem
              onClick={() => handleClickRoom(item.id)}
              key={index}
              isActive={item.id === selectedRoom}
            >
              <Item level={5}>{item.email}</Item>
            </RoomItem>
          ))}
        </Room>
        <ChatSupport roomId={selectedRoom} />
      </ChatWrapper>
    </Page>
  );
};
