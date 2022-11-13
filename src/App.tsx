import React from "react";
import styled from "styled-components";
import { Provider } from "./context/Provider";
/* import { Page } from "./components/Page" */
import { SiderComponent } from './components/SiderComponent'
import { MainRoutes } from './components/MainRoutes';
import { Layout } from "antd";
import "antd/dist/antd.css";

const StyledLayout = styled(Layout)`
margin-left: 200px;
@media (max-width: 768px) {
    margin-left: 0;
  }
`;

const App: React.FC = () => {

  console.log('app')

  return (
    <>
      <Provider>
        <StyledLayout>
          <SiderComponent />
          <MainRoutes />
        </StyledLayout>
        {/* <Page /> */}
      </Provider>
    </>
  );
};

export default App;

