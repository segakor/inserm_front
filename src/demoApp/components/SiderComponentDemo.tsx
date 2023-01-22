import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Sider } from "../../common/Layout/Sider";
import { MenuComponentDemo } from "./MenuDemo";

const LogoIcon = styled(Logo)`
  margin: 30px 0px 50px 30px;
`;

export const SiderComponentDemo = () => {

  return (
    <Sider>
      <LogoIcon />
      <MenuComponentDemo />
    </Sider>
  );
};
