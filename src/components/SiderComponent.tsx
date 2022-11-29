import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Sider } from "./Layout/Sider";
import { MenuComponent } from "./Menu";
import { useLocation } from "react-router-dom";

const LogoIcon = styled(Logo)`
  margin: 30px 0px 50px 30px;
`;

export const SiderComponent = () => {
  const location = useLocation();

  return (
    <Sider>
      <LogoIcon />
      {location.pathname !== "/login" ? <MenuComponent /> : <></>}
    </Sider>
  );
};
