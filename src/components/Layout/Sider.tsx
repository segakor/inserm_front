import React, { ReactElement } from "react";
import { Layout } from "antd";
import { useLocalState } from "../../context/hooks";
import styled from "styled-components";

const { Sider: SiderAnt } = Layout;

const StyledSider = styled(SiderAnt)`
  /* padding: 30px 0 0 30px; */
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  border: 1px solid blue;
  min-width: 250px !important;
  @media (max-width: 768px) {
    display: none;
  }
`;

type Props = {
  children: ReactElement | ReactElement[];
};

export const Sider = ({ children }: Props) => {
  /* const { isMobile } = useLocalState();

  if (isMobile) return null */

  return <StyledSider theme="light">{children}</StyledSider>;
};
