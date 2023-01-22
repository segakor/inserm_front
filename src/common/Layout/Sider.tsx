import React, { ReactElement } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Sider: SiderAnt } = Layout;

const StyledSider = styled(SiderAnt)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 250px !important;
  @media (max-width: 768px) {
    display: none;
  }
`;

type Props = {
  children: ReactElement | ReactElement[];
};

export const Sider = ({ children }: Props) => {
  return (
    <StyledSider
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {children}
    </StyledSider>
  );
};
