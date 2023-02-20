import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { useNotes } from "../hooks/useNotes";
import { getDate } from "../../utils/getDate";

const Wrapper = styled.div`
  background-color: white;
  padding: 16px;
  width: 400px;
  @media (max-width: 768px) {
    width: auto;
  }
  border-radius: 10px;
`;
const MessageBox = styled.div`
  height: 216px;
  overflow: auto;
  padding: 5px;
`;
const Footer = styled.div`
  display: flex;
  grid-gap: 10px;
`;
const MessageTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MessageBody = styled.div`
  display: flex;
`;
const Message = styled.div`
  border: 1px solid #4096ff;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 5px;
`;

export const Notes = ({ projectId }: { projectId: string }) => {
  const [value, setValue] = useState("");

  const { handleCreateNote, handleGetNotes, notes } = useNotes();

  const onSendNote = async() => {
    await handleCreateNote({ text: value, projectId })
    setValue("");
    await handleGetNotes(projectId);
  };

  useEffect(() => {
    handleGetNotes(projectId);
  }, []);

  return (
    <Wrapper>
      <MessageBox>
        {notes?.map((item, index) => (
          <Message key={index}>
            <MessageTitle>
              <div>{item.user}</div>
              <div>{getDate({date:item.date})}</div>
            </MessageTitle>
            <MessageBody>{item.text}</MessageBody>
          </Message>
        ))}
      </MessageBox>
      <Footer>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button disabled={!value} onClick={onSendNote}>
          добавить
        </Button>
      </Footer>
    </Wrapper>
  );
};
