import React from "react";
import styled from "styled-components";
import { Provider } from "./context/Provider";
import { Page } from "./components/Page"
import { SiderComponent } from './components/SiderComponent'
import { MainRoutes } from './components/MainRoutes';
import { Layout } from "antd";

const StyledLayout = styled(Layout)`
margin-left: 200px;
@media (max-width: 768px) {
    margin-left: 0;
  }
`;

const App: React.FC = () => {

  return (
    <>
      {/* <Page /> */}
      <StyledLayout>
        <SiderComponent />
        <MainRoutes />
      </StyledLayout>

    </>
  );
};

export default App;
