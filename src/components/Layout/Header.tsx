import React, { ReactElement } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Header: HeaderAnt } = Layout;

const StyledHeader = styled(HeaderAnt)`
  /* border: 1px solid green; */
  position: fixed;
  width: 100vw;
  height: 60px;
  background: white;
  z-index: 2;
  padding:20px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  } 
`;

type Props = {
  children: ReactElement | ReactElement[];
};

export const Header = ({ children }: Props) => {

  return (
    <StyledHeader theme="light">
      {children}
    </StyledHeader>
  );
};
