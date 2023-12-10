import { useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { getDateWithTime, toUnixDate } from "../../utils";
import { ChatInput } from "./ChatInput";
import { useScroll } from "../../mainApp/hooks/useScroll";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 20px;
  overflow: auto;
  height: 100vh;
  h5 {
    font-size: 18px !important;
  }
  @media (max-width: 768px) {
    h5 {
      font-size: 16px !important;
    }
  }
`;
const OutputMessage = styled.div`
  padding: 12px 20px 12px 20px;
  background: #1579e9;
  border-radius: 10px 10px 10px 0px;
  width: 80%;
  h5 {
    color: #ffffff !important;
  }
`;
const OutputMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InputMessage = styled.div`
  padding: 12px 20px 12px 20px;
  background: #f0f0f0;
  border-radius: 10px 10px 10px 0px;
  & div,
  h1,
  h5 {
    color: #313131 !important;
  }
  max-width: 80%;
`;
const MessageTitle = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type Props = {
  chatType: "client" | "support";
  isMobile: boolean;
};

const message = [
  "Спасибо за обращение! Мы всегда рады помочь вам.",
  "Благодарим за обращение! Наша команда будет рада помочь вам.",
  "Рады вашему обращению! Мы здесь, чтобы помочь вам.",
  "Спасибо, что выбрали нас! Мы всегда готовы помочь.",
  "Благодарим за ваше обращение! Наши специалисты будут рады помочь вам.",
  "Уточните, пожалуйста, ваш вопрос или возникшую проблему, чтобы мы могли предоставить вам более точную информацию.",
  "Наши специалисты уже занимаются вашим вопросом и предоставят ответ в ближайшее время.",
  "Благодарим вас за обращение. Мы уже работаем над вашей проблемой и постараемся решить ее в кратчайшие сроки.",
];

export const Chat = ({ chatType, isMobile }: Props) => {
  const [messages, setMessages] = useState<any>([]);

  const checkTypeMsg = (isClient: boolean) => {
    if (isClient) {
      return chatType === "client" && isClient;
    }
    if (!isClient) {
      return chatType === "support" && !isClient;
    }
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const sendMessage = (e: string) => {
    const val = { text: e, date: toUnixDate(new Date()), isClient: true };
    setMessages((prev: any) => [...prev, val]);

    setTimeout(() => {
      // Most recent value
      const val = {
        text: message[getRandomInt(7)],
        date: toUnixDate(new Date()),
        isClient: false,
      };
      setMessages((prev: any) => [...prev, val]);
    }, 200);
  };

  const { element } = useScroll();

  return (
    <Wrapper>
      <MessageBox ref={element}>
        {messages.map((item: any) => (
          <div key={item.id}>
            {checkTypeMsg(item.isClient) ? (
              <OutputMessageWrapper>
                <OutputMessage>
                  <MessageTitle>
                    <Title
                      style={{
                        fontSize: 14,
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      {getDateWithTime({ date: item.date })}{" "}
                    </Title>
                  </MessageTitle>
                  <Title
                    level={5}
                    style={{ fontWeight: 400, whiteSpace: "pre-line" }}
                  >
                    {item.text}
                  </Title>
                </OutputMessage>
              </OutputMessageWrapper>
            ) : (
              <InputMessage>
                <MessageTitle>
                  <Title
                    style={{
                      fontSize: 14,
                      color: "#8E8E8E",
                      fontWeight: 400,
                    }}
                  >
                    {getDateWithTime({ date: item.date })}
                  </Title>
                </MessageTitle>
                <Title
                  level={5}
                  style={{ fontWeight: 400, whiteSpace: "pre-line" }}
                >
                  {item.text}
                </Title>
              </InputMessage>
            )}
          </div>
        ))}
      </MessageBox>
      <ChatInput onSendMessage={sendMessage} isMobile={isMobile} />
    </Wrapper>
  );
};
