import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Sider } from "./Layout/Sider";
import { MenuComponent } from "./Menu";

const LogoIcon = styled(Logo)`
  margin:30px 0px 60px 30px;
`;

export const SiderComponent = () => {


  return (
    <Sider>
      <LogoIcon />
      <MenuComponent />
    </Sider>
  );
}