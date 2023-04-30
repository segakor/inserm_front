import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "../../../common/Typography";
import { RoomItemHeader } from "./RoomItemHeader";
import { ChatComponent } from "../ChatComponent";
import { Room } from "../../../types";
import { ListOfRooms } from "./ListOfRooms";

const Wrapper = styled.div`
  background-color: white;
  width: 970px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const Header = styled.div`
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
  justify-content: space-between;
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 200px);
`;

export const ChatSupport = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleClickRoom = (item: Room) => {
    setSelectedRoom(item);
  };

  return (
    <Wrapper>
      <RoomItemHeader room={selectedRoom} />
      <Body>
        <ListOfRooms
          selectedRoom={selectedRoom}
          onClickRoom={handleClickRoom}
        />
        <ChatComponent roomId={selectedRoom?.id || 0} chatType={"support"} />
      </Body>
    </Wrapper>
  );
};
