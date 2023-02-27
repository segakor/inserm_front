import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { useNotes } from "../hooks/useNotes";
import { getDate } from "../../utils/getDate";
import { Title } from "../../common/Typography";

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
  word-wrap: break-word;
`;
const Footer = styled.div`
  display: flex;
  grid-gap: 10px;
`;
const MessageTitle = styled.div`
  display: flex;
  justify-content: space-between;
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

  const onSendNote = async () => {
    await handleCreateNote({ text: value, projectId });
    setValue("");
    await handleGetNotes(projectId);
  };

  useEffect(() => {
    handleGetNotes(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <MessageBox>
        {notes?.map((item, index) => (
          <Message key={index}>
            <MessageTitle>
              <Title level={5}>{item.user}</Title>
              <div>{getDate({ date: item.date })}</div>
            </MessageTitle>
            <div>{item.text}</div>
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
