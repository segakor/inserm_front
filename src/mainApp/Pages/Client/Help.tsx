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
        Задайте свой вопрос и мы ответим на него в течение 40 минут в рабочие
        время (Пн-Пт 9:00-18:00 по Мск)
      </StyledTitle>
      <ChatClient />
    </Page>
  );
};

export default Help;
