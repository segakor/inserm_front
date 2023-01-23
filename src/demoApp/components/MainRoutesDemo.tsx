import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Content } from "../../common/Layout/Content";
import { Contacts } from "../../mainApp/Pages/Client/Contacts";
import { Foundation } from "../../mainApp/Pages/Client/Foundation";
import { Help } from "../../mainApp/Pages/Client/Help";
import { ProfileDemo } from "../Pages/ProfileDemo";
import { TariffDemo } from "../Pages/TariffDemo";
import { ProjectDemo } from "../Pages/ProjectDemo";
import { ProjectsDemo } from "../Pages/ProjectsDemo";
import { HeaderComponentDemo } from "./HeaderComponentDemo";

const StyledLayout = styled(Layout)`
  margin-left: 50px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin: 0;
  }
`;
const PublicRoutes = () => {
  return <Outlet />;
};

export const MainRoutesDemo = () => {
  return (
    <StyledLayout>
      <HeaderComponentDemo />
      <Content>
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="*" element={<Navigate replace to="projects" />} />
            <Route path="projects" element={<ProjectsDemo />} />
            <Route path="project/:projectId" element={<ProjectDemo />} />
            <Route path="tariff" element={<TariffDemo />} />
            <Route path="profile" element={<ProfileDemo />} />
            <Route path="foundation" element={<Foundation />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Routes>
      </Content>
    </StyledLayout>
  );
};
