import styled from "styled-components";
import { ChatComponent } from "./ChatComponent";
import { Title } from "../../common/Typography";
import { Grid, Avatar } from "antd";

const { useBreakpoint } = Grid;

const Wrapper = styled.div`
  background-color: white;
  width: 700px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const Header = styled.div`
  height: 65px;
  background: #1579e9;
  border-radius: 10px 10px 0px 0px;
  & h5,
  div {
    color: white !important;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 250px);
  overflow: hidden;
`;
const AvatarWrapper = styled.div`
  display: flex;
  grid-gap: 8px;
  align-items: center;
`;

export const ChatClient = () => {

  const roomId = 1

  const screens = useBreakpoint();
  const isMobile = !!screens.xs;

  return (
    <Wrapper>
      <Header>
        <Title level={5}>Техподдержка</Title>
        <AvatarWrapper>
          <Avatar src="https://i.ibb.co/KwhgkxV/image.png" size="large" />
          <Title level={5}>Дарья</Title>
        </AvatarWrapper>
      </Header>
      <Body>
        <ChatComponent
          roomId={roomId}
          chatType={"client"}
          isMobile={isMobile}
        />
      </Body>
    </Wrapper>
  );
};
