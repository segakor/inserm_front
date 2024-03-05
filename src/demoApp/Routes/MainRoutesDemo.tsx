import styled from "styled-components";
import { Layout } from "antd";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Content } from "../../common/Layout/Content";
import { Contacts } from "../Pages/Contacts";
import { Foundation } from "../Pages/Foundation";
import { Help } from "../Pages/Help";
import { ProfileDemo } from "../Pages/ProfileDemo";
import { TariffDemo } from "../Pages/TariffDemo";
import { ProjectsDemo } from "../Pages/ProjectsDemo";
import { HeaderComponentDemo } from "../components/HeaderComponentDemo";
import { CampaignDemo } from "../Pages/CampaignDemo";
import { NotificationsDemo } from "../Pages/NotificationsDemo";
import News from "../../mainApp/Pages/Client/News";

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
            <Route path="campaign/:campaignId" element={<CampaignDemo />} />
            <Route path="tariff" element={<TariffDemo />} />
            <Route path="profile" element={<ProfileDemo />} />
            <Route path="foundation" element={<Foundation />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="help" element={<Help />} />
            <Route path="notify" element={<NotificationsDemo />} />
            <Route path="news" element={<News />} />
          </Route>
        </Routes>
      </Content>
    </StyledLayout>
  );
};