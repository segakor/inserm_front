import React from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";

const UserChat = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  grid-gap: 12px;
  align-items: center;
`;
const UserName = styled.div`
  flex-direction: row;
`;

type Props = {
  userName: string;
  email: string;
};

export const UserItemHeader = ({ userName, email }: Props) => {
  return (
    <UserChat>
      <UserName>
        <Title level={5}>{userName}</Title>
        <div style={{ color: "#8E8E8E" }}>{email}</div>
      </UserName>
    </UserChat>
  );
};
