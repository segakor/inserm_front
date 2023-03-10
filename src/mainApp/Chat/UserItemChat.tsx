import React from "react";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Title } from "../../common/Typography";

const UserChat = styled.div<{ isActive: boolean; isHeader?: boolean }>`
  padding: 10px 20px 10px 20px;
  /* width: 500px; */
  /* width: 280px; */
  display: flex;
  grid-gap: 12px;
  align-items: center;
  cursor: ${(props) => (!props.isHeader ? "pointer" : "null")};
  ${(props) =>
    !props.isHeader ? "&:hover { background-color: whitesmoke }" : ""}
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
  isHeader?: boolean;
};

export const UserItemChat = ({
  userName,
  email,
  roomId = 0,
  onClickItem,
  isActive = false,
  isHeader = false,
}: Props) => {
  const handleClick = () => {
    if (onClickItem) onClickItem(roomId);
  };
  return (
    <UserChat onClick={handleClick} isActive={isActive} isHeader={isHeader}>
      <Avatar
        size={40}
        style={{ backgroundColor: "#313131" }}
        icon={<UserOutlined />}
      />
      <UserName>
        <Title level={5}>{userName}</Title>
        <div style={{ color: "#8E8E8E" }}>{email}</div>
      </UserName>
    </UserChat>
  );
};
