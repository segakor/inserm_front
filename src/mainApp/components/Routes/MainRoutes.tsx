import { ReactNode, Suspense, lazy } from "react";
import styled from "styled-components";
import { Layout, Spin } from "antd";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { Content } from "../../../common/Layout/Content";
import { HeaderComponent } from "../HeaderComponent";
import { tokenService } from "../../../utils/tokenService";
import { adminRoleList } from "../../../constants";

const StyledLayout = styled(Layout)`
  margin-left: 50px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const PublicRoutes = () => {
  const auth = tokenService.getIsAuth();
  const isAdminRole = tokenService.getIsAdmin();

  const bodyPath = isAdminRole ? "admin" : "client";

  const params = useParams();
  const { search } = useLocation();

  if (params["*"] === "payment" && bodyPath === "client") {
    return auth ? (
      <Navigate to={"/app/client/createproject" + search} />
    ) : (
      <Outlet />
    );
  }

  const page = `/app/${bodyPath}/projects`;

  return auth ? <Navigate to={page} /> : <Outlet />;
};

const ProtectedRoutes = ({ allowedRole }: { allowedRole: string[] }) => {
  const auth = tokenService.getIsAuth();
  const role = tokenService.getRole();

  return auth ? (
    allowedRole.includes(role || "") ? (
      <Outlet />
    ) : (
      <Navigate replace to="/app/denied" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

const ProtectedChildRoutes = ({
  allowedRole,
  children,
}: {
  allowedRole: string[];
  children: ReactNode | JSX.Element;
}) => {
  const role = tokenService.getRole();

  return allowedRole.includes(role || "") ? (
    <>{children}</>
  ) : (
    <Navigate to="/app/denied" />
  );
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
  const Referral = lazy(() => import("../../Pages/Client/Referral"));
  const ClientNews = lazy(() => import("../../Pages/Client/News"));
  const UpdateProject = lazy(() => import("../../Pages/Client/UpdateProject"));
  const Notifications = lazy(() => import("../../Pages/Client/Notifications"));

  //admin lazy
  const AllProjects = lazy(() => import("../../Pages/Admin/AllProjects"));
  const ClientBase = lazy(() => import("../../Pages/Admin/ClientBase"));
  const ProjectModerate = lazy(
    () => import("../../Pages/Admin/ProjectModerate")
  );
  const ProjectDetails = lazy(() => import("../../Pages/Admin/ProjectDetails"));
  const CampaignDetails = lazy(
    () => import("../../Pages/Admin/CampaignDetails")
  );
  const ProjectForPayment = lazy(
    () => import("../../Pages/Admin/ProjectForPayment")
  );
  const ProjectPaid = lazy(() => import("../../Pages/Admin/ProjectPaid"));
  const ClientQuestions = lazy(
    () => import("../../Pages/Admin/ClientQuestions")
  );
  const Statistics = lazy(() => import("../../Pages/Admin/Statistics"));
  const CreateAdmin = lazy(() => import("../../Pages/Admin/CreateAdmin"));
  const Promo = lazy(() => import("../../Pages/Admin/Promo"));
  const News = lazy(() => import("../../Pages/Admin/News"));
  const Mail = lazy(() => import("../../Pages/Admin/Mail"));

  //common lazy
  const Payment = lazy(() => import("../../Pages/Сommon/Payment"));
  const Login = lazy(() => import("../../Pages/Сommon/Login"));

  return (
    <StyledLayout>
      <HeaderComponent />
      <Content>
        <Routes>
          {/** CLIENT ROUTE */}
          <Route
            path="/client"
            element={<ProtectedRoutes allowedRole={["CLIENT"]} />}
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
            <Route
              path="updateproject/:id"
              element={
                <Suspense fallback={<Spin />}>
                  <UpdateProject />
                </Suspense>
              }
            />
            <Route
              path="notify"
              element={
                <Suspense fallback={<Spin />}>
                  <Notifications />
                </Suspense>
              }
            />
            <Route
              path="referral"
              element={
                <Suspense fallback={<Spin />}>
                  <Referral />
                </Suspense>
              }
            />
            <Route
              path="news"
              element={
                <Suspense fallback={<Spin />}>
                  <ClientNews />
                </Suspense>
              }
            />
          </Route>
          {/** ADMIN ROUTE */}
          <Route
            path="/admin"
            element={<ProtectedRoutes allowedRole={adminRoleList} />}
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
                  <ProtectedChildRoutes allowedRole={["ADMIN", "SUPERVISOR"]}>
                    <ProjectModerate />
                  </ProtectedChildRoutes>
                </Suspense>
              }
            />
            <Route
              path="projectforpayment"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes allowedRole={["ADMIN", "SUPERVISOR"]}>
                    <ProjectForPayment />
                  </ProtectedChildRoutes>
                </Suspense>
              }
            />
            <Route
              path="projectpaid"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes allowedRole={["ADMIN", "SUPERVISOR"]}>
                    <ProjectPaid />
                  </ProtectedChildRoutes>
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
              path="createadmin"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes allowedRole={["ADMIN"]}>
                    <CreateAdmin />
                  </ProtectedChildRoutes>
                </Suspense>
              }
            />
            <Route
              path="clientquestions"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes
                    allowedRole={["ADMIN", "SUPPORT", "SUPERVISOR"]}
                  >
                    <ClientQuestions />
                  </ProtectedChildRoutes>
                </Suspense>
              }
            />
            <Route
              path="statistics"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes allowedRole={["ADMIN", "SUPERVISOR"]}>
                    <Statistics />
                  </ProtectedChildRoutes>
                </Suspense>
              }
            />
            <Route
              path="promo"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes allowedRole={["ADMIN", "SUPERVISOR"]}>
                    <Promo />
                  </ProtectedChildRoutes>
                </Suspense>
              }
            />
            <Route
              path="news"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes allowedRole={["ADMIN"]}>
                    <News />
                  </ProtectedChildRoutes>
                </Suspense>
              }
            />
            <Route
              path="mail"
              element={
                <Suspense fallback={<Spin />}>
                  <ProtectedChildRoutes allowedRole={["ADMIN"]}>
                    <Mail />
                  </ProtectedChildRoutes>
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
          <Route path="payment" element={<PublicRoutes />}>
            <Route
              path="/payment"
              element={
                <Suspense fallback={<Spin />}>
                  <Payment />
                </Suspense>
              }
            />
          </Route>
          {
            <Route
              path="/denied"
              element={
                <>
                  🔒 Access Denied. You Do Not Have The Permission To Access
                  This Page On This Server 🔒
                </>
              }
            />
          }
          <Route path="*" element={<Navigate replace to="login" />} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};
