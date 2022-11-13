import React, { ReactElement } from "react";
import { Layout as LayoutAnt } from "antd";
import { useLocalState } from "../../context/hooks";
import styled from "styled-components";


const StyledLayout = styled(LayoutAnt)`
margin-left: 125px;
 @media (max-width: 768px) {
    margin-left: 0;
  }
`

type Props = {
  children: ReactElement | ReactElement[];
};

export const Layout = ({ children }: Props) => {

  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  );
};
