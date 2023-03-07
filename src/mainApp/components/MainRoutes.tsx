import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Content } from "../../common/Layout/Content";
import { HeaderComponent } from "./HeaderComponent";
import { Contacts } from "../Pages/Client/Contacts";
import { Login } from "../Pages/Client/Login";
import { Foundation } from "../Pages/Client/Foundation";
import { Profile } from "../Pages/Client/Profile";
import { Tariff } from "../Pages/Client/Tariff";
import { Projects } from "../Pages/Client/Projects";
import { Help } from "../Pages/Client/Help";
import { Project } from "../Pages/Client/Project";
import { ListOfProject } from "../Pages/Сommon/ListOfProjects";
import { ClientBase } from "../Pages/Сommon/ClientBase";
import { ProjectAllStatusses } from "../Pages/Сommon/ProjectAllStatusses";
import { ProjectModerate } from "../Pages/Сommon/ProjectModerate";
import { ProjectForPayment } from "../Pages/Сommon/ProjectForPayment";
import { ProjectPaid } from "../Pages/Сommon/ProjectPaid";
import { ClientQuestions } from "../Pages/Сommon/ClientQuestions";
import { CreateProject } from "../Pages/Client/CreateProject";
import { CreateAdmin } from "../Pages/Admin/CreateNewAdmin";
import { TariffSetting } from "../Pages/Сommon/TariffSetting";
import { TariffClient } from "../Pages/Admin/TariffClient";
import { FoundationClient } from "../Pages/Admin/FoundationClient";
import { Role } from "../../type";
import { tokenService } from "../../utils/tokenService";

const StyledLayout = styled(Layout)`
  margin-left: 50px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

type ProtectedRouteType = {
  roleRequired?: Role
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
  const auth = tokenService.getIsAuth()
  const role = tokenService.getRole()

  if (props.roleRequired) {
    return auth ? (
      props.roleRequired === role ? (
        <Outlet />
      ) : (
        <Navigate to="/denied" />
      )
    ) : (
      <Navigate to="/login" />
    )
  } else {
    return auth ? <Outlet /> : <Navigate to="/login" />
  }
}

const PublicRoutes = () => {

  const auth = tokenService.getIsAuth()
  const role = tokenService.getRole()

  const page = `/app/${role?.toLowerCase()}/projects`

  return auth ? <Navigate to={page} /> : <Outlet />
}

export const MainRoutes = () => {
  return (
    <StyledLayout>
      <HeaderComponent />
      <Content>
        <Routes>
          <Route path="/client" element={<ProtectedRoutes roleRequired="CLIENT" />}>
            <Route path="*" element={<Navigate replace to="projects" />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project/:projectId" element={<Project />} />
            <Route path="tariff" element={<Tariff />} />
            <Route path="profile" element={<Profile />} />
            <Route path="foundation" element={<Foundation />} />
            <Route path="contacts" element={<Contacts />} />
            {/* <Route path="help" element={<WebSock />} /> */}
            <Route path="help" element={<Help />} />
            <Route path="createproject" element={<CreateProject />} />
          </Route>
          <Route path="/host" element={<ProtectedRoutes roleRequired="HOST" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="clientbase" element={<ClientBase />} />
            <Route path="project/:projectId" element={<ProjectAllStatusses />} />
          </Route>
          <Route path="/supervisor" element={<ProtectedRoutes roleRequired="SUPERVISOR" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="project/:projectId" element={<ProjectAllStatusses />} />
            <Route path="projectmoderate" element={<ProjectModerate />} />
            <Route path="projectforpayment" element={<ProjectForPayment />} />
            <Route path="projectpaid" element={<ProjectPaid />} />
            <Route path="clientbase" element={<ClientBase />} />
            <Route path="clientquestions" element={<ClientQuestions />} />
          </Route>
          <Route path="/support" element={<ProtectedRoutes roleRequired="SUPPORT" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="project/:projectId" element={<ProjectAllStatusses />} />
            <Route path="clientbase" element={<ClientBase />} />
            <Route path="settingtariff" element={<TariffSetting />} />
            <Route path="clientquestions" element={<ClientQuestions />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoutes roleRequired="ADMIN" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="project/:projectId" element={<ProjectAllStatusses />} />
            <Route path="projectmoderate" element={<ProjectModerate />} />
            <Route path="projectforpayment" element={<ProjectForPayment />} />
            <Route path="projectpaid" element={<ProjectPaid />} />
            <Route path="clientbase" element={<ClientBase />} />
            <Route path="clienttariff" element={<TariffClient />} />
            <Route path="foundation" element={<FoundationClient />} />
            <Route path="settingtariff" element={<TariffSetting />} />
            <Route path="createadmin" element={<CreateAdmin />} />
            <Route path="clientquestions" element={<ClientQuestions />} />
          </Route>
          {/** Public Routes */}
          <Route path="login" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/denied" element={<>Denied</>} />
          <Route path='*' element={<Navigate replace to="login" />} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};
