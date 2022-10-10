import React, { ReactElement } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { useLocalState } from "../../context/hooks";
import styled from "styled-components";

const { Header: HeaderAnt } = Layout;

const StyledHeader = styled(HeaderAnt)`
  border: 1px solid green;
  position: fixed;
  width: 100vw;
  background: white;
  z-index: 2;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 1025px) {
    display: flex;
  }
`;

type Props = {
  children: ReactElement | ReactElement[];
};

export const Header = ({ children }: Props) => {
  /* const { isMobile } = useLocalState();

  if (isMobile) return null */

  return (
    <StyledHeader>
      {children}
    </StyledHeader>
  );
};
