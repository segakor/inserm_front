import React from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { LoginForm } from "./LoginForm";
import { Sider } from "./Layout/Sider";
/* import { Layout } from "./Layout/Layout"; */
import { Content } from "./Layout/Content";
import { Header } from "./Layout/Header";

import { Layout, Menu } from 'antd';

const Box = styled(Layout)`
margin-left: 200px;
@media (max-width: 768px) {
    margin-left: 0;
  }
`
const Box2 = styled(Layout)`
margin-left: 50px;
@media (max-width: 768px) {
    margin-left: 0;
  }
`

export const Page = () => {

  return (
    <>
      <Box >
        <Sider>
          <Logo />
        </Sider>
        <Box2>
          <Header>
            <p>123</p>
          </Header>
          <Content>
            <LoginForm />
          </Content>
        </Box2>
      </Box>
    </>
  );
};
