import React from "react";
import styled from "styled-components";
import { Badge, Dropdown, MenuProps } from "antd";
import { Title } from "../../../common/Typography";
import { Room } from "../../../types";
import { EllipsisOutlined, FlagOutlined, FlagTwoTone } from "@ant-design/icons";

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
  .badge {
    display: flex;
    grid-gap: 16px;
    align-items: center;
  }
`;
const UserName = styled.div`
  max-width: 200px;
  .email {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #8E8E8E;
  }
`;

type Props = {
  room: Room;
  onClickRoom: (e: Room) => void;
  onClickMark: (e: { isMark: boolean; roomId: number }) => void;
  isActive?: boolean;
};

export const RoomItem = ({
  room,
  onClickRoom,
  isActive = false,
  onClickMark,
}: Props) => {
  const handleClick = () => {
    onClickRoom(room);
  };
  return (
    <Wrapper onClick={handleClick} isActive={isActive}>
      <UserName>
        <Title level={5}>{room.name || "-"}</Title>
        <div className="email">{room.email}</div>
      </UserName>
      <div className="badge">
        <Badge count={room.unread} />
        <FlagTwoTone
          twoToneColor={room.isMark ? "#FF0000" : "#1579e9"}
          onClick={(e) => {
            e.stopPropagation();
            onClickMark({ isMark: !room.isMark, roomId: room.id });
          }}
        />
      </div>
    </Wrapper>
  );
};
