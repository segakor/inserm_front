import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Tooltip } from "antd";
import { useNotes } from "../hooks/useNotes";
import { getDate } from "../../utils/getDate";
import { Title } from "../../common/Typography";
import { useScroll } from "../hooks/useScroll";

const Wrapper = styled.div`
  background-color: white;
  padding: 16px;
  width: 400px;
  @media (max-width: 768px) {
    width: auto;
  }
  border-radius: 10px;
  max-height: 280px;
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

const { TextArea } = Input;

const TooltipComponent = () => {  
  return (
    <>
      <p>Для изменения стиля шрифта оберните текст в следующие теги:</p>
      <div>{"<b>жирный</b>"}</div>
      <div>{"<i>курсив</i>"}</div>
      <div>{"<u>подчеркнутый</u>"}</div>
      <div>{"<a href='ссылка'>ссылка</a>"}</div>
    </>
  );
};

export const Notes = ({ projectId }: { projectId: string }) => {
  const [value, setValue] = useState("");

  const { element } = useScroll();

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
      <MessageBox ref={element}>
        {notes?.map((item, index) => (
          <Message key={index}>
            <MessageTitle>
              <Title level={5}>{item.user}</Title>
              <div>{getDate({ date: item.date })}</div>
            </MessageTitle>
            <div
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </Message>
        ))}
      </MessageBox>
      <Footer>
        <Tooltip title={TooltipComponent}>
          <TextArea
            style={{ height: 0, resize: "none", overflow: "hidden" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Tooltip>
        <Button disabled={!value} onClick={onSendNote}>
          добавить
        </Button>
      </Footer>
    </Wrapper>
  );
};
