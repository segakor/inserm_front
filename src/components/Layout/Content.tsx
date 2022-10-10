import React, { ReactElement } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const { Content: ContentAnt } = Layout;

const StyledContent = styled(ContentAnt)`
  background-color: #daedff;
  min-height: 100vh;
  border: 1px solid red;
  padding: 100px 30px 30px 30px;
  display: flex;
  /* position: "relative", */
`;

type Props = {
  children: ReactElement | ReactElement[];
};

export const Content = ({ children }: Props) => {

  return <StyledContent>{children}</StyledContent>;
};
