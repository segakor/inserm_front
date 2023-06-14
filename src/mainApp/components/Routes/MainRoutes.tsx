import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import { Layout, Spin } from "antd";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Content } from "../../../common/Layout/Content";
import { HeaderComponent } from "../HeaderComponent";
import { Role } from "../../../types";
import { tokenService } from "../../../utils/tokenService";
import CampaignDetails from "../../Pages/Сommon/CampaignDetails";

const StyledLayout = styled(Layout)`
  margin-left: 50px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

type ProtectedRouteType = {
  roleRequired?: Role;
};

const ProtectedRoutes = (props: ProtectedRouteType) => {
  const auth = tokenService.getIsAuth();
  const role = tokenService.getRole();

  if (props.roleRequired) {
    return auth ? (
      props.roleRequired === role ? (
        <Outlet />
      ) : (
        <Navigate to="/denied" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }
};

const PublicRoutes = () => {
  const auth = tokenService.getIsAuth();
  const role = tokenService.getRole();

  const page = `/app/${role?.toLowerCase()}/projects`;

  return auth ? <Navigate to={page} /> : <Outlet />;
};

export const MainRoutes = () => {
  //client lazy
  const Projects = lazy(() => import("../../Pages/Client/Projects"));
  const Project = lazy(() => import("../../Pages/Client/Project"));
  const Campaign = lazy(() => import("../../Pages/Client/Campaign"));
  const Tariff = lazy(() => import("../../Pages/Client/Tariff"));
  const Profile = lazy(() => import("../../Pages/Client/Profile"));
  const Foundation = lazy(() => import("../../Pages/Client/Foundation"));
  const Contacts = lazy(() => import("../../Pages/Client/Contacts"));
  const Help = lazy(() => import("../../Pages/Client/Help"));
  const CreateProject = lazy(() => import("../../Pages/Client/CreateProject"));

  //common lazy
  const AllProjects = lazy(() => import("../../Pages/Сommon/AllProjects"));
  const ClientBase = lazy(() => import("../../Pages/Сommon/ClientBase"));
  const ProjectModerate = lazy(
    () => import("../../Pages/Сommon/ProjectModerate")
  );
  const ProjectDetails = lazy(
    () => import("../../Pages/Сommon/ProjectDetails")
  );
  const ProjectForPayment = lazy(
    () => import("../../Pages/Сommon/ProjectForPayment")
  );
  const ProjectPaid = lazy(() => import("../../Pages/Сommon/ProjectPaid"));
  const TariffSetting = lazy(() => import("../../Pages/Сommon/TariffSetting"));
  const Login = lazy(() => import("../../Pages/Сommon/Login"));
  const ClientQuestions = lazy(
    () => import("../../Pages/Сommon/ClientQuestions")
  );

  //admin lazy
  const TariffClient = lazy(() => import("../../Pages/Admin/TariffClient"));
  const CreateAdmin = lazy(() => import("../../Pages/Admin/CreateAdmin"));
  const HostStatistics = lazy(() => import("../../Pages/Admin/HostStatistics"));
  const FoundationClient = lazy(
    () => import("../../Pages/Admin/FoundationClient")
  );

  return (
    <StyledLayout>
      <HeaderComponent />
      <Content>
        <Routes>
          <Route
            path="/client"
            element={<ProtectedRoutes roleRequired="CLIENT" />}
          >
            <Route path="*" element={<Navigate replace to="projects" />} />
            <Route
              path="projects"
              element={
                <Suspense fallback={<Spin />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="project/:projectId"
              element={
                <Suspense fallback={<Spin />}>
                  <Project />
                </Suspense>
              }
            />
            <Route
              path="campaign/:campaignId"
              element={
                <Suspense fallback={<Spin />}>
                  <Campaign />
                </Suspense>
              }
            />
            <Route
              path="tariff"
              element={
                <Suspense fallback={<Spin />}>
                  <Tariff />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<Spin />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="foundation"
              element={
                <Suspense fallback={<Spin />}>
                  <Foundation />
                </Suspense>
              }
            />
            <Route
              path="contacts"
              element={
                <Suspense fallback={<Spin />}>
                  <Contacts />
                </Suspense>
              }
            />
            <Route
              path="help"
              element={
                <Suspense fallback={<Spin />}>
                  <Help />
                </Suspense>
              }
            />
            <Route
              path="createproject"
              element={
                <Suspense fallback={<Spin />}>
                  <CreateProject />
                </Suspense>
              }
            />
          </Route>
          <Route path="/host" element={<ProtectedRoutes roleRequired="HOST" />}>
            <Route
              path="projects"
              element={
                <Suspense fallback={<Spin />}>
                  <AllProjects />
                </Suspense>
              }
            />
            <Route
              path="clientbase"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientBase />
                </Suspense>
              }
            />
            <Route
              path="project/:projectId"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectDetails />
                </Suspense>
              }
            />
            <Route
              path="campaign/:campaignId"
              element={
                <Suspense fallback={<Spin />}>
                  <CampaignDetails />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/supervisor"
            element={<ProtectedRoutes roleRequired="SUPERVISOR" />}
          >
            <Route
              path="projects"
              element={
                <Suspense fallback={<Spin />}>
                  <AllProjects />
                </Suspense>
              }
            />
            <Route
              path="project/:projectId"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectDetails />
                </Suspense>
              }
            />
            <Route
              path="campaign/:campaignId"
              element={
                <Suspense fallback={<Spin />}>
                  <CampaignDetails />
                </Suspense>
              }
            />
            <Route
              path="projectmoderate"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectModerate />
                </Suspense>
              }
            />
            <Route
              path="projectforpayment"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectForPayment />
                </Suspense>
              }
            />
            <Route
              path="projectpaid"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectPaid />
                </Suspense>
              }
            />
            <Route
              path="clientbase"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientBase />
                </Suspense>
              }
            />
            <Route
              path="clientquestions"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientQuestions />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/support"
            element={<ProtectedRoutes roleRequired="SUPPORT" />}
          >
            <Route
              path="projects"
              element={
                <Suspense fallback={<Spin />}>
                  <AllProjects />
                </Suspense>
              }
            />
            <Route
              path="project/:projectId"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectDetails />
                </Suspense>
              }
            />
            <Route
              path="campaign/:campaignId"
              element={
                <Suspense fallback={<Spin />}>
                  <CampaignDetails />
                </Suspense>
              }
            />
            <Route
              path="clientbase"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientBase />
                </Suspense>
              }
            />
            <Route
              path="settingtariff"
              element={
                <Suspense fallback={<Spin />}>
                  <TariffSetting />
                </Suspense>
              }
            />
            <Route
              path="clientquestions"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientQuestions />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/admin"
            element={<ProtectedRoutes roleRequired="ADMIN" />}
          >
            <Route
              path="projects"
              element={
                <Suspense fallback={<Spin />}>
                  <AllProjects />
                </Suspense>
              }
            />
            <Route
              path="project/:projectId"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectDetails />
                </Suspense>
              }
            />
            <Route
              path="campaign/:campaignId"
              element={
                <Suspense fallback={<Spin />}>
                  <CampaignDetails />
                </Suspense>
              }
            />
            <Route
              path="projectmoderate"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectModerate />
                </Suspense>
              }
            />
            <Route
              path="projectforpayment"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectForPayment />
                </Suspense>
              }
            />
            <Route
              path="projectpaid"
              element={
                <Suspense fallback={<Spin />}>
                  <ProjectPaid />
                </Suspense>
              }
            />
            <Route
              path="clientbase"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientBase />
                </Suspense>
              }
            />
            <Route
              path="clienttariff"
              element={
                <Suspense fallback={<Spin />}>
                  <TariffClient />
                </Suspense>
              }
            />
            <Route
              path="foundation"
              element={
                <Suspense fallback={<Spin />}>
                  <FoundationClient />
                </Suspense>
              }
            />
            <Route
              path="settingtariff"
              element={
                <Suspense fallback={<Spin />}>
                  <TariffSetting />
                </Suspense>
              }
            />
            <Route
              path="createadmin"
              element={
                <Suspense fallback={<Spin />}>
                  <CreateAdmin />
                </Suspense>
              }
            />
            <Route
              path="clientquestions"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientQuestions />
                </Suspense>
              }
            />
            <Route
              path="hoststatistics"
              element={
                <Suspense fallback={<Spin />}>
                  <HostStatistics />
                </Suspense>
              }
            />
          </Route>
          {/** Public Routes */}
          <Route path="login" element={<PublicRoutes />}>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Spin />}>
                  <Login />
                </Suspense>
              }
            />
          </Route>
          <Route path="/denied" element={<>Denied</>} />
          <Route path="*" element={<Navigate replace to="login" />} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};
