import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { ChatSupport } from "../../Chat";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
`;

const ClientQuestions = () => {
  return (
    <Page>
      <Header>Вопросы клиентов</Header>
      <ChatSupport />
    </Page>
  );
};

export default ClientQuestions;
