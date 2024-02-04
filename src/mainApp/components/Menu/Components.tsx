import styled from "styled-components";
import { Role } from "../../../types";
import { ButtonCreateIdea } from "../../Button/ButtonCreateIdea";
import { ReactComponent as Telegram } from "../../../assets/telegram.svg";
import { ReactComponent as Whatsapp } from "../../../assets/whatsapp.svg";

const WraperLinkAndIdea = styled.div`
  padding: 0 30px;
  margin: 50px 0 30px 0;
`;

const WrapperLink = styled(WraperLinkAndIdea)`
  margin: 0;
`;
const WrapperContacts = styled.div`
  padding: 30px;
`;
const ContactsBlock = styled.div`
  background: #daedff;
  border-radius: 10px;
  padding: 15px;
`;
const WrapperIcon = styled.div`
  display: flex;
  grid-gap: 10px;
  margin-top: 10px;
  svg {
    cursor: pointer;
  }
`;

const LinkTg = () => {
  return (
    <div>
      Подпишитесь на телеграм канал{" "}
      <a target="_blank" href="https://t.me/inserm">
        INSERM | Сервис по заказу отзывов
      </a>
    </div>
  );
};

export const LinkAndIdea = ({ role }: { role: Role }) => {
  if (role !== "CLIENT") {
    return null;
  }

  return (
    <WraperLinkAndIdea>
      <ButtonCreateIdea />
      <LinkTg />
    </WraperLinkAndIdea>
  );
};

export const LinkAndContacts = () => {
  return (
    <>
      <WrapperLink>
        <LinkTg />
      </WrapperLink>
      <WrapperContacts>
        <ContactsBlock>
          <div>Если у вас есть вопросы, пишите нам</div>
          <WrapperIcon>
            <Telegram
              onClick={() => window.open("https://t.me/helpotziv", "_blank")}
            />
            <Whatsapp
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=79913190069",
                  "_blank"
                )
              }
            />
          </WrapperIcon>
        </ContactsBlock>
      </WrapperContacts>
    </>
  );
};
