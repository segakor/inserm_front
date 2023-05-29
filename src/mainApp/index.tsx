import styled from "styled-components";
import { Layout } from "antd";
import { SiderComponent } from "./components/SiderComponent";
import { MainRoutes } from "./components/Routes/MainRoutes";
import { ErrorBoundary } from "../common/ErrorBoundary";

const StyledLayout = styled(Layout)`
  margin-left: 200px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const AppMain = () => {
  return (
    <ErrorBoundary>
      <StyledLayout>
        <SiderComponent />
        <MainRoutes />
      </StyledLayout>
    </ErrorBoundary>
  );
};

export default AppMain