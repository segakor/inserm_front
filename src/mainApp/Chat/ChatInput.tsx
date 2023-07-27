import { useState } from "react";
import styled from "styled-components";
import { Input as InputComponent, Button, Tooltip } from "antd";
import EmojiPicker from "emoji-picker-react";
import { SmileTwoTone, SmileOutlined, SendOutlined } from "@ant-design/icons";

enum Categories {
  SUGGESTED = "suggested",
  SMILEYS_PEOPLE = "smileys_people",
}

const Input = styled.div`
  padding: 15px;
  border-radius: 10px;
  display: flex;
  margin-top: 10px;
  grid-gap: 16px;
`;

export const ChatInput = ({
  onSendMessage,
  isMobile,
}: {
  onSendMessage: (value: string) => void;
  isMobile: boolean;
}) => {
  const [value, setValue] = useState("");
  const [isOpenEmoji, setOpenEmoji] = useState(false);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && value) {
      onSendMessage(value);
      setValue("");
    }
  };

  const sendMessage = () => {
    onSendMessage(value);
    setValue("");
  };

  const handleEmojiClick = (emojiObject: any) => {
    let message = value;
    message += emojiObject.emoji;
    setValue(message);
  };

  return (
    <Input>
      <InputComponent
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Напишите сообщение..."
        style={{ width: "100%" }}
        onKeyDown={handleKeyDown}
      />
      {!isMobile && (
        <Tooltip
          color={"white"}
          overlayStyle={{ maxWidth: "500px" }}
          open={isOpenEmoji}
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
            icon={isOpenEmoji ? <SmileTwoTone /> : <SmileOutlined />}
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
        </Tooltip>
      )}
      <Button
        type="primary"
        disabled={!value}
        onClick={sendMessage}
        icon={<SendOutlined />}
      />
    </Input>
  );
};
