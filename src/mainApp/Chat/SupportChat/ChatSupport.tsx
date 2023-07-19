import { useState } from "react";
import styled from "styled-components";
import { RoomItemHeader } from "./RoomItemHeader";
import { ChatComponent } from "../ChatComponent";
import { Room } from "../../../types";
import { ListOfRooms } from "./ListOfRooms";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  width: auto;
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
  const handleRemoveRoom = () => {
    setSelectedRoom(null);
  };

  const screens = useBreakpoint();
  const isMobile = !!screens.xs;

  return (
    <Wrapper>
      <RoomItemHeader
        room={selectedRoom}
        onRemoveRoom={handleRemoveRoom}
        isMobile={isMobile}
      />
      <Body>
        <ListOfRooms
          selectedRoom={selectedRoom}
          onClickRoom={handleClickRoom}
          isMobile={isMobile}
        />
        <ChatComponent
          roomId={selectedRoom?.id || 0}
          chatType={"support"}
          isMobile={isMobile}
        />
      </Body>
    </Wrapper>
  );
};
