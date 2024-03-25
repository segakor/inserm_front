import { useState } from "react";
import styled from "styled-components";
import { Input as InputComponent, Button, Tooltip, /* Upload */ } from "antd";
import EmojiPicker from "emoji-picker-react";
import {
  SmileTwoTone,
  SmileOutlined,
  SendOutlined,
  /* PaperClipOutlined, */
} from "@ant-design/icons";
/* import { uploadImgBB } from "../../request"; */

const { TextArea } = InputComponent;

enum Categories {
  SUGGESTED = "suggested",
  SMILEYS_PEOPLE = "smileys_people",
}

const Input = styled.div<{ isFile?: string }>`
  padding: ${(props) => (props.isFile ? "15px 15px 50px 15px;" : "15px")};
  border-radius: 10px;
  display: flex;
  margin-top: 10px;
  grid-gap: 16px;
`;

/* const WrapperUpload = styled.div`
  .ant-upload-list-text {
    position: absolute;
    margin-top: 10px;
  }
`; */

export const ChatInput = ({
  onSendMessage,
  isMobile,
}: {
  onSendMessage: (value: string) => void;
  isMobile: boolean;
}) => {
  const [value, setValue] = useState("");
  const [isOpenEmoji, setOpenEmoji] = useState(false);
/*   const [file, setFile] = useState(""); */

  const sendMessage = () => {
    onSendMessage(value);
    setValue("");
  };

  const handleKeyDown = (event: any) => {
    if (event.which === 13 && !event.shiftKey) {
      if (value) sendMessage();
      event.preventDefault();
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    let message = value;
    message += emojiObject.emoji;
    setValue(message);
  };

/*   const props = {
    onChange(info: any) {
      console.log("onChange", info);
      if (info.file.status === "uploading") {
        setFile(info.file.status);
      }
      if (info.file.status === "done") {
        setFile(info.file.response.data.url);
      }
      if (info.file.status === "removed") {
        setFile("");
      }
    },
  }; */

  return (
    <Input /* isFile={file} */>
     {/*  <WrapperUpload>
        <Upload
          {...props}
          accept="image/png, image/jpeg"
          maxCount={1}
          customRequest={uploadImgBB}
        >
          <Button icon={<PaperClipOutlined />}></Button>
        </Upload>
      </WrapperUpload> */}
      <TextArea
        autoSize
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Напишите сообщение..."
        style={{ width: "100%", maxHeight: "100px", scrollbarWidth: "none" }}
        onKeyDown={handleKeyDown}
      />
      {!isMobile && (
        <Tooltip
          color={"white"}
          overlayStyle={{ maxWidth: "500px" }}
          open={isOpenEmoji}
          getPopupContainer={(triggerNode) => triggerNode}
          title={
            <>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                skinTonesDisabled
                searchDisabled
                previewConfig={{ showPreview: false }}
                lazyLoadEmojis
                categories={[
                  {
                    category: Categories.SUGGESTED,
                    name: "Недавние",
                  },
                  {
                    category: Categories.SMILEYS_PEOPLE,
                    name: "Смайлики и люди",
                  },
                ]}
              />
            </>
          }
        >
          <Button
            shape="circle"
            icon={
              isOpenEmoji ? (
                <SmileTwoTone style={{ margin: "3px 0 0 0" }} />
              ) : (
                <SmileOutlined style={{ margin: "3px 0 0 0" }} />
              )
            }
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
        </Tooltip>
      )}
      <Button
        type="primary"
        disabled={!value}
        onClick={sendMessage}
        icon={<SendOutlined style={{ margin: "3.5px 0px 0px 2px" }} />}
      />
    </Input>
  );
};
