import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { SiderComponent } from "./components/SiderComponent";
import { MainRoutes } from "./components/MainRoutes";

const StyledLayout = styled(Layout)`
  margin-left: 200px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const AppMain = () => {
  return (
    <StyledLayout>
      <SiderComponent />
      <MainRoutes />
    </StyledLayout>
  );
};
