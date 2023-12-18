import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Divider, Input } from "antd";
import { useScroll } from "../hooks/useScroll";
import { SendOutlined } from "@ant-design/icons";
import { useBriefNotes } from "../hooks/useBriefNotes";
import { cliapbord, copyBrief, getDate, tokenService } from "../../utils";
import { Brief } from "../../types";
import { ButtonCopy } from "../Button/ButtonCopy";

const { TextArea } = Input;

const Message = styled.div`
  margin-bottom: 12px;
  .date {
    float: right;
  }
`;
const Footer = styled.div`
  display: flex;
  grid-gap: 10px;
`;
const Label = styled.label`
  ::before {
    content: "*";
    color: #ff4d4f;
    margin-inline-end: 4px;
  }
`;
const StyledTextArea = styled(TextArea)`
  border-radius: 10px;
`;

type Props = {
  brief: Brief;
};

export const NotesBrief = ({ brief }: Props) => {
  const { id } = brief;

  const [value, setValue] = useState("");

  const { element } = useScroll();

  const { handleCreateNote, handleGetNotes, notes } = useBriefNotes();

  const onSendNote = async () => {
    await handleCreateNote({ text: value, briefId: id });
    setValue("");
    await handleGetNotes(id);
  };

  useEffect(() => {
    handleGetNotes(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onCopyBrief = () => {
    cliapbord(
      copyBrief({
        ...brief,
        clField: notes || [],
      })
    );
  };

  const role = tokenService.getRole();

  return (
    <>
      <Label>Если в брифе изменения, вы можете указать их тут:</Label>
      <div ref={element}>
        {notes?.map((item, index) => (
          <Message key={index}>
            <div className="date">{getDate({ date: item.date })}</div>
            <StyledTextArea value={item.text} disabled autoSize />
          </Message>
        ))}
      </div>
      <Divider />
      <Footer>
        <TextArea
          autoSize
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="primary"
          disabled={!value}
          onClick={onSendNote}
          icon={<SendOutlined />}
        />
      </Footer>
      {role !== "CLIENT" && (
        <ButtonCopy onClick={onCopyBrief} style={{ marginTop: "10px" }} />
      )}
    </>
  );
};
