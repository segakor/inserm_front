import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { ChatClient } from "../../Chat";
import { Tooltip, Space } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

import { Grid } from "antd";

const { useBreakpoint } = Grid;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
`;

const Help = () => {
  const screens = useBreakpoint();
  const isMobile = !!screens.xs;

  return (
    <Page>
      {!isMobile && (
        <Header>
          Техподдержка{" "}
          <Tooltip
            title={
              "Задайте свой вопрос и мы ответим в течение 40 минут в рабочие часы (пн-пт 9-18)"
            }
          >
            <Space>
              <QuestionCircleFilled
                style={{ color: "#1579E9", cursor: "pointer" }}
              />
            </Space>
          </Tooltip>
        </Header>
      )}
      <ChatClient />
    </Page>
  );
};

export default Help;
