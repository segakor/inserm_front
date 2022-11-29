import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Content } from "./Layout/Content";
import { HeaderComponent } from "./HeaderComponent";
import { Contacts } from "./Pages/Client/Contacts";
import { Login } from "./Pages/Client/Login";
import { Foundation } from "./Pages/Client/Foundation";
import { Profile } from "./Pages/Client/Profile";
import { Tariff } from "./Pages/Client/Tariff";
import { Projects } from "./Pages/Client/Projects";
import { Help } from "./Pages/Client/Help";
import { Project } from "./Pages/Client/Project";
import { useAuth } from "../hooks/useAuth";
import { role } from '../type';
import { ListOfProject } from "./Pages/Сommon/ListOfProjects";
import { ClientBase } from "./Pages/Сommon/ClientBase";

const StyledLayout = styled(Layout)`
  margin-left: 50px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

type ProtectedRouteType = {
  roleRequired?: role
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
  const { checkAuth } = useAuth();

  const { auth, role } = checkAuth()

  console.log(role, props.roleRequired)

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

  const { checkAuth } = useAuth();
  const { auth } = checkAuth()

  return auth ? <Navigate to="/dashboard" /> : <Outlet />
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
            <Route path="help" element={<Help />} />
          </Route>
          <Route path="/host" element={<ProtectedRoutes roleRequired="HOST" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="clientbase" element={<ClientBase />} />
          </Route>
          <Route path="/supervisor" element={<ProtectedRoutes roleRequired="SUPERVISOR" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="projectcheck" element={<>projectcheck</>} />
            <Route path="reviewsforpayment" element={<>reviewsforpayment</>} />
            <Route path="paidreviews" element={<>paidreviews</>} />
            <Route path="clientbase" element={<ClientBase />} />
            <Route path="clientquestions" element={<>clientquestions</>} />
          </Route>
          <Route path="/support" element={<ProtectedRoutes roleRequired="SUPPORT" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="clientbase" element={<ClientBase />} />
            <Route path="settingtariff" element={<>settingtariff</>} />
            <Route path="clientquestions" element={<>clientquestions</>} />
          </Route>
          <Route path="/admin" element={<ProtectedRoutes roleRequired="ADMIN" />}>
            <Route path="projects" element={<ListOfProject />} />
            <Route path="projectcheck" element={<>projectcheck</>} />
            <Route path="reviewsforpayment" element={<>reviewsforpayment</>} />
            <Route path="paidreviews" element={<>paidreviews</>} />
            <Route path="clientbase" element={<ClientBase />} />
            <Route path="clienttariff" element={<>clienttariff</>} />
            <Route path="foundation" element={<Foundation />} />
            <Route path="settingtariff" element={<>settingtariff</>} />
            <Route path="createadmin" element={<>createadmin</>} />
            <Route path="clientquestions" element={<>clientquestions</>} />
          </Route>
          {/** Public Routes */}
          <Route path="/dashboard" element={<>dashboard</>} />
          <Route path="login" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/denied" element={<>Denied</>} />
          <Route path='*' element={<>Not Found</>} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};
