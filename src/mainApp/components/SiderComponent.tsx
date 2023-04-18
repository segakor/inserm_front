import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Sider } from "../../common/Layout/Sider";
import { MenuComponent } from "./Menu";
import { tokenService } from "../../utils";
import { useLocalState } from "../context/hooks";

const LogoIcon = styled(Logo)`
  margin: 30px 0px 50px 30px;
`;

export const SiderComponent = () => {
  const [isAuth, setIsAuth] = useState(false);
  const auth = tokenService.getIsAuth();


/*   useEffect(()=>{
    console.log(state.isAuth);
  },[state.isAuth])

  if (state.isAuth)
    return (
      <Sider>
        <LogoIcon />
        <MenuComponent />
      </Sider>
    ); */

  return (
    <Sider>
      <LogoIcon />
      <MenuComponent />
    </Sider>
  );
};
