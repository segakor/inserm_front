import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Tooltip } from "antd";
import { useNotes } from "../hooks/useNotes";
import { getDate } from "../../utils";
import { Title } from "../../common/Typography";
import { useScroll } from "../hooks/useScroll";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  background-color: white;
  padding: 16px;
  width: 400px;
  @media (max-width: 768px) {
    width: auto;
    margin-bottom: 20px;
  }
  border-radius: 10px;
  max-height: 280px;
`;
const MessageBox = styled.div`
  height: 216px;
  overflow: auto;
  padding: 5px;
  word-wrap: break-word;
  margin-bottom: 8px;
`;
const Footer = styled.div`
  display: flex;
  grid-gap: 10px;
  height: 30px;
`;
const MessageTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CloseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 8px;
`;
const Message = styled.div<{ isClient: boolean }>`
  border: ${(props) =>
    !props.isClient ? "1px solid #4096ff" : "1px solid #1bbd42"};
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

type Props = {
  type: "campaign" | "project";
  id: string;
};

export const Notes = ({ type, id }: Props) => {
  const [value, setValue] = useState("");

  const { element } = useScroll();

  const { handleCreateNote, handleGetNotes, notes, handleDeleteNote } =
    useNotes();

  const onSendNote = async () => {
    await handleCreateNote({ text: value, id }, type);
    setValue("");
    await handleGetNotes(id, type);
  };

  useEffect(() => {
    handleGetNotes(id, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Wrapper>
      <MessageBox ref={element}>
        {notes?.map((item, index) => (
          <Message key={index} isClient={item.isClient}>
            <MessageTitle>
              <Title level={5}>{item.user}</Title>
              <CloseWrapper>
                <div>{getDate({ date: item.date })}</div>
                <CloseOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteNote(item.id, type, id)}
                />
              </CloseWrapper>
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
            style={{ resize: "none", overflow: "hidden" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Tooltip>
        <Button
          type="primary"
          disabled={!value}
          onClick={onSendNote}
          icon={<SendOutlined />}
        />
      </Footer>
    </Wrapper>
  );
};
