import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";
import { ChatClient } from "../../Chat";

import { Grid } from "antd";

const { useBreakpoint } = Grid;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
`;
const StyledTitle = styled(Title)`
  margin-bottom: 20px !important;
`;

const Help = () => {
  const screens = useBreakpoint();
  const isMobile = !!screens.xs;

  return (
    <Page>
      {!isMobile && <Header>Техподдержка</Header>}
      <StyledTitle level={5} style={{ fontWeight: "400" }}>
        Задайте свой вопрос и мы ответим в течение 40 минут в рабочие часы
        (пн-пт 9-18)
      </StyledTitle>
      <ChatClient />
    </Page>
  );
};

export default Help;
