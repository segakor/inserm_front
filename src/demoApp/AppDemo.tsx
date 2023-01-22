import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { SiderComponentDemo } from "./components/SiderComponentDemo";
import { MainRoutesDemo } from "./components/MainRoutesDemo";

const StyledLayout = styled(Layout)`
  margin-left: 200px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const AppDemo = () => {
  return (
    <StyledLayout>
      <SiderComponentDemo />
      <MainRoutesDemo />
    </StyledLayout>
  );
};
