import React, { ReactElement } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Content: ContentAnt } = Layout;

const StyledContent = styled(ContentAnt)`
  background-color: #daedff;
  min-height: 100vh;
  border: 1px solid red;
  padding: 90px 30px 30px 30px;
  display: flex;
/*   @media (min-width: 768px) {
    padding: 20px 30px 30px 30px;
  } */
`;

type Props = {
  children: ReactElement | ReactElement[];
};

export const Content = ({ children }: Props) => {

  return <StyledContent>{children}</StyledContent>;
};
