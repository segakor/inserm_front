import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { ChatSupport } from "../../Chat";

import { Grid } from "antd";

const { useBreakpoint } = Grid;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
`;

const ClientQuestions = () => {
  const screens = useBreakpoint();
  const isMobile = !!screens.xs;

  return (
    <Page>
      {!isMobile && <Header>Вопросы клиентов</Header>}
      <ChatSupport />
    </Page>
  );
};

export default ClientQuestions;
