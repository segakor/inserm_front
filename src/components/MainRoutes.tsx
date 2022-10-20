import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Content } from "./Layout/Content";
import { HeaderComponent } from "./HeaderComponent";
import { Contacts } from "./Pages/Contacts";
import { Login } from "./Pages/Login";
import { Foundation } from "./Pages/Foundation";
import { Profile } from "./Pages/Profile";
import { Tariff } from "./Pages/Tariff";
import { Projects } from "./Pages/Projects";
import { Help } from "./Pages/Help";
import { Project } from "./Pages/Project";

const StyledLayout = styled(Layout)`
  margin-left: 50px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const MainRoutes = () => {
  return (
    <StyledLayout>
      <HeaderComponent />
      <Content>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/tariff" element={<Tariff />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/foundation" element={<Foundation />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};
