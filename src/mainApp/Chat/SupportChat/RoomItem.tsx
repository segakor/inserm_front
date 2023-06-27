import React from "react";
import styled from "styled-components";
import { Badge } from "antd";
import { Title } from "../../../common/Typography";
import { Room } from "../../../types";

const Wrapper = styled.div<{ isActive: boolean }>`
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: whitesmoke;
  }
  background-color: ${(props) => (props.isActive ? "whitesmoke" : "")};
`;
const UserName = styled.div`
  flex-direction: row;
`;

type Props = {
  room: Room;
  onClickRoom: (e: Room) => void;
  isActive?: boolean;
};

export const RoomItem = ({ room, onClickRoom, isActive = false }: Props) => {
  const handleClick = () => {
    onClickRoom(room);
  };

  return (
    <Wrapper onClick={handleClick} isActive={isActive}>
      <UserName>
        <Title level={5}>{room.name || "-"}</Title>
        <div style={{ color: "#8E8E8E" }}>{room.email}</div>
      </UserName>
      <Badge count={room.unread} />
    </Wrapper>
  );
};
