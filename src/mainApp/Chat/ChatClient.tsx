import React from "react";
import styled from "styled-components";
import { UserItemChat } from "./UserItemChat";
import { ChatComponent } from "./ChatComponent";
import { useCreateRoomChat } from "../hooks/useCreateRoomChat";

const WrapT = styled.div`
  background-color: white;
  width: 700px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const HeaderT = styled.div`
  height: 65px;
  background: #1579e9;
  border-radius: 10px 10px 0px 0px;
  & h5,
  div {
    color: white !important;
  }
  display: flex;
  align-items: center;
`;
const BodyT = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 200px);
`;

export const ChatClient = () => {
  const { roomId } = useCreateRoomChat();

  return (
    <WrapT>
      <HeaderT>
        <UserItemChat email={""} userName={"Техподдержка"} isHeader={true} />
      </HeaderT>
      <BodyT>
        <ChatComponent roomId={roomId} chatType={"client"} />
      </BodyT>
    </WrapT>
  );
};
