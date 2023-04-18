import React from "react";
import styled from "styled-components";
import { Badge } from "antd";
import { Title } from "../../common/Typography";
import { Notify } from "../../types";

const UserChat = styled.div<{ isActive: boolean }>`
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
  userName: string;
  email: string;
  roomId?: number;
  onClickItem?: (e: number) => void;
  isActive?: boolean;
  foo: Notify[];
};

export const UserItemChat = ({
  userName,
  email,
  roomId = 0,
  onClickItem,
  isActive = false,
  foo,
}: Props) => {
  const handleClick = () => {
    if (onClickItem) onClickItem(roomId);
  };

  const countNotify = foo.find((item) => item.roomId === roomId);
  return (
    <UserChat onClick={handleClick} isActive={isActive}>
      <UserName>
        <Title level={5}>{userName}</Title>
        <div style={{ color: "#8E8E8E" }}>{email}</div>
      </UserName>
      <Badge count={countNotify?.unread} />
    </UserChat>
  );
};
