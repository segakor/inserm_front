import React, { useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as MoreIcon } from "../assets/moreBtn.svg";
import { LoginForm } from "./LoginForm";
import { Sider } from "./Layout/Sider";
import { Content } from "./Layout/Content";
import { Header } from "./Layout/Header";

import { Layout, Drawer } from 'antd';
import { MenuComponent } from "./Menu";

const Box = styled(Layout)`
margin-left: 200px;
@media (max-width: 768px) {
    margin-left: 0;
  }
`;
const Box2 = styled(Layout)`
margin-left: 50px;
@media (max-width: 768px) {
    margin-left: 0;
  }
`;
const LogoIcon = styled(Logo)`
  margin:30px 0px 60px 30px;
`

export const Page = () => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const drawerSize = document.documentElement.scrollWidth

  return (
    <>
      <Box >
        <Sider>
          <LogoIcon />
          <MenuComponent />
        </Sider>
        <Box2>
          <Header>
            <Logo />
            <MoreIcon onClick={showDrawer} style={{ cursor: "pointer" }} />
          </Header>
          <Content>
            <LoginForm />
          </Content>
        </Box2>
      </Box>
      <Drawer placement="right" onClose={onClose} open={open} width={drawerSize}>
        <MenuComponent />
      </Drawer>
    </>
  );
};
