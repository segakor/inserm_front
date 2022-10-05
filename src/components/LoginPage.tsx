import React from "react";
import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { ReactComponent as Logo } from "../assets/logo.svg";
import useBreakpoint from "use-breakpoint";
import { useDispatch } from "../context/hooks";
import { setIsMobile } from "../context/action";

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Sider = styled.div`
  width: 20%;
  padding: 20px 136px 20px 20px;
`;
const Content = styled.div<{ isMobile: boolean }>`
  flex: 1;
  background-color: #daedff;
  flex-direction: column;
  display: flex;
  min-height: 100vh;
  padding: ${(props) =>
    props.isMobile ? "50px 20px 0px 20px" : "50px 0px 0px 30px"};
`;

export const LoginPage = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");
  const isMobile = breakpoint === "mobile";
  const dispatch = useDispatch();
  dispatch(setIsMobile(isMobile));

  return (
    <Container>
      <Sider>
        <Logo />
      </Sider>
      <Content isMobile={isMobile}>
        <LoginForm />
      </Content>
    </Container>
  );
};
