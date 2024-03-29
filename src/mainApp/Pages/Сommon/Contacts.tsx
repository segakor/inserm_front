import styled from "styled-components";
import { ReactComponent as Telegram } from "../../../assets/telegram.svg";
import { ReactComponent as Whatsapp } from "../../../assets/whatsapp.svg";
import { Title, Header } from "../../../common/Typography";
import { contacts } from "../../../constants";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContactsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 463px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
    height: 226px;
    width: 178px;
  }
`;
const ContactsCard = styled.div<{ withoutCursor?: boolean }>`
  width: auto;
  height: 62px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 20px;
  cursor: ${(props) => (props.withoutCursor ? "" : "pointer")};
  ${(props) => {
    if (!props.withoutCursor)
      return `
        :hover {
    background-color: whitesmoke;
  }
        `;
  }}
`;
const TelegramIcon = styled(Telegram)`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;
const WhatsappIcon = styled(Whatsapp)`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const Contacts = () => {
  return (
    <Page>
      <Header>Контакты</Header>
      <Title level={5} style={{ fontWeight: "400" }}>
        Вы можете связаться с нами несколькими способами:
      </Title>
      <ContactsWrapper>
        <ContactsCard
          onClick={() => window.open(contacts.tg, "_blank")}
        >
          <Title level={5} style={{ fontWeight: "400", color: "#40B3E0" }}>
            Telegram
          </Title>
          <TelegramIcon />
        </ContactsCard>
        <ContactsCard onClick={() => window.open(contacts.whatsup, "_blank")}>
          <Title level={5} style={{ fontWeight: "400", color: "#2CB742" }}>
            Whatsapp
          </Title>
          <WhatsappIcon />
        </ContactsCard>
        <ContactsCard>
          <Title level={5} style={{ fontWeight: "700" }}>
            <a href="mailto:info@inserm.ru">info@inserm.ru</a>
          </Title>
        </ContactsCard>
      </ContactsWrapper>
    </Page>
  );
};

export default Contacts;
