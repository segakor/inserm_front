import React, { useState } from "react";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import { ReactComponent as MoreIcon } from "../assets/moreBtn.svg";
import { Header } from "./Layout/Header";
import { MenuComponent } from "./Menu";
import { Drawer } from "antd";
import { useLocation } from "react-router-dom";

export const HeaderComponent = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const drawerSize = document.documentElement.scrollWidth;

  const location = useLocation();

  return (
    <Header>
      <LogoIcon />
      {location.pathname !== "/login" ? (
        <>
          <MoreIcon onClick={showDrawer} style={{ cursor: "pointer" }} />
          <Drawer
            placement="right"
            onClose={onClose}
            open={open}
            width={drawerSize}
          >
            <MenuComponent onHeaderClose={onClose} />
          </Drawer>
        </>
      ) : (
        <></>
      )}
    </Header>
  );
};
