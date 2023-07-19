import styled from "styled-components";
import { useGetRoomChat } from "../../hooks/useGetRoomChat";
import { useLocalState } from "../../context/hooks";
import { Room } from "../../../types";
import { sortChatItem } from "../../../utils/sortChatItem";
import { RoomItem } from "./RoomItem";

const Wrapper = styled.div`
  border-right: 2px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;
  width: 450px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

type Props = {
  onClickRoom: (e: Room) => void;
  selectedRoom: Room | null;
  isMobile: boolean;
};

export const ListOfRooms = ({ onClickRoom, selectedRoom, isMobile }: Props) => {
  const { rooms } = useGetRoomChat();

  const state = useLocalState();
  const listOfNotify = state.listOfNotify;

  sortChatItem(rooms, listOfNotify);

  if (isMobile && selectedRoom) return null

  return (
    <Wrapper>
      {rooms?.map((item, index) => (
        <RoomItem
          key={index}
          room={item}
          onClickRoom={onClickRoom}
          isActive={selectedRoom?.id === item.id ? true : false}
        />
      ))}
    </Wrapper>
  );
};
